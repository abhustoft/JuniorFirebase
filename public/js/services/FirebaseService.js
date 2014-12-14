angular.module('sampleApp').service('firebaseService', function (FireDB) {

    this.FBref =  function (path) {
        if (path) {
            return new Firebase(FireDB + path);
        } else {
            return new Firebase(FireDB);
        }
    };
});