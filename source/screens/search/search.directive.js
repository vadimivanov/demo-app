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
            $scope.changeState = function(state){
                $scope.getSearchData();
                _state.go(state);
            };
            $scope.getSearchData = function(state){
                // $scope.searchData = _dataService.search();
                _dataService.setData($scope.searchResults);
            };
            $scope.saveSearchResults = function(){
                $scope.searchResults = [{name: 'Leeds', length: 20}];
                _dataService.setStorage($scope.searchResults, 'searchResults');
                console.log('SearchDirective--$scope.searchData');
            };
            $scope.saveSearchResults();
            $scope.routState = _state.current.name;
            _PubSub.publish('routState', $scope.routState);

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