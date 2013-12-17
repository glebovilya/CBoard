define([], function() {
    var objStorage = {
        storage: [],
        addObj: function(obj){
            this.storage.push(obj);
        },

        /**
         * Removes obj from storage
         * @param obj
         */
        dropObj: function(/*Obj||number*/obj){
            var storage = this.storage,
                idx

            if (typeof obj == "number"){
                idx = obj
            } else {
                idx = storage.indexOf(obj);
            }

            storage.splice(idx, 1);
        }
    };

    window.storage = objStorage;
    return objStorage
});
