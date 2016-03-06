var app = angular.module('serviceApp',[]);
app.service('resourceFetcherService',function($http){
    this.fetchLinks = $http.get('/api/fetchLinks');
    this.fetchItems  = $http.get('/api/fetchItems');
});
