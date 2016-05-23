let templateSearch = require('./search.html');

class SearchDirective {
    constructor () {
        this.template = templateSearch;
        this.restrict = 'E';
        this.scope = {};
        let _state;
        let _dataService;
        let _PubSub;
        let _mdToast;

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

            $scope.errorMsg = function (msg) {
                $scope.isError = true;
                $scope.errorText = msg;
            };

            $scope.routState = _state.current.name;
            _PubSub.publish('routState', $scope.routState);
            _PubSub.subscribe('errorMsg', $scope.errorMsg);
            
            $scope.render = function () {
                $scope.searchHistory = _dataService.getStorage('searchResults');
            };
            $scope.render();
        };
        this.controller = ['$scope', '$state', 'dataService','PubSub', '$mdToast', ($scope, $state, dataService, PubSub, $mdToast) => {
            _state = $state;
            _dataService = dataService;
            _PubSub = PubSub;
            _mdToast = $mdToast;
        }];
    }
}

SearchDirective.$inject = ['$scope', '$state', 'dataService', 'PubSub', '$mdToast'];
export default SearchDirective;