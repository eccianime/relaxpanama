/*
kamal@relaxpanama.com
*/
AJAX( 'comercios', null , comerciosRSP, "GET" );

var com = "";

function comerciosRSP( xhr ) {
	var comercios 	= xhr.comercios,
		categorias 	= xhr.categorias,
		html 		= "",
		html2 		= "";

	$.each( comercios, function( i ) {
		html += "\
			<div class='col-xs-6' data-cat="+comercios[i].merchant_category_id+"><div class='box caja-cuadrada' data-com="+comercios[i].slug+" style='background-image: url("+comercios[i].logo+")'></div></div>\
		";
	});
	$("#comercios.ui-page-active .lista-com").append( html ).ready(function() {
		$("[data-com]").click(function() {
			com = $(this).attr('data-com');
			$.mobile.changePage('comercio-detalle.html');
		})

		$.each( categorias, function( i ) {
			html2 += "<option value="+i+">"+categorias[i]+"</option>"
		});

		$("[name=categ-comercios]").append( html2 ).ready(function() {
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