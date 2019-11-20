AJAX( 'movimientos/'+activeCard, null , movimientosRSP, "GET" );

function movimientosRSP( xhr ) {
	var html 	= "<div class=base-movimientos><h3 class='text-center'>Wallet Relax:  "+xhr.tarjeta+"</h3>",
		mov 	= xhr.movimientos;

	if( mov.length > 0 ){
		$.each( mov, function( i ) {
			html += "<div class='bloque-mov'>\
						<div class='bloque-mov-izq'>\
							<p class='negrita'>"+mov[i].descripcion+"</p>\
							<p>"+mov[i].tipo+" ID:"+mov[i].id+"</p>\
						</div>\
						<div class='bloque-mov-der'>\
							<p class='negrita'>"+mov[i].fecha+"</p>\
							<p><span style='color:"+mov[i].color+"'>"+mov[i].signo+mov[i].monto+"</span></p>\
						</div>\
					</div>";
		})
	}else{
		html += "<div class='bloque-mov' style='padding: 20px 30px'>NO HAY MOVIMIENTOS PARA ESTA WALLET</div>";
	}
	html += "</div>";
	$("[role=main]").append( html ).ready(function() {
		var altos = {
			a: parseInt( $(".ui-page-active").css('height') ),
			b: parseInt( $(".ui-page-active .ui-header").css('height') ),
			c: parseInt( $(".ui-page-active .tit-fond-azul").css('height') ),
		};
		$(".base-movimientos").css({minHeight:( (altos.a)-(altos.b)-(altos.c) )});
	});
}