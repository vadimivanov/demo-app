class StorageService {

    constructor () {
        this.saveData = function(arr, storageName) {
            if (localStorage.getItem(storageName)) {
                // localStorage.removeItem(storageName);
                var load = localStorage.getItem(storageName);
                var parseLoad = JSON.parse(load);
                if (parseLoad.length >= 5) {
                    parseLoad.pop();
                    parseLoad.push(arr[0]);
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

    }

}

export default StorageService;