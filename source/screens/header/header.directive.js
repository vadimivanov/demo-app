let templateHeader = require('./header.html');

class HeaderDirective {
    constructor () {
        this.template = templateHeader;
        this.restrict = 'E';
        this.scope = {};
        let _dataService;
        let _PubSub;

        this.link = function ($scope) {
            $scope.render = function () {
                $scope.title = _dataService.getRouteState();
            };
            var routState = function (newGreeting, oldGreeting) {
                $scope.title = newGreeting;
            };
            var uid = _PubSub.subscribe('routState', routState);
                console.log('---HeaderDirective-$scope.title--', uid);
        };
        this.controller = ['$scope', '$state', 'dataService', 'PubSub',  ($scope, $state, dataService, PubSub) => {
            console.log('HeaderDirective-controller', $state,PubSub);
            _dataService = dataService;
            _PubSub = PubSub;
        }];
    }
}

HeaderDirective.$inject = ['$scope', '$state', 'dataService', 'PubSub'];
export default HeaderDirective;