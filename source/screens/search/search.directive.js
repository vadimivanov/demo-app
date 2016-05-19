let templateSearch = require('./search.html');

class SearchDirective {
    constructor () {
        this.template = templateSearch;
        this.restrict = 'E';
        this.scope = {};
        let _state;
        let _dataService;
        let _PubSub;

        this.link = function ($scope) {
            $scope.isSpinner = false;
            $scope.isHistory = false;
            $scope.searchOptions = {
                name: '',
                page: 1
            };
            $scope.searchByHistory = function(location){
                $scope.searchOptions.name = location;
                $scope.isHistory = true;
                $scope.getSearchData();
            };
            $scope.getSearchData = function(state){
                $scope.isSpinner = true;
                _dataService.search($scope.searchOptions).then(function successCallback(response) {
                    $scope.searchData = response.data.response.listings;
                    _dataService.setData($scope.searchData);
                    if (!$scope.isHistory) {
                        $scope.saveSearchResults(response.data.response);
                    }
                    $scope.isSpinner = false;
                    _state.go('result');
                }, function errorCallback(err) {
                    $scope.isSpinner = false;
                    console.log('errorCallback', err);
                });
            };
            $scope.saveSearchResults = function(results){
                $scope.searchResults = [{
                    title: results.locations[0].title,
                    length: results.total_results
                }];
                _dataService.setStorage($scope.searchResults, 'searchResults');
                
            };
            
            $scope.routState = _state.current.name;
            _PubSub.publish('routState', $scope.routState);
            $scope.render = function () {
                $scope.searchHistory = _dataService.getStorage('searchResults');
            };
            $scope.render();
        };
        this.controller = ['$scope', '$state', 'dataService','PubSub', ($scope, $state, dataService, PubSub) => {
            _state = $state;
            _dataService = dataService;
            _PubSub = PubSub;
        }];
    }
}

SearchDirective.$inject = ['$scope', '$state', 'dataService', 'PubSub'];
export default SearchDirective;