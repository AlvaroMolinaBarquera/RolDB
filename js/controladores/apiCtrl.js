var Ctrl = (function(){

	// Inicio del Controlador de la Presentación
	var _presentacionController = function($scope) {


	} 	//Fin del Controlador de la presentación

	//Inicio del Controlador de Añadir 
	
	var _anadirController = function($http, $scope) {


	//enviarDatos Juego al igual que enviarDatosLibro lo que hacen es recoger los datos que el usuario ha introducido en los inputs para luego
	// enviarlos al servidor, ademas si los datos han sido enviados el boton de "enviar se deshabilita"
	$scope.enviarDatosJuego = function(){
		$scope.jdr = {
		"name": $scope.jdr.name,
		"logo": $scope.jdr.logo || "imagenes/placeholder.jpg"
	}
		$http({
			method: "POST",
			url: "http://localhost:3000/jdr",
			headers: {"Content-Type": "application/json"},
			data: $scope.jdr
		}).then(function successCallback(response){
			$scope.juegoEnviado = true;
		}, function errorCallback(error){
			alert("No se han podido enviar los datos")
		})
	}
	$scope.libroValido = function () {
    return $scope.formularioAnadirLibro.$dirty &&
           $scope.formularioAnadirLibro.$valid;
   
	};
	$scope.juegoValido = function () {
    return $scope.formularioAnadirJuego.$dirty &&
           $scope.formularioAnadirJuego.$valid;
   
	};
	$scope.enviarDatosLibro = function (){
		$scope.books = {
	      "title": $scope.books.title,
	      "autors": $scope.books.autors,
	      "ilustrators": $scope.books.ilustrators,
	      "pages_num": $scope.books.pages_num,
	      "release_date": $scope.books.release_date,
	      "rpg": $scope.books.rpg,
	      "type": $scope.books.type,
	      "edition": $scope.books.edition,
	      "cover": $scope.books.cover || "https://placeholdit.imgix.net/~text?txtsize=33&txt=IMG&w=150&h=212",
	      "system": $scope.books.system,
	      "overview": $scope.books.overview
    
		}
		$http({
			method: "POST",
			url: "http://localhost:3000/books",
			headers: {"Content-Type": "application/json"},
			data: $scope.books
		}).then(function successCallback(response){
			$scope.libroEnviado = true;
		}, function errorCallback(error){
			alert("No se han podido enviar los datos")
		})

	}
	//Una función de busqueda que se encuentra de forma muy similar a lo largo del codigo, en este caso esta coge todos los libros pero solo muestra el ultimo.
		
	$scope.buscarTodosLosJuegos = function () {	
		$http({
				method: "GET",
			  	url: "http://localhost:3000/jdr"
			}).then(function successCallback(response) {
				return $scope.todosLosJDR = response.data;

			}, function errorCallback(response) {
				//En caso de error
				alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
		});
	}
	$scope.buscarTodosLosLibros = function () {	
		$http({
				method: "GET",
			  	url: "http://localhost:3000/books"
			}).then(function successCallback(response) {
				return $scope.todosLosLibros = response.data;

			}, function errorCallback(error) {
				//En caso de error
				alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
		});
	}

	
	} //Fin del Controlador de Añadir
	

	


	//Inicio del Controlador de la sección Funcionamiento de la API
	var _funcionamientoController = function ($scope, $http) {
		$scope.buscarJuego = function () {	
			$http({
					method: "GET",
				  	url: "http://localhost:3000/jdr?q=" + $scope.juegoBuscar
				}).then(function successCallback(response) {
					//En caso de exito
					return $scope.jdr = response.data;

				}, function errorCallback(response) {
					//En caso de error
					alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
			});
		}
		$scope.buscarLibro = function () {	
			$http({
					method: "GET",
				  	url: "http://localhost:3000/books?q=" + $scope.libroBuscar
				}).then(function successCallback(response) {
					//En caso de exito
					return $scope.ldr = response.data;

				}, function errorCallback(response) {
					//En caso de error
					alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
			});
		}
	}
	//Fin del Controlador de la sección del funcionamiento de la API

	//Inicio del Controlador de la sección de explorar
	var _explorarController = function($scope,$http) {

		
	}
	//Fin del controlador de la sección de explorar

	//Inicio del Controllador de la sección Explorar Juegos
	var _explorarJuegosController = function($scope, $http){
		$scope.buscarTodosLosJuegos = function () {	
			$http({
					method: "GET",
				  	url: "http://localhost:3000/jdr"
				}).then(function successCallback(response) {
					return $scope.todosLosJuegos = response.data;

				}, function errorCallback(response) {
					//En caso de error
					alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
			});
		}
	}
	//Fin del controlaldor de la sección explorar juegos

	//Inicio del controlador de JuegoPorId
	var _juegoIdController = function ($scope, $http, $routeParams, $uibModal){
		$scope.buscarJuegoPorId= function () {	
			$http({
					method: "GET",
				  	url: "http://localhost:3000/jdr/" + $routeParams.juegoId
				}).then(function successCallback(response) {
					return $scope.juegoPorId = response.data;
				}, function errorCallback(response) {
					//En caso de error
					alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
			});
		}
		$scope.buscarLibrosPorJuego = function () {
				$http({
					method: "GET",
				  	url: "http://localhost:3000/books?q=" + $scope.juegoPorId.name
				}).then(function successCallback(response) {
					return $scope.librosPorJuego = response.data;


				}, function errorCallback(response) {
					//En caso de error
					alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
			});			
		}

		$scope.openModal = function (size) {
		     var modalInstance = $uibModal.open({
		     templateUrl: 'vistas/libroIdModal.html',
		     controller: Ctrl.libroIdModalController,
		     size: size,
		     resolve: {
		     	libroClickeado: this
		     	}
		      
		     });
 		}

		//Inicia propertyName y reverse para luego establecer la función que permite ordenar.
		$scope.propertyName = "title";
		$scope.reverse = true;

		$scope.sortBy = function(propertyName) {
	    	$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
	    	$scope.propertyName = propertyName;
	    	//Alterna el ordenador, copiado de la documentación de Angular JS
	  	};

	}
	//Fin del Controllador de Juego por Id

	//Comienzo del Controllador de Libro por Id
	var _libroIdController = function ($scope, $http, $routeParams){
		$scope.buscarLibroPorId = function () {	
			$http({
					method: "GET",
				  	url: "http://localhost:3000/books/" + $routeParams.libroId
				}).then(function successCallback(response) {
					return $scope.libroPorId = response.data;


				}, function errorCallback(response) {
					//En caso de error
					alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
			});
		} 

	} 	//Fin del controlador de Libro por Id

	var _libroIdModalController = function ($scope, $http, $uibModalInstance, libroClickeado){
		$scope.buscarLibroPorIdModal = function () {
			$http({
					method: "GET",
				  	url: "http://localhost:3000/books/" + libroClickeado.libro.id
				}).then(function successCallback(response) {
					return $scope.libroPorId = response.data;


				}, function errorCallback(response) {
					//En caso de error
					alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
			});
		}

	}

	//Comienza el controllador de explorar libros
		
	var _explorarLibrosController = function ($scope,$http, $uibModal) {
		$scope.buscarTodosLosLibros = function () {	
			$http({
					method: "GET",
				  	url: "http://localhost:3000/books"
				}).then(function successCallback(response) {
					return $scope.todosLosLibros = response.data;

				}, function errorCallback(response) {
					//En caso de error
					alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
			});
		}
		$scope.mostrarTabla = true;
		$scope.propertyName = "title";
		$scope.reverse = true;

		$scope.sortBy = function(propertyName) {
	    	$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
	    	$scope.propertyName = propertyName;
	    	//Alterna el ordenador, copiado de la documentación de Angular JS
	  	};

	  	//Parte de UI BOOTSTRAP, abre una pequeña ventana emergente que utiliza la plantilla y el controlador indicado.
		 $scope.openModal = function (size) {
		     var modalInstance = $uibModal.open({
		     templateUrl: 'vistas/libroIdModal.html',
		     controller: Ctrl.libroIdModalController,
		     size: size,
		     resolve: {
		     	libroClickeado: this
		     	}
		      
		     });
 		}


	}	//Finaliza el controllador de explorar libros

	//COntrollador para la barra de navegación en la que se aplica un poco de Jquery para modificar los estilos cuando se hace click o se mueve el ratón por encima de los elementos.
	var _barraNavegacionController = function(){
		angular.element("#myNavbar > ul > li").on("click", function () {
			angular.element("#myNavbar > ul > li").removeClass("active");
			angular.element(this).addClass("active");
		});
			angular.element("#myNavbar > ul > li").on("mouseover", function () {
			angular.element(this).addClass("resaltado");
		});
		angular.element("#myNavbar > ul > li").on("mouseleave", function () {
			angular.element(this).removeClass("resaltado");
		});
		angular.element("#myNavbar > ul > li > ul > li").on("mouseover", function(){
			angular.element(this).addClass("resaltado");
		});
		angular.element("#myNavbar > ul > li > ul > li").on("mouseleave", function(){
			angular.element(this).removeClass("resaltado");

		}); 
	};

//Controlador de la zona de recursos
	var _recursosController = function($scope){

		$scope.recursos = [
			{
				"nombre": "Lanzador de Dados",
				"imagen": "imagenes/dados.jpg",
				"ruta": "lanzadorDeDados"
			},
			{
				"nombre": "Listado de Editoriales de Rol",
				"imagen": "imagenes/editoriales.png",
				"ruta": "editoriales"
			},
			{
				"nombre": "Informacion sobre los Juegos de Rol",
				"imagen": "imagenes/informacion.png",
				"ruta": "informacion"
			}

		]



	}

	var _lanzadorDeDadosController = function ($scope) {

		$scope.lanzarDados = function(){
		 	for (n = 0; n < $scope.dado.d4; n++) {
		 		if (n == 0) {
		 			var cadenaD4 = Lanzar.D4();
		  		} else {
		  			var cadenaD4 = cadenaD4 + ", " + Lanzar.D4();
		  		}
		 	}
		 	for (n = 0; n < $scope.dado.d6; n++) {
		 		if (n == 0) {
		 			var cadenaD6 = Lanzar.D6();
		  		} else {
					var cadenaD6 = cadenaD6 + ", " + Lanzar.D6();
		 		}
			}
			for (n = 0; n < $scope.dado.d8; n++) {
		 		if (n == 0) {
		 			var cadenaD8 = Lanzar.D8();
		  		} else {
					var cadenaD8 = cadenaD8 + ", " + Lanzar.D8();
		 		}
			}
			for (n = 0; n < $scope.dado.d10; n++) {
		 		if (n == 0) {
		 			var cadenaD10 = Lanzar.D10();
		  		} else {
					var cadenaD10 = cadenaD10 + ", " + Lanzar.D10();
		 		}
			}
			for (n = 0; n < $scope.dado.d12; n++) {
		 		if (n == 0) {
		 			var cadenaD12 = Lanzar.D12();
		  		} else {
					var cadenaD12 = cadenaD12+ ", " + Lanzar.D12();
		 		}
			}
			for (n = 0; n < $scope.dado.d20; n++) {
		 		if (n == 0) {
		 			var cadenaD20 = Lanzar.D20();
		  		} else {
					var cadenaD20 = cadenaD20 + ", " + Lanzar.D20();
		 		}
			}
			for (n = 0; n < $scope.dado.d100; n++) {
		 		if (n == 0) {
		 			var cadenaD100 = Lanzar.D100();
		  		} else {
					var cadenaD100 = cadenaD100 + ", " + Lanzar.D100();
		 		}
			}

			return $scope.resultadosDados = [
				{dado: "D4", resultado: cadenaD4, dadosLanzados: $scope.dado.d4},
			 	{dado: "D6", resultado: cadenaD6, dadosLanzados: $scope.dado.d6},
			 	{dado: "D8", resultado: cadenaD8, dadosLanzados: $scope.dado.d8},
			 	{dado: "D10", resultado: cadenaD10, dadosLanzados: $scope.dado.d10},
			 	{dado: "D12", resultado: cadenaD12, dadosLanzados: $scope.dado.d12},
			 	{dado: "D20", resultado: cadenaD20, dadosLanzados: $scope.dado.d20},
			 	{dado: "D100", resultado: cadenaD100, dadosLanzados: $scope.dado.d100}
		 	]


		};
	}

	var _editorialesController = function ($scope){

		$scope.listaDeEditoriales = [
			{
				"nombre": "NoSoloRol", 
				"pagina_web": "http://www.nosolorol.com",
				"direccion": "C/ Ocaña 32, Local; 28047 Madrid",
				"telefono": "912 557 003 / 644 261 483",
				"email": "distribucion@nosolorol.com",
				"logo": "http://blogs.antena3.com/clipping/2015/05/11/00574/31.jpg"
			},
			{
				"nombre": "Ediciones Holocubierta",
				"pagina_web": "http://www.holocubierta.com/",
				"logo": "http://www.holocubierta.com/foro/styles/se_square_left/imageset/site_logo.png"
			},
			{
				"nombre": "Edge Entertaiment", 
				"pagina_web": "http://www.edgeent.com",
				"email": "edge@edgeent.com",
				"logo": "http://www.edgeent.com/static/img/LOGO_EDGE_WHITE.jpg"
			},
			{
				"nombre": "La Factoria de Ideas",
				"pagina_web": "http://www.distrimagen.com",
				"direccion": "Pico Mulhacen, 24 Pol. Ind. El Alquitón 28500 Arganda del Rey. Madrid",
				"telefono": "91 871 82 72",
				"email": "factoria@distrimagen.com",
				"logo": "http://3.bp.blogspot.com/-FyyE5Xxuh_M/Vo-3AoEpxUI/AAAAAAAAK20/1cu-Qj-ctYM/s1600/Factoria.jpg"
			}

		]


	}


//Inicio del Controlador de Borrar los Datos del juego, al seleccionador un juego se muestra
// por pantalla y si el usuario está de acuerdo lo elimina de la base da datos.
	var _borrarController = function($scope, $http){
		$scope.buscarTodosLosJuegos = function () {	
			$http({
					method: "GET",
				  	url: "http://localhost:3000/jdr"
				}).then(function successCallback(response) {
					return $scope.todosLosJuegos = response.data;

				}, function errorCallback(response) {
					//En caso de error
					alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
			});
		}
		$scope.buscarTodosLosLibros = function () {	
			$http({
					method: "GET",
				  	url: "http://localhost:3000/books"
				}).then(function successCallback(response) {
					return $scope.todosLosLibros = response.data;

				}, function errorCallback(error) {
					//En caso de error
					alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
			});
		}

		$scope.borrarDatosJuego = function (){

				$http({
						method: "DELETE",
					  	url: "http://localhost:3000/jdr/" + $scope.juegoSeleccionado.id
					}).then(function successCallback(response) {
							return $scope.juegoBorrado = true;


					}, function errorCallback(response) {
						//En caso de error
						alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
				})

		}
		$scope.borrarDatosLibro = function (){
				$http({
						method: "DELETE",
					  	url: "http://localhost:3000/books/" + $scope.libroSeleccionado.id
					}).then(function successCallback(response) {
							return $scope.libroBorrado = true;
					}, function errorCallback(response) {
						//En caso de error
						alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
				});

		}


	} //FIn del Controlador de Actualizar

//Inicio del Controlador de Actualizar, funciona de forma similar al de borrar.
	var _actualizarController = function ($scope, $http) { 

	$scope.libroValido = function () {
    return $scope.formularioActualizarLibro.$valid && $scope.libroSeleccionado.title.length>0 && $scope.libroSeleccionado.edition.length>0 && $scope.libroSeleccionado.rpg.length>0 && 	$scope.libroSeleccionado.type.length>0;
   
	};

	$scope.juegoValido = function () {
    return $scope.formularioActualizarJuego.$valid &&
    		$scope.juegoSeleccionado.name.length>0;
   
	};

		$scope.buscarTodosLosJuegos = function () {	
			$http({
					method: "GET",
				  	url: "http://localhost:3000/jdr"
				}).then(function successCallback(response) {
					return $scope.todosLosJuegos = response.data;

				}, function errorCallback(response) {
					//En caso de error
					alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
			});
		}
		$scope.buscarTodosLosLibros = function () {	
			$http({
					method: "GET",
				  	url: "http://localhost:3000/books"
				}).then(function successCallback(response) {
					return $scope.todosLosLibros = response.data;

				}, function errorCallback(error) {
					//En caso de error
					alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
			});
		}
		$scope.actualizarDatosJuego = function(){
			$scope.jdr = $scope.juegoSeleccionado;
			$http({
					method: "PATCH",
					data: $scope.jdr,
				  	url: "http://localhost:3000/jdr/" + $scope.juegoSeleccionado.id
				}).then(function successCallback(response) {
					return $scope.juegoActualizado = true;
				}, function errorCallback(error) {
					//En caso de error
					alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
			});
		}
		$scope.actualizarDatosLibro = function(){
			$scope.books = $scope.libroSeleccionado;
			$http({
					method: "PATCH",
					data: $scope.books,
				  	url: "http://localhost:3000/books/" + $scope.libroSeleccionado.id
				}).then(function successCallback(response) {
					return $scope.libroActualizado = true;
				}, function errorCallback(error) {
					//En caso de error
					alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
			});
		}

	} // Fin de la sección borrar

	//Inicio de la sección API
	var _apiController = function () {

	}
	var _informacionController = function ($scope){
		
	}
	var _traduccionesController = function ($scope, $http, $log){
		//La sección de libros Traducidos indica los libros que he traducido con su ID y el numero de palabras
		// Al ejecutar la funcion buscarLibroPorId se recorre cada uno de los libros traducidos, se busca
		// en la base de datos el ID del libro y se fusionan la respuesta con libros traducidos, luego
		// libros traducidos es lo que se pinta
		$scope.librosTraducidos = [
			{"id": 22, "num_palabras": 60417}, //Manifiesto
			{"id": 15, "num_palabras": 75725}, //Orden de Hermes
			{"id": 16, "num_palabras": 123736}, //Coro
			{"id": 17, "num_palabras": 66209}, //Verbena
			{"id": 18, "num_palabras": 88264}, //Las Vegas
			{"id": 21, "num_palabras": 145871}, //Manual del Narrador
			{"id": 13, "num_palabras": 74667}, //Horizonte
			{"id": 20, "num_palabras": 199120}, //Guia de las Tradiciones
			{"id": 19, "num_palabras": 51384}, //La Senda Fragil
			{"id": 23, "num_palabras": 27283}, // Mage 20 Quickstart
			{"id": 14, "num_palabras": 12014} // Casa de la Muerte
		]

		$scope.buscarLibroPorId = function () {
			angular.forEach($scope.librosTraducidos,function(v,k){
				$http({
						method: "GET",
					  	url: "http://localhost:3000/books/" + v.id 
					}).then(function successCallback(response) {
						angular.merge(v,response.data)
						//return $scope.librosTraducidos.push(response.data)
					}, function errorCallback(response) {
						//En caso de error
						alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
				});
					
			})
		} 


	}
	// Inicio del controlador de buscar lo que hace es concatenar los datos que el usuario introduce en una petición
	// a la base de datos para luego hacer una petición especifica

	var _buscadorController = function ($scope, $http){

		$scope.por = 'name';
		$scope.buscar = 'jdr';
		$scope.restriccion = '_like';


		$scope.buscarCualquierCosa= function () {
			if($scope.buscar == 'jdr' && $scope.por != 'name'){
				$scope.por = 'name';
			}

			console.log("http://localhost:3000/" + $scope.buscar + "?" + $scope.por + $scope.restriccion + "=" + $scope.valor)
				$http({
						method: "GET",
					  	url: "http://localhost:3000/" + $scope.buscar + "?" + $scope.por + $scope.restriccion + "=" + $scope.valor
					}).then(function successCallback(response) {
						if ($scope.buscar == 'books') {
							$scope.juegosBuscados = undefined;
							return $scope.librosBuscados = response.data;
						} else if ($scope.buscar == 'jdr') {
							$scope.librosBuscados = undefined;
							return $scope.juegosBuscados = response.data;
						}
					
					}, function errorCallback(response) {
						//En caso de error
						alert("Se ha producido un error, ¿Estas segur@ que el json-server está funcionando?");
				});
					
		} 
	} // Fin del buscador Controller



//

	return {
		presentacionController: _presentacionController,
		anadirController: _anadirController,
		apiController: _apiController,
		explorarController: _explorarController,
		explorarLibrosController: _explorarLibrosController,
		explorarJuegosController: _explorarJuegosController,
		libroIdController: _libroIdController,
		libroIdModalController: _libroIdModalController,
		juegoIdController: _juegoIdController,
		barraNavegacionController: _barraNavegacionController,
		recursosController: _recursosController,
		lanzadorDeDadosController: _lanzadorDeDadosController,
		editorialesController: _editorialesController,
		actualizarController: _actualizarController,
		borrarController: _borrarController,
		funcionamientoController: _funcionamientoController,
		informacionController: _informacionController,
		traduccionesController: _traduccionesController,
		buscadorController: _buscadorController
	}

 })();



