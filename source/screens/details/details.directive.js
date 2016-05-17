let templateDetails = require('./details.html');

class DetailsDirective {
    constructor () {
        this.template = templateDetails;
        this.restrict = 'E';
        this.scope = {};
        let _state;
        let _dataService;

        this.link = function ($scope) {

            $scope.changeState = function(state){
                _state.go(state);
            };
        };
        this.controller = ['$scope', '$state', 'dataService', ($scope, $state, dataService) => {
            console.log('DetailsDirective', $scope);
            _state = $state;
            _dataService = dataService;
        }];
    }
}

DetailsDirective.$inject = ['$scope', '$state', 'dataService'];
export default DetailsDirective;