let templateResult = require('./result.html');

class ResultDirective {
    constructor () {
        this.template = templateResult;
        this.restrict = 'E';
        this.scope = {};
        let _state;
        let _dataService;
        let _PubSub;

        this.link = function ($scope) {
            $scope.pageNumber = 1;
            
            $scope.getItem = function (index) {
                _dataService.setDetails($scope.searchResults[index]);
                _state.go('details');
            };
            
            $scope.loadMore = function (index) {
                $scope.pageNumber += 1;
                _dataService.search({
                    name: _dataService.getLocation(),
                    page: $scope.pageNumber});
                
                _PubSub.publish('spinner', true);
                $scope.render();
            };
            
            $scope.render = function () {
                $scope.searchResults = _dataService.getData();
            };
            
            $scope.routState = _state.current.name;
            _PubSub.publish('routState', $scope.routState);
            $scope.render();
        };
        this.controller = ['$scope', '$state', 'dataService', 'PubSub',  ($scope, $state, dataService, PubSub) => {
            _state = $state;
            _dataService = dataService;
            _PubSub = PubSub;
        }];
    }
}

ResultDirective.$inject = ['$scope', '$state', 'dataService', 'PubSub'];
export default ResultDirective;