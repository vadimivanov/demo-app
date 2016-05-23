class StorageService {

    constructor () {
        this.saveData = function(arr, storageName) {
            if (localStorage.getItem(storageName)) {
                var load = localStorage.getItem(storageName);
                var parseLoad = JSON.parse(load);
                
                if (parseLoad.length >= 5 && storageName == 'searchResults') {
                    parseLoad.pop();
                    parseLoad.unshift(arr[0]);
                } else {
                    parseLoad.push(arr[0]);
                }
                localStorage.setItem(storageName, JSON.stringify(parseLoad));
            } else {
                localStorage.setItem(storageName, JSON.stringify(arr));
            }
        };

        this.loadData = function(storageName) {
            var loadData = JSON.parse(localStorage.getItem(storageName));
            return loadData;
        };

        this.removeData = function(storageName) {
            localStorage.removeItem(storageName);
        };

    }

}

export default StorageService;