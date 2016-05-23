routing.$inject = ['$stateProvider', '$urlRouterProvider'];

function routing($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    console.log('routing test');

    $stateProvider
        .state('main', {
            template: '<ui-view />'
        })

        .state('home', {
            // url: '/',
            template: '<header-directive></header-directive>'
        })
        .state('search', {
            url: '/search',
            template: '<search-directive></search-directive>'
        })
        .state('result', {
            url: '/result',
            template: '<result-directive></result-directive>'
        })
        .state('details', {
            url: '/details',
            template: '<details-directive></details-directive>'
        })
        .state('favorites', {
            url: '/favorites',
            template: '<favorits-directive></favorits-directive>'
        });
}

export default routing;