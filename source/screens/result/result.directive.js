let templateResult = require('./result.html');

class ResultDirective {
    constructor () {
        this.template = templateResult;
        this.restrict = 'E';
        this.scope = {};
        let _state;
        let _dataService;

        this.link = function ($scope) {
            console.log('ResultDirective', $scope);
            var imagePath = 'https://material.angularjs.org/latest/img/list/60.jpeg';
            $scope.todos = [];
            $scope.title = 'Toolbar';
            for (var i = 0; i < 15; i++) {
                $scope.todos.push({
                    face: imagePath,
                    what: "Brunch this weekend?",
                    who: "Min Li Chan",
                    notes: "I'll be in your neighborhood doing errands."
                });
            }
            $scope.changeState = function(state){
                _state.go(state);
            };

        };
        this.controller = ['$scope', '$state', 'dataService',  ($scope, $state, dataService) => {
            _state = $state;
            _dataService = dataService;
        }];
    }
}

ResultDirective.$inject = ['$scope', '$state', 'dataService'];
export default ResultDirective;