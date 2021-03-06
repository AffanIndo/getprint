function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
var id = getUrlParameter('id');
var uidline = getUrlParameter('useridline');

var link = document.getElementById('link').href;
document.getElementById('link').href = link + "&useridline="+uidline;

var app = angular.module('detailmitra', []);
app.controller("appCtrl", ['$scope','$http','$window', function($scope,$http,$window){
    $http({
        method : "GET",
        url: "/api/mitra/" + id,
    }).then(function successCallback(response){
        $scope.data = response.data.mitra[0]
        console.log(response.data.mitra[0]);
    });
}]);