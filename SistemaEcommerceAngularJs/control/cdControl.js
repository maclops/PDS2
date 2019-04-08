var app = angular.module('cdModule', []);

app.controller('cdControl', function ($scope, $http) {

    var url = 'http://localhost:80/cds';

    $scope.pesquisar = function () {
        $http.get(url).then(function (response) {
            $scope.cds = response.data;
        }, function (error) {
            alert(error);
            console.log(error)
        });
    }

    $scope.novo = function () {
        $scope.cd = {};
    }

    $scope.salvar = function () {
        $scope.cds.push($scope.cd);
        if (typeof $scope.cd.codigo == 'undefined') {
            $http.post(url, $scope.cd).then(function (response) {
                $scope.cds.push(response.data);
                $scope.novo();
            }, function (error) {
                // alert(error);
                $scope.novo();
                console.log(error);
            });
        } else {
            $http.put(url, $scope.cd).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
                // alert(error);
                $scope.novo();
                console.log(error);
            });
        }
    }

    $scope.excluir = function () {
        if (typeof $scope.cd.codigo == 'undefined') {
            alert('Escolha um cd');
        } else {
            urlExcluir = url + "/" + $scope.cd.codigo;
            $http.delete(urlExcluir).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
                // alert(error);
                console.log(error);
            });
        }
    }

    $scope.cds = [
        {
            'codigo': '1',
            'artista': 'Blink-182',
            'album': 'Untitled',
            'ano': '2003'
        }, {
            'codigo': '2',
            'artista': 'Blink-182',
            'album': 'Take Off Your Pants and Jacket',
            'ano': '2001'
        }
    ];


});