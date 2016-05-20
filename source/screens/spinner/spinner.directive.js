let templateSpinner = require('./spinner.html');

class SpinnerDirective {
    constructor () {
        this.template = templateSpinner;
        this.restrict = 'E';
        this.scope = {};
        let _state;
        let _dataService;
        let _PubSub;

        this.link = function ($scope) {
            $scope.isSpinner = false;
            
            var spinnerState = function (state) {
                $scope.isSpinner = state;
            };
            
            _PubSub.subscribe('spinner', spinnerState);
        };
        this.controller = ['$scope', '$state', 'dataService', 'PubSub',  ($scope, $state, dataService, PubSub) => {
            _state = $state;
            _dataService = dataService;
            _PubSub = PubSub;
        }];
    }
}

SpinnerDirective.$inject = ['$scope', '$state', 'dataService', 'PubSub'];
export default SpinnerDirective;