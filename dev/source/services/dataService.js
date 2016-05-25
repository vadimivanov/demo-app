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
                var responseData = response.data.response.listings;
                if (!responseData || responseData.length <= 0) {
                    PubSub.publish('errorMsg', response.data.response.application_response_text);
                    PubSub.publish('spinner', false);
                }
                for (var i = 0; i < responseData.length; i++) {
                    self.responseData.push(responseData[i]);                    
                }
                
                self.setData(self.responseData);
                var saveSearchResults = function (results) {
                    var searchResults = [{
                        title: results.locations[0].title,
                        length: results.total_results
                    }];
                    self.setStorage(searchResults, 'searchResults');
                };
                console.log('saveSearchResults', data.isHistory);
                if (!data.isHistory) {
                    saveSearchResults(response.data.response);
                }

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
        this.storageService.saveData(arr, storageName);
    }
    removeStorage (storageName) {
        this.storageService.removeData(storageName);
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