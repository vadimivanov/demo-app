class DataService {

    constructor ($http, CONFIG, storageService) {
        this.currentDate = new Date();
        this.preventDate = new Date();
        this.storageService = storageService;
        this.locationResponse = [];
        this.CONFIG = CONFIG;
        this.$http = $http;
        console.log('DataService---', storageService);
    }

    search (data) {
        var options = {
            method: 'GET',
            url: this.CONFIG.URL,
            dataType: 'json'
        };
        return this.$http(options);
    };

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

}

DataService.$inject = ['$http', 'CONFIG', 'storageService'];
export default DataService;