AJAX( 'catalogo', null , catalogoRSP, "GET" );

var promo = "";

function catalogoRSP( xhr ) {
	var paquetes 	= xhr.paquetes,
		categorias	= xhr.categorias.Categorias, 	
		html 		= "",
		html2 		= "";
	$.each( paquetes, function( i ) {
		html += "\
			<div class='elemento-lista' data-cat="+paquetes[i].category_id+" data-promo-id="+paquetes[i].id+"><div class='row'><div class='col-xs-4'>\
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
	$(".ui-page-active .lista-catalogo").append( html ).ready(function() {
		$(".elemento-lista").click(function() {
			mostrarComprar = 1;
			promo = $(this).attr('data-promo-id');
			$.mobile.changePage('promo-detalle.html');
		})

		$.each( categorias, function( i ) {
			html2 += "<option value="+i.substring(4)+">"+categorias[i]+"</option>"
		});

		$("[name=categ-promociones]").append( html2 ).ready(function() {
			$(this).change( function() {
				if( $("option:selected").attr('value') == "" ){
					$("[data-cat]").css({display:"block"});
				}else{
					$("[data-cat]").css({display:"none"});
					$("[data-cat="+$("option:selected").attr('value')+"]").css({display:"block"});
				}
			})
		});
	});
}

