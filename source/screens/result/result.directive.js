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
            $scope.getItem = function (index) {
                _dataService.setDetails($scope.searchResults[index]);
                _state.go('details');
            };
            $scope.routState = _state.current.name;
            _PubSub.publish('routState', $scope.routState);
            $scope.searchResults = _dataService.getData();
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