let templateFavorites = require('./favorits.html');

class FavoritesDirective {
    constructor () {
        this.template = templateFavorites;
        this.restrict = 'E';
        this.scope = {};
        let _dataService;

        this.link = function ($scope) {
            console.log('FavoritesDirective', $scope);
            var imagePath = 'https://material.angularjs.org/latest/img/list/60.jpeg';
            $scope.todos = [];
            $scope.title = 'Toolbar';
            for (var i = 0; i < 5; i++) {
                $scope.todos.push({
                    face: imagePath,
                    what: "Property",
                    who: "Min Li Chan",
                    notes: "It's favorites."
                });
            }
        };
        this.controller = ['$scope', '$state', 'dataService', ($scope, $state, dataService) => {
            console.log('FavoritesDirective-controller', $scope, $state);
            _dataService = dataService;
        }];
    }
}

FavoritesDirective.$inject = ['$scope', '$state', 'dataService'];
export default FavoritesDirective;