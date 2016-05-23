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
            $scope.getItem = function (index) {
                _dataService.setDetails($scope.favoritesData[index]);
                _state.go('details');
            };
            
            $scope.loadFavoritesData = function () {
                $scope.favoritesData = _dataService.getStorage('favoritesData');
            };

            $scope.removeItem = function(index) {
                $scope.favoritesData.splice(index, 1);
                _dataService.removeStorage('favoritesData');
                _dataService.setStorage($scope.favoritesData, 'favoritesData');
                $scope.loadFavoritesData();
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