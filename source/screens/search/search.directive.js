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
            $scope.isHistory = false;
            $scope.isError = false;
            $scope.searchOptions = {
                name: '',
                page: 1
            };

            $scope.searchByHistory = function (location) {
                $scope.searchOptions.name = location;
                $scope.searchOptions.isHistory = true;
                $scope.getSearchData();
            };

            $scope.getSearchData = function (state) {
                _PubSub.publish('spinner', true);
                $scope.searchData = _dataService.search($scope.searchOptions);
                _dataService.setData($scope.searchData);
                _dataService.setLocation($scope.searchOptions.name);
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