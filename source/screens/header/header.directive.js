let templateHeader = require('./header.html');

class HeaderDirective {
    constructor () {
        this.template = templateHeader;
        this.restrict = 'E';
        this.scope = {};
        let _dataService;

        this.link = function ($scope) {
            $scope.render = function () {
                $scope.title = _dataService.getRouteState();
                console.log('---HeaderDirective-$scope.title--', $scope.title);
            };
            $scope.render();
        };
        this.controller = ['$scope', '$state', 'dataService',  ($scope, $state, dataService) => {
            console.log('HeaderDirective-controller', $state);
            _dataService = dataService;
        }];
    }
}

HeaderDirective.$inject = ['$scope', '$state', 'dataService'];
export default HeaderDirective;