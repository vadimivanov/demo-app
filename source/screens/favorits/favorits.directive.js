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
            $scope.getItem = function(index){
                _dataService.setDetails($scope.searchResults[index]);
                _state.go('details');
            };
            $scope.loadFavoritesData = function() {
                $scope.favoritesData = _dataService.getStorage('favoritesData');
            };
            $scope.loadFavoritesData();
            $scope.routState = _state.current.name;
            _PubSub.publish('routState', $scope.routState);
        };
        this.controller = ['$scope', '$state', 'dataService', 'PubSub', ($scope, $state, dataService, PubSub) => {
            _state = $state;
            _dataService = dataService;
            _PubSub = PubSub;
        }];
    }
}

FavoritesDirective.$inject = ['$scope', '$state', 'dataService', 'PubSub'];
export default FavoritesDirective;