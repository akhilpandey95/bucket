angular.module('bucket')

.controller('linkCtrl', ['$http', '$scope',  function ($http, $scope) {
    $scope.data = []
    $scope.urls = []

    $scope.submit = function() {
        $scope.data.push($scope.enteredLink)
        $scope.urls = [...new Set($scope.data)]
    }

    $scope.clear = function() {
        $scope.enteredLink = ""
    }

    $scope.focusInput = function() {
        document.getElementById("addMe").focus()
    }

}])
