/*
kamal@relaxpanama.com
*/

AJAX( 'comercios', null , comerciosRSP, "GET" );

function comerciosRSP( xhr ) {
	var comercios 	= xhr.comercios,
		html 		= "";

	$.each( comercios, function( i ) {
		html += "\
			<div class='col-xs-6'><div class='box'>\
				<img data-com="+comercios[i].slug+" src="+comercios[i].logo+" class='img-responsive'>\
			</div></div>\
		";
	});
	$("#comercios.ui-page-active .lista-com").append( html );
}