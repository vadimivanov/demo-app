import {} from 'angular';
import uirouter from 'angular-ui-router';

import routing from './routing.js';

// lib modules
import 'angular-material/angular-material.css';
import 'font-awesome/css/font-awesome.css';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';

// services
import DataService from './services/dataService.js';
import StorageService from './services/storageService.js';

// directives
import HeaderDirective from './screens/header/header.directive';
import SearchDirective from './screens/search/search.directive';
import ResultDirective from './screens/result/result.directive';
import DetailsDirective from './screens/details/details.directive';
import FavoritesDirective from './screens/favorits/favorits.directive';
import SpinnerDirective from './screens/spinner/spinner.directive';


angular.module('rxExperiment', [
        angularMaterial,
        angularAnimate,
        uirouter
    ])
    .provider('PubSub', require('angular-pubsub'))
    .service('dataService', DataService)
    .service('storageService', StorageService)
    .directive('headerDirective', () => new HeaderDirective)
    .directive('searchDirective', () => new SearchDirective)
    .directive('resultDirective', () => new ResultDirective)
    .directive('detailsDirective', () => new DetailsDirective)
    .directive('favoritsDirective', () => new FavoritesDirective)
    .directive('spinnerDirective', () => new SpinnerDirective)
    .config(routing)
    .constant('CONFIG', {
        URL: "",
        HEADER: {}
    });

console.log('load');