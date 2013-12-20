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
            var storage = objStorage.storage,
                idx;

            if (typeof obj == "number"){
                idx = obj
            } else {
                idx = storage.indexOf(obj);
            }

            storage.splice(idx, 1);
        },
        clearStorage: function(){
            var storage = objStorage.storage;
            storage.splice(0, storage.length);
        }
        /**
         *
         * just leave it here
         */
        /*,
        dropPerson: function(*//*number*//*id,*//*true/false*//* inProject, *//*Class*//*Person){
            var storage = this.storage;
            for (var j = storage.length-1; j >= 0; j--){
                if(storage[j].id == id && storage[j].inProject == inProject && storage[j] instanceof Person) {
                    storage.splice(j, 1);
                }
            }
        },
        dropProject: function(*//*number*//*id, *//*Class*//*Project){
            var storage = this.storage;
            for (var j = storage.length-1; j >= 0; j--){
                if(storage[j].id == id && storage[j] instanceof Project) {
                    storage.splice(j, 1);
                }
            }
        }*/
    };

    window.storage = objStorage;
    return objStorage
});
