AJAX( 'catalogo', null , catalogoRSP, "GET" );

var promo = "";

function catalogoRSP( xhr ) {
	var paquetes 	= xhr.paquetes,
		html 		= "";
	$.each( paquetes, function( i ) {
		html += "\
			<div class='elemento-lista' data-promo-id="+paquetes[i].id+"><div class='row'><div class='col-xs-4'>\
			<div class='box foto-promo' style='background-image:url("+paquetes[i].short_image+")'></div></div>\
					<div class='col-xs-8'><div class='box'>\
							<p class='text-center titulo-promo'>"+paquetes[i].name+"</p>\
							<p class='sin-margen'>"+paquetes[i].short_description+"</p>\
							<p class='patrocinador'>"+paquetes[i].comercio.name+"</p>\
							<div class='ubic-precio'> \
								<p> "+paquetes[i].comercio.ubicacion+" </p>\
								<p> "+paquetes[i].price+"</p>\
  							</div></div></div></div></div>";
	});
	$(".ui-page-active .lista-catalogo").append( html );
	$(".elemento-lista").click(function() {
		mostrarComprar = 1;
		promo = $(this).attr('data-promo-id');
		$.mobile.changePage('promo-detalle.html');
	})
}

