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
            $scope.saveFavoritesData = function () {
                $scope.favoritesArr = [{
                    title: $scope.detailsInfo.title,
                    img_url: $scope.detailsInfo.img_url,
                    lister_name: $scope.detailsInfo.lister_name,
                    price_formatted: $scope.detailsInfo.price_formatted
                }];
                _dataService.setStorage($scope.favoritesArr, 'favoritesData');
            };
            
            $scope.routState = _state.current.name;
            $scope.detailsInfo =  _dataService.getDetails();
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