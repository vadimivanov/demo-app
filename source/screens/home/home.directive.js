let templateHome = require('./home.html');

class HomeDirective {
    constructor() {
        this.template = templateHome;
        this.restrict = 'E';
        this.scope = {};

        this.link = function ($scope) {
            console.log('HomeDirective', $scope);
        };
        this.controller = ['$scope', '$state', ($scope, $state) => {
            console.log('HomeDirective-controller', $scope, $state);
        }];
    }
}

HomeDirective.$inject = ['$scope', '$state'];
export default HomeDirective;