// check for indexed db availability in browser.
// window.indexedDB = window.indexedDB || window.mozIndexedDB ||
// window.webkitIndexedDB || window.msIndexedDB;
// if (!window.indexedDB) {
// console.log("The web browser doesn't support IndexedDB");
// } else {
// console.log("The web browser supports IndexedDB");
// }


//Map instance to interact with indexDB DataBase
let idb = {}

//first call for DataBase opening in indexDB
idb.openCaloriesDB = function(dbName, version){
    return new Promise((resolve,reject) => {
        const request = window.indexedDB.open(dbName, version);
        request.onerror = function(event) {
            console.log("openCaloriesDB(): error: "+event);
            reject("error: "+event);
        };
        request.onsuccess = function(event) {
            idb.db = request.result;
            console.log("openCaloriesDB(): success, db created.");
            console.log(idb.db);
            resolve(idb);
        };
        request.onupgradeneeded = function(event) {
            idb.db = event.target.result;
            const store = idb.db.createObjectStore(dbName, {keyPath: 'id', autoIncrement: true});
            store.createIndex('month_and_year', ['year','month'],{unique: false});
        };
    });
}

// add calories to the indexedDB.
// input: row of data - given as a key-value pairs.
// the function store the data with 4 columns added to it:
// year, month, day - according to date
// id - unique auto generated dy indexedDB.
idb.addCalories = function (row) {
    return new Promise((resolve,reject) => {
        const date = new Date();
        // get day value  
        row.day = date.getDate();
        // month = value +1 because it displays january as 0
        row.month = date.getMonth() + 1;
        // year = val % 100 because it desplay 124 when its 24
        row.year = date.getYear() % 100;
        const dbName = idb.db.name;
        const request = idb.db.transaction([dbName], "readwrite")
            .objectStore(dbName)
            .add(row);
        request.onsuccess = function(event) {
            console.log("addCalories(): seccess. new item added to DB.");
            resolve('suceed.');
        };
        request.onerror = function(event) {
            console.log("addCalories(): error:" + event);
            reject('error accrue during item insertion.');
        }
    });
}


// readCalories
// parameter month state:
//   empty give the all year.
//   if full perform validation
// parameter year state:
//   if empty give this year.
//   if full perform validation test.
// get the data from the db according to the year and month.
// concat it as array.
// send it back as response.
idb.readCalories = function (month=null, year=null) {
    return new Promise((resolve,reject) => {
        const dbName = idb.db.name;
        const transaction = idb.db.transaction([dbName]);
        const objectStore = transaction.objectStore(dbName);
        let request;
        let allDataFlag = 0;
        const result = [];
        // if not specify month and year - return all data
        if(month == null && year == null){
            request = objectStore.getAll();
            allDataFlag = 1;
        }
        else{
            let yearTo = year;
            let yearFrom = year;
            let monthFrom = month;
            let monthTo = month;
            // if specified year only - return that year data
            if(month == null && year != null){
                monthFrom = 1;
                const currYear = new Date().getYear %100;
                if (year === currYear){
                    monthTo = new Date().getMonth + 1;
                }
                else{
                    monthTo = 12;
                }
            }
            // if specified month and year - return specified month and year data
            else if(month != null && year != null){
                //its ok do nothing
            }
            // if month only - return latest month data
            else if(month != null && year == null){
                var current_month = new Date().getMonth() + 1;
                // if the month was not this year.
                if (current_month < month){
                    //get the year befour
                    yearFrom = yearTo = new Date().getYear() %100 -1;
                }
                else{
                    //get this year
                    yearFrom = yearTo = new Date().getYear() %100;
                }
            }
            else{
                console.log('readCalories():error - The search does not match any result')
                reject('The search does not match any result');
            }
            // get the range from the db using a curser
            const keyRange = IDBKeyRange.bound([yearFrom,monthFrom], [yearTo,monthTo]);
            const yearToMonthIndex = objectStore.index('month_and_year');
            request = yearToMonthIndex.openCursor(keyRange);
        }
        request.onerror = function(event){
            console.log('readCalories(): cannot find the data item.');
            reject('error:' + event);
        };
        request.onsuccess = function(event){
            if(allDataFlag === 1){
                if(request.result){
                    // TODO: fix this TEST to show ALL items in the result.
                    console.log('readCalories(): success, return the result');
                    resolve(request.result);
                }
            }
            else{
                if(request.result){
                    const cursor = event.target.result;
                    if(cursor){
                        result.push(cursor.value);
                        cursor.continue();
                    }
                }
                
                else{
                    resolve(result);
                }
            }
        };
    });
}

// removing calories from indexedDB by its ID
idb.removeCalories = function(id){
    return new Promise((resolve,reject)=>{
        const dbName = this.db.name;
        const request = this.db.transaction([dbName], "readwrite")
                .objectStore(dbName)
                .delete(id);
        request.onsuccess = function(event) {
            console.log("removeItem(): the data item was removed from the database");
            resolve('suceed');
        };
        request.onerror = function(event) {
            console.log("removeItem(): problem with removing a data item from the database");
            reject('failed');
        }
    });
}

export default idb;