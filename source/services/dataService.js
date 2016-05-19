class DataService {

    constructor ($http, CONFIG, storageService) {
        this.currentDate = new Date();
        this.preventDate = new Date();
        this.storageService = storageService;
        this.locationResponse = [];
        this.detailsData = [];
        this.CONFIG = CONFIG;
        this.$http = $http;
        this.CONFIG.URL = "http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&"
        this.search = function(data) {
            
            var options = {
                method: 'GET',
                url: this.CONFIG.URL + 'page=' + data.page + '&place_name='+ data.name,
                dataType: 'json'
            };
            return $http(options);
        }
    }


    getStorage (storageName) {
        return this.storageService.loadData(storageName);
    }
    setStorage (arr, storageName) {
        this.storageService.saveData(arr, storageName)
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

DataService.$inject = ['$http', 'CONFIG', 'storageService'];
export default DataService;