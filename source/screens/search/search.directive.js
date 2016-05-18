let templateSearch = require('./search.html');

class SearchDirective {
    constructor () {
        this.template = templateSearch;
        this.restrict = 'E';
        this.scope = {};
        let _state;
        let _dataService;
        let _PubSub;

        this.link = function ($scope) {
            
            $scope.changeState = function(state){
                _state.go(state);
            };
            $scope.routState = _state.current.name;
            _PubSub.publish('routState', $scope.routState);
        };
        this.controller = ['$scope', '$state', 'dataService','PubSub', ($scope, $state, dataService, PubSub) => {
            _state = $state;
            _dataService = dataService;
            _PubSub = PubSub;
            console.log('SearchDirective', $state,_state.current.name);
        }];
    }
}

SearchDirective.$inject = ['$scope', '$state', 'dataService', 'PubSub'];
export default SearchDirective;