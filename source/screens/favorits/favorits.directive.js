let templateFavorites = require('./favorits.html');

class FavoritesDirective {
    constructor () {
        this.template = templateFavorites;
        this.restrict = 'E';
        this.scope = {};
        let _state;
        let _dataService;
        let _PubSub;

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
            $scope.routState = _state.current.name;
            _PubSub.publish('routState', $scope.routState);
        };
        this.controller = ['$scope', '$state', 'dataService', 'PubSub', ($scope, $state, dataService, PubSub) => {
            console.log('FavoritesDirective-controller', $scope, $state);
            _state = $state;
            _dataService = dataService;
            _PubSub = PubSub;
        }];
    }
}

FavoritesDirective.$inject = ['$scope', '$state', 'dataService', 'PubSub'];
export default FavoritesDirective;