var app = angular.module('filmeModule', []);

app.controller('filmeControl', function ($scope, $http) {

    var url = 'http://localhost:80/filmes';

    $scope.pesquisar = function () {
        $http.get(url).then(function (response) {
            $scope.filmes = response.data;
        }, function (error) {
            alert(error);
            console.log(error)
        });
    }

    $scope.novo = function () {
        $scope.filme = {};
    }

    $scope.salvar = function () {
        $scope.filmes.push($scope.filme);
        if (typeof $scope.filme.codigo == 'undefined') {
            $http.post(url, $scope.filme).then(function (response) {
                $scope.filmes.push(response.data);
                $scope.novo();
            }, function (error) {
                // alert(error);
                $scope.novo();
                console.log(error);
            });
        } else {
            $http.put(url, $scope.filme).then(function () {
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
        if (typeof $scope.filme.codigo == 'undefined') {
            alert('Escolha um filme');
        } else {
            urlExcluir = url + "/" + $scope.filme.codigo;
            $http.delete(urlExcluir).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
                // alert(error);
                console.log(error);
            });
        }
    }

    $scope.filmes = [
        {
            'codigo': '1',
            'nome': 'Click',
            'genero': 'Comédia , Drama, Fantasia',
            'ano': '2006'
        }, {
            'codigo': '2',
            'nome': 'Eu Te Amo, Cara',
            'genero': 'Romance',
            'ano': '2009'
        }
    ];


});