var app = angular.module('livroModule', []);

app.controller('livroControl', function ($scope, $http) {

    var url = 'http://localhost:80/livros';

    $scope.pesquisar = function () {
        $http.get(url).then(function (response) {
            $scope.livros = response.data;
        }, function (error) {
            alert(error);
            console.log(error)
        });
    }

    $scope.novo = function () {
        $scope.livro = {};
    }

    $scope.salvar = function () {
        $scope.livros.push($scope.livro);
        if (typeof $scope.livro.codigo == 'undefined') {
            $http.post(url, $scope.livro).then(function (response) {
                $scope.livros.push(response.data);
                $scope.novo();
            }, function (error) {
                // alert(error);
                $scope.novo();
                console.log(error);
            });
        } else {
            $http.put(url, $scope.livro).then(function () {
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
        if (typeof $scope.livro.codigo == 'undefined') {
            alert('Escolha um livro');
        } else {
            urlExcluir = url + "/" + $scope.livro.codigo;
            $http.delete(urlExcluir).then(function () {
                $scope.pesquisar();
                $scope.novo();
            }, function (error) {
                // alert(error);
                console.log(error);
            });
        }
    }

    $scope.livros = [
        {
            'codigo': '1',
            'obra': 'A Arte da Guerra',
            'autor': 'Sun Tzu',
            'genero': 'Biografia, Ficção',
            'isbn': '9781590302255'
        }, {
            'codigo': '2',
            'obra': 'Pai Rico, Pai Pobre',
            'autor': 'Robert Kiyosaki, Sharon L. Lechter',
            'genero': 'Livro de autoajuda',
            'isbn': '9788535206234'
        }
    ];


});