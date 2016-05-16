routing.$inject = ['$stateProvider', '$urlRouterProvider'];

function routing($stateProvider, $urlRouterProvider) {
    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //});
    $urlRouterProvider.otherwise('/');
    console.log('routing test');

    $stateProvider
        .state('main', {
            template: '<ui-view />'
        })

        .state('home', {
            url: '/',
            template: '<home-directive></home-directive>'
            //template: 'dfgsxfgfgsdfgsdgsdfgsdgsdfg'
        });
}

export default routing;