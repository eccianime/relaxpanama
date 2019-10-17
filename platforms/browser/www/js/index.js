function onBodyLoad() {
	document.addEventListener("deviceready", PGcargado, false);
}

function PGcargado(){

	$.mobile.defaultPageTransition = 'flip';
	$.mobile.loadingMessage = "Cargando...";
	$.mobile.loadingMessageTextVisible = true;
	$.mobile.loadingMessageTheme = "b";
	$.mobile.pageLoadErrorMessage = "Disculpe, su solicitud no pudo ser procesada.";
	$.mobile.pageLoadErrorMessageTheme = "b";
	$.mobile.pageLoadErrorMessageTheme = "b";
	
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.pushState = false;

	
}

function corsinaction () {

	$.ajax({
		type: "GET",
		url: "http://appevt.zz.com.ve/webservice.php",
		dataType: "jsonp",
		jsonpCallback: 'respuestaJSONP',
	});
}

function respuestaJSONP (datos) {
	console.log(datos);
	$.each(datos,function (i, v) {
		$("#empieza").append("<br/><span>Índice: "+i+" - Valor: "+v+"</span>");
	});
}