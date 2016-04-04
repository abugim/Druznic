(function () {
    var app = angular.module('diretivas', []);

    app.directive('configDesempenho', function () {
        return {
            restrict: 'E',
            templateUrl: 'componentes/config-desempenho.html'
        }
    });
})();
