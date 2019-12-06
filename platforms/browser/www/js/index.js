function onBodyLoad() {
	document.addEventListener("deviceready", PGcargado, false);
	document.addEventListener("backbutton", botonAtras, false);
}

function botonAtras( e ) {
	e.preventDefault();
	if( $('.ui-page-active').attr("id") == "home" ){
		if( $( '#modalSalir-popup' ).hasClass( 'ui-popup-active' ) ){
			window.history.back();
		}else{
			abrirModalSalir();
		}
	}
}

function SalirApp() {
	navigator.app.exitApp();	
}

function PGcargado(){

	$.mobile.defaultPageTransition = 'pop';
	$.mobile.loadingMessage = "Cargando...";
	$.mobile.loadingMessageTextVisible = true;
	$.mobile.loadingMessageTheme = "b";
	$.mobile.pageLoadErrorMessage = "Disculpe, su solicitud no pudo ser procesada.";
	$.mobile.pageLoadErrorMessageTheme = "b";
	$.mobile.pageLoadErrorMessageTheme = "b";

	$("#modalGeneral").popup();
	$("#modalSalir").popup();
	

	setTimeout( function () {
		$(".splash").fadeOut();
	}, 3000);

	$("input[name=email]").keydown(function( e ) {
		if( e.which == 32 ){ // previene el espacio
			e.preventDefault();
		}
	})
}

var usuario = {};
const URL_BASE = "https://www.relaxcolombia.com/api/";

function AJAX( url, data , resp, metodo = "POST" ) {
	mostrarCargando();
	$.ajax({
		type: metodo,
		url: URL_BASE+url,
		data: data,
		dataType: 'json',
		success: function( xhr, status ) {
			if( status == "success" ){
				resp(xhr);
				quitarCargando();
			}else{
				abrirModal( 1, 'Ocurrió un error, verifique los datos ingresados e intente nuevamente.' );
			}
			
		},
		error: function( xhr, status ) {
			if( xhr.statusText == "error" ){
				quitarCargando();
				abrirModal( 1, 'Ocurrió un error, verifique los datos ingresados e intente nuevamente.' );
			}
		},
	});
}


function abrirModal( nro, mensaje, regresar = null ) {
	var color = nro == 1 ? "rgb(213,14,33)" : ( nro == 2 ? "rgb(90,177,20)" : "rgb(255,168,0)" ) ;
	var titulo = nro == 1 ? "<i class='fa fa-times-circle'></i> Ocurrió un Error" : ( nro == 2 ? "<i class='fa fa-check-circle'></i> Éxito" : "<i class='fa fa-warning'></i> Información" );
	
	$(".ui-popup.ui-body-inherit").css({backgroundColor:color});
	$(".ui-popup .ui-btn").css({backgroundColor:color});

	$("#tituloModal").html(titulo);
	$("#mensajeModal").html(mensaje);

	if( regresar != null ){
		$("#botonAtrasModal").attr('data-rel',"");
		var onclk = "";
		if( regresar == 1 ){
			onclk = 'window.history.back();window.history.back();';
		}else{
			for (var i = 0; i < regresar; i++) {
				onclk += 'window.history.back();';
			}
		}
		$("#botonAtrasModal").attr('onclick', onclk );
		
	}else{
		$("#botonAtrasModal").attr('data-rel',"back");
		$("#botonAtrasModal").attr('onclick', "" );
	}

	$("#modalGeneral").popup("open");
}

function abrirModalSalir() {
	$(".ui-popup.ui-body-inherit").css({backgroundColor:"rgb(255,168,0)"});
	$(".ui-popup .ui-btn").css({backgroundColor:"rgb(255,168,0)"});
	$("#modalSalir").popup("open");
}

function mostrarCargando( transp = 0 ) {
	var transp = transp == 1 ? "mid-transp" : "";
	$('html').css({overflow: 'hidden'});
	var loading = "<div class='splash "+transp+"'></div>";
	$('[data-role=page]').append(loading);
}

function quitarCargando() {
	$(".splash").remove();
	$('html').css({overflow: 'scroll'});
}

function rspBase( datos ) {
	abrirModal( datos.nro, datos.msg, datos.reg );	
}

function errorConn() {
	$(".splash").remove();
	abrirModal( 1, "Disculpe, hubo un error al conectar. Intente nuevamente o contacte al administrador del sistema." );
}

function restaDeFechas( fecha ) {
	var fechas = {
		dada: {
			base: 		new Date(fecha),
			get y(){	return this.base.getFullYear();		},
			get m(){	return this.base.getMonth()+1;		},
			get d(){	return this.base.getDate();			},
		},
		hoy: {
			base: 		new Date(),
			get y(){	return this.base.getFullYear();		},
			get m(){	return this.base.getMonth()+1;		},
			get d(){	return this.base.getDate();			},
		},
		get resta(){
			var meses = (this.hoy.y - this.dada.y)*12 + (this.hoy.m - this.dada.m);
			var hace = "Hace ";
			if( meses > 24 ){
				return "Hace más de 2 años";
			}else if( meses > 12  ){
				return "Hace más de un año";
			}else if( meses > 1 ){
				return "Hace "+meses+" meses";
			}else if( meses == 1 ){
				return "Hace un Mes";
			}else{
				var dias = this.hoy.d - this.dada.d;
				if( dias > 1 ){
					return "Hace "+dias+" días";	
				}else if( dias == 1 ){
					return "Ayer";	
				}else{
					return "Hace unas horas";	
				}
			}
		}
	}
	return fechas.resta;
}

function salir() {
	mostrarCargando( 1 );
	$.ajax({
		url: "../index.html",
		complete: function( a,b,c ) {
			if( b == "success" ){
				window.location.assign("../index.html");
			}else{
				window.location.assign("../../index.html");
			}
			
		}
	})
}