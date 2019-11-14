AJAX( 'comercios', null , comerciosRSP, "GET" );

var com = "";

function comerciosRSP( xhr ) {
	var comercios 	= xhr.comercios,
		html 		= "";

	$.each( comercios, function( i ) {
		html += "\
			<div class='col-xs-6'><div class='box caja-cuadrada' data-com="+comercios[i].slug+" style='background-image: url("+comercios[i].logo+")'></div></div>\
		";
	});
	$("#comercios.ui-page-active .lista-com").append( html );
	$("[data-com]").click(function() {
		com = $(this).attr('data-com');
		$.mobile.changePage('comercio-detalle.html');
	})
}