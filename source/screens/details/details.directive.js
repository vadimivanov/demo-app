let templateDetails = require('./details.html');

class DetailsDirective {
    constructor () {
        this.template = templateDetails;
        this.restrict = 'E';
        this.scope = {};
        let _state;
        let _dataService;
        let _PubSub;

        this.link = function ($scope) {

            $scope.changeState = function(state){
                _state.go(state);
            };
            $scope.saveFavoritesData = function(){
                $scope.favoritesData = [{name: 'Leeds', adress: 'Street 20'}];
                _dataService.setStorage($scope.favoritesData, 'favoritesData');
                console.log('SearchDirective--$scope.searchData');
            };
            $scope.saveFavoritesData();
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

DetailsDirective.$inject = ['$scope', '$state', 'dataService', 'PubSub'];
export default DetailsDirective;