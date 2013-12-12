define([], function() {
    var objStorage = {
        storage: [],
        addObj: function(obj){
            this.storage.push(obj);
        },
        dropObj: function(obj){
            var storage = this.storage;
            var idx = storage.indexOf(obj);
            storage.splice(idx, 1);
        }
    };

    window.storage = objStorage;
    return objStorage
});
