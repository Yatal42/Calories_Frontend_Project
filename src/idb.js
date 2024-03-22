//Map instance to interact with indexDB DataBase
let idb = {}

//first call for DataBase opening in indexDB
idb.openCaloriesDB = function(dbName, version){
    // Return a new promise to handle the asynchronous operation of adding a record
    return new Promise((resolve,reject) => {
        // Attempt to open the database with the specified name and version
        const request = window.indexedDB.open(dbName, version);
        // Define the error handler for the open request
        request.onerror = function(event) {
            // Log the error and reject the promise if an error occurs
            console.log("openCaloriesDB(): error: "+event);
            reject("error: "+event);
        };
        // Define the success handler for the open request
        request.onsuccess = function(event) {
            // Assign the result of the request (the opened database) to idb.db
            idb.db = request.result;
            // Log the success message and the name of the database
            console.log("openCaloriesDB(): success, db created.");
            console.log(idb.db.name);
            // Resolve the promise with the idb object
            resolve(idb);
        };
        // Define the handler for the upgradeneeded even
        request.onupgradeneeded = function(event) {
            // Assign the result of the request (the opened database) to idb.db
            idb.db = event.target.result;
            // Create an object store with a specified keyPath and autoIncrement option
            const store = idb.db.createObjectStore(dbName, {keyPath: 'id', autoIncrement: true});
            // Create an index on the object store to query by month and year
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
    // Return a new promise to handle the asynchronous operation of adding a record
    return new Promise((resolve,reject) => {
        const date = new Date();
        // get day value
        row.day = date.getDate();
        // month = value +1 because it displays january as 0
        row.month = date.getMonth() + 1;
        // year = val % 100 because it desplay 124 when its 24
        row.year = date.getYear() % 100;
        // Retrieve the database name from the idb object
        const dbName = idb.db.name;
        // Create a transaction, open the object store, and issue an add request for the new record
        const request = idb.db.transaction([dbName], "readwrite")
            .objectStore(dbName)
            .add(row);
        // Define the success handler for the add request
        request.onsuccess = function(event) {
            console.log("addCalories(): seccess. new item added to DB.");// success log
            resolve('suceed.');
        };
        request.onerror = function(event) {
            console.log("addCalories(): error:" + event);//error log
            reject('error accrue during item insertion.');
        }
    });
}


// readCalories
// parameter month state: (integer value between 1 to 12)
//   empty give the all year.
//   if full perform validation
// parameter year state: (YY)
//   if empty give this year.
//   if full perform validation test.
// get the data from the db according to the year and month.
// concat it as array.
// send it back as response.
idb.readCalories = function (month=null, year=null) {
    // Return a new promise to handle the asynchronous operation of adding a record
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
                //it's ok do nothing
            }
            // if month only - return latest month data
            else if(month != null && year == null){
                var current_month = new Date().getMonth() + 1;
                // if the month was not this year.
                if (current_month < month){
                    //get the year before
                    yearFrom = yearTo = new Date().getYear() %100 -1;
                }
                else{
                    //get this year
                    yearFrom = yearTo = new Date().getYear() %100;
                }
            }
            else{
                // empty search that coused by wrong parameters
                console.log('readCalories():error - The search does not match any result')
                reject('The search does not match any result');
            }
            // get the range from the db using a curser
            const keyRange = IDBKeyRange.bound([yearFrom,monthFrom], [yearTo,monthTo]);
            const yearToMonthIndex = objectStore.index('month_and_year');
            request = yearToMonthIndex.openCursor(keyRange);
        }
        // Define the onerror event handler for the request
        request.onerror = function(event){
            // Log a message to the console if an error occurs
            console.log('readCalories(): cannot find the data item.');
            // Reject the promise with an error message including the event details
            reject('error:' + event);
        };
        request.onsuccess = function(event){
            // Check if the allDataFlag is set, indicating all data is requested
            if(allDataFlag === 1){
                // Check if the allDataFlag is set, indicating all data is requested
                if(request.result){
                    console.log('readCalories(): success, return the result');
                    resolve(request.result);
                }
            }
            else{
                // If not all data is requested, check if there is a result
                if(request.result){
                    // Get the cursor from the event target result
                    const cursor = event.target.result;
                    // If the cursor exists, push the current value to the results array
                    if(cursor){
                        result.push(cursor.value);
                        // Continue the cursor to the next record
                        cursor.continue();
                    }
                }

                else{
                    // If there is no result, resolve the promise with the accumulated results array
                    resolve(result);
                }
            }
        };
    });
}

// removing calories from indexedDB by its ID
idb.removeCalories = function(id){
    // Return a new promise to handle the asynchronous operation of adding a record
    return new Promise((resolve,reject)=>{
        // Retrieve the database name from the idb object
        const dbName = this.db.name;
        // Create a transaction, open the object store, and issue a delete request for the specified id
        const request = this.db.transaction([dbName], "readwrite")
            .objectStore(dbName)
            .delete(id);
        // Define the success handler for the delete request
        request.onsuccess = function(event) {
            // Log a success message to the console indicating the item was removed
            console.log("removeItem(): the data item was removed from the database");
            // Resolve the promise indicating the operation succeeded
            resolve('succeed');
        };
        // Define the error handler for the delete request
        request.onerror = function(event) {
            // Log an error message to the console indicating there was a problem removing the item
            console.log("removeItem(): problem with removing a data item from the database");
            reject('failed');
        }
    });
}

export default idb;
