class DataService {

    constructor ($http, CONFIG, storageService, $state, PubSub) {
        this.storageService = storageService;
        this.locationResponse = [];
        this.location= '';
        this.detailsData = [];
        this.responseData = [];
        this.CONFIG = CONFIG;
        this.$http = $http;
        this.CONFIG.URL = "http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&"
        this.search = function(data) {
            if (data.page == 1 && this.responseData.length) {
                this.responseData = [];
            }
            var self = this, 
                options = {
                method: 'GET',
                url: this.CONFIG.URL + 'page=' + data.page + '&place_name='+ data.name,
                dataType: 'json'
            };

            $http(options).then(function successCallback(response) {
                // console.log('errorMsg', $scope.errorMsgs[response.data.response.application_response_code]);
                var dd = response.data.response.listings;
                for (var i = 0; i < dd.length; i++) {
                    self.responseData.push(dd[i]);                    
                }
                
                self.setData(self.responseData);
                var saveSearchResults = function (results) {
                    var searchResults = [{
                        title: results.locations[0].title,
                        length: results.total_results
                    }];
                if (!data.isHistory) {
                    saveSearchResults(response.data.response);
                }
                    self.setStorage(searchResults, 'searchResults');
                };

                PubSub.publish('spinner', false);
                $state.go('result');

                return response.data.response.listings;
                
            }, function errorCallback(err) {
                PubSub.publish('spinner', false);
                console.log('errorCallback', err);
            });
        }
    }


    getStorage (storageName) {
        return this.storageService.loadData(storageName);
    }
    setStorage (arr, storageName) {
        this.storageService.saveData(arr, storageName)
    }
    getLocation () {
        return  this.location;
    }
    setLocation (location) {
        this.location = location;
    }

    getData () {
        return  this.locationResponse;
    }
    setData (locationResponse) {
        this.locationResponse = locationResponse;
    }
    getDetails () {
        return  this.detailsData;
    }
    setDetails (details) {
        this.detailsData = details;
    }
}

DataService.$inject = ['$http', 'CONFIG', 'storageService', '$state', 'PubSub'];
export default DataService;