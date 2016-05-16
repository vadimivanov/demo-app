import {} from 'angular';
import uirouter from 'angular-ui-router';


import routing from './routing.js';

import HomeDirective from './screens/home/home.directive';

angular.module('rxExperiment', [uirouter])
    .directive('homeDirective', () => new HomeDirective)
    .config(routing);

console.log('load');