import {} from 'angular';
import uirouter from 'angular-ui-router';

import routing from './routing.js';

// Material design css
import 'angular-material/angular-material.css';
// Icons
import 'font-awesome/css/font-awesome.css';
// Animation
import angularAnimate from 'angular-animate';
// Materail Design lib
import angularMaterial from 'angular-material';

import DataService from './services/dataService.js';

import HeaderDirective from './screens/header/header.directive';
import SearchDirective from './screens/search/search.directive';
import ResultDirective from './screens/result/result.directive';
import DetailsDirective from './screens/details/details.directive';
import FavoritesDirective from './screens/favorits/favorits.directive';

angular.module('rxExperiment', [
        angularMaterial,
        angularAnimate,
        uirouter
    ])
    .service('dataService', DataService)
    .directive('headerDirective', () => new HeaderDirective)
    .directive('searchDirective', () => new SearchDirective)
    .directive('resultDirective', () => new ResultDirective)
    .directive('detailsDirective', () => new DetailsDirective)
    .directive('favoritsDirective', () => new FavoritesDirective)
    .config(routing);

console.log('load');