var app = angular.module("miAplicacion", ["ngRoute", "ui.bootstrap", "ngAnimate", "ngTouch"]); /* Se inyecta ng-route, ui-bootstrap y ng-animate y ng-touch que son necesarios para UIB */
	
// Configuración de las rutas
	app.config(["$routeProvider",function($routes) {
		$routes.
		when("/", {
			templateUrl: "vistas/presentacion.html",
			controller: Ctrl.presentacionController
		}).
		when("/traducciones", {
			templateUrl: "vistas/traducciones.html",
			controller: Ctrl.traduccionesController
		}).
		when("/api", {
			templateUrl: "vistas/api.html",
			controller: Ctrl.apiController
		}).
		when("/api/funcionamiento", {
			templateUrl: "vistas/funcionamiento.html",
			controller: Ctrl.funcionamientoController
		}).
		when("/api/anadir", {
			templateUrl: "vistas/anadir.html",
			controller: Ctrl.anadirController
		}).
		when("/api/borrar/", {
			templateUrl: "vistas/borrar.html",
			controller: Ctrl.borrarController
		}).
		when("/api/actualizar/", {
			templateUrl: "vistas/actualizar.html",
			controller: Ctrl.actualizarController
		}).
		when("/explorar", {
			templateUrl: "vistas/explorar.html",
			controller: Ctrl.explorarController
		}).
		when("/explorar/buscador", {
			templateUrl: "vistas/buscador.html",
			controller: Ctrl.buscadorController
		}).
		when("/explorar/libros/", {
			templateUrl: "vistas/explorarLibros.html",
			controller: Ctrl.explorarLibrosController
		}).
		when("/explorar/juegos", {
			templateUrl: "vistas/explorarJuegos.html",
			controller: Ctrl.explorarJuegosController
		}).
		when("/explorar/libros/:libroId", {
			templateUrl: "vistas/libroId.html",
			controller: Ctrl.libroIdController
		}).
		when("/explorar/juegos/:juegoId", {
			templateUrl: "vistas/juegoId.html",
			controller: Ctrl.juegoIdController
		}).
		when("/contacto",{
			templateUrl: "vistas/contacto.html"
		}).
		when("/recursos", {
			templateUrl: "vistas/recursos.html",
			controller: Ctrl.recursosController
		}).
		when("/recursos/lanzadorDeDados", {
			templateUrl: "vistas/lanzadorDeDados.html",
			controller: Ctrl.lanzadorDeDadosController
		}).
		when("/recursos/editoriales", {
			templateUrl: "vistas/editoriales.html",
			controller: Ctrl.editorialesController
		}).
		when("/recursos/informacion", {
			templateUrl: "vistas/informacion.html",
			controller: Ctrl.informacionController
		}).
		otherwise({redirectTo: "/"});

	}]);




//Directiva que crea la barra de navegación
app.directive('barraNavegacion', function() {
    return {
        restrict : 'E',
        templateUrl : "vistas/barraNavegacion.html",
        controller: Ctrl.barraNavegacionController
    }
});
// Directiva que modifia el NG-MODEL de los file tipo INPUT para que recoja los datos del archivo en lugar de su nombre y permita subirlo a la base de datos

app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);
// Mi Directiva de confirm, empleo mdConfirm en vez de ng-confirm para evitar colisiones futuras con alguna directiva que pueda emplear AngularJS,
// el restrict "A" indica que es un atributo asi que se empleará como <div md-confirm></div>, la parte de link indica que es una directiva que modifica el DOM
// element es el elemento en jqLite y scope es scope. mdConfirmClick permite especificar el mensaje sino el mensaje de ¿Estas segur@? será el de defecto.

app.directive('mdConfirm', [
        function(){
            return {
                restrict: "A",
                link: function (scope, element, attr) {
                    var mensaje = attr.mdConfirmClick|| "¿Estas segur@?";
                    var clickear = attr.mdConfirm;
                    element.bind("click",function (event) {
                        if ( window.confirm(mensaje) ) {
                            scope.$eval(clickear)
                        }
                    });
                }
            };
    }])
