class DataService {

    constructor () {
        this.currentDate = new Date();
        this.preventDate = new Date();
        this.limitExceeded = false;
        this.stateName = 'title';
        this.storageService = '';
    }

    getRouteState (date, dataObj) {
        return  this.stateName;
    }
    setRouteState (stateName) {
        this.stateName = stateName;
    }

}

// DataService.$inject = ['storageService'];
export default DataService;