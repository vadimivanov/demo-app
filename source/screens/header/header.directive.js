let templateHeader = require('./header.html');

class HeaderDirective {
    constructor () {
        this.template = templateHeader;
        this.restrict = 'E';
        this.scope = {};
        let _state;
        let _dataService;
        let _PubSub;

        this.link = function ($scope) {
            $scope.backRout = {
                result: 'search',
                details: 'result',
                favorites: 'search'
            };
            var routState = function (newGreeting, oldGreeting) {
                $scope.title = newGreeting;
            };
            $scope.goBack = function () {
                _state.go($scope.backRout[$scope.title]);
            };
            $scope.goToFavorite = function () {
                _state.go('favorites');
            };
            _PubSub.subscribe('routState', routState);
        };
        this.controller = ['$scope', '$state', 'dataService', 'PubSub',  ($scope, $state, dataService, PubSub) => {
            _state = $state;
            _dataService = dataService;
            _PubSub = PubSub;
        }];
    }
}

HeaderDirective.$inject = ['$scope', '$state', 'dataService', 'PubSub'];
export default HeaderDirective;