let templateSearch = require('./search.html');

class SearchDirective {
    constructor () {
        this.template = templateSearch;
        this.restrict = 'E';
        this.scope = {};
        let _state;
        let _dataService;

        this.link = function ($scope) {
            
            $scope.changeState = function(state){
                _state.go(state);
            };
            _dataService.setRouteState(_state.current.name);

        };
        this.controller = ['$scope', '$state', 'dataService', ($scope, $state, dataService) => {
            _state = $state;
            _dataService = dataService;
            console.log('SearchDirective', $state,_state.current.name);
        }];
    }
}

SearchDirective.$inject = ['$scope', '$state', 'dataService'];
export default SearchDirective;