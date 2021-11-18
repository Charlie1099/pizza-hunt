// make variable to hold db connection
let db
//establish a connection to indexedDB database called "pizza_hunt"
const request = indexedDB.open("pizza_hunt", 1);

//this event will emit if the database version changes
request.onupgradeneeded = function(event) {
    //save a reference to the database
    const db = event.target.result
    // make a object store (table) called "new_pizza"
    db.createObjectStore("new_pizza", { autoIncrement: true})
}

//upon successful
requesst.onsuccess = function(event) {
    db = event.target.result;

    if (navigator.onLine) {
        uploadPizza()
    }
};

requesst.onerror = function(event) {
    console.log(event.target.errCode)
}

function saveRecord(record) {
    const transaction = db.transaction(["new_pizza"], "readwrite");

    const pizzaObjectStore = transaction.objectStore("new_pizza");

    pizzaObjectStore.add(record)
};

function uploadPizza() {
    const transaction = db.transaction(["new_pizza"], "readwrite");

    const pizzaObjectStore = transaction.objectStore("new_pizza");

    const getAll = pizzaObjectStore.getAll();


}

getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
        fetch("/api/pizza", {
            method: "POST",
            body: JSON.stringify(getAll.result),
            headers: {
                Accept: "application/json, text/plan, */*",
                "Content-Type": "application/json"
            }
        })
        then(response => response.json())
        .then(serverResponse => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }
          // open one more transaction
          const transaction = db.transaction(['new_pizza'], 'readwrite');
          // access the new_pizza object store
          const pizzaObjectStore = transaction.objectStore('new_pizza');
          // clear all items in your store
          pizzaObjectStore.clear();

          alert('All saved pizza has been submitted!');
        })
        .catch(err => {
          console.log(err);
        });
    }
}

window.addEventListener("online", uploadPizza)