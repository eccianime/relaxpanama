/*
kamal@relaxpanama.com
*/
AJAX( "comercios/detalle", {slug:com} , comerciodetalleRSP );
var promo = "";
function comerciodetalleRSP( xhr ) {
	var datos 		= xhr.detalle,
		html 		= "", 
		paquetes 	= datos.paquetes,
		html_stack 	= function( tipo, link ) {
			return "<a href='"+link+"' class='ui-btn text-green'><span class='fa-stack fa-1x'>\
  				<i class='fa fa-circle fa-stack-2x'></i>\
  				<i class='fa fa-"+tipo+" fa-stack-1x fa-inverse'></i>\
			</span></a>";
		},
		fun_estr 	= function( str ) {
			var rest 	= Math.floor(5 - str),
				img 	= "";
			while( str > 0 ){
				if( str == 0.5 ){
					img = "estr_me";
					str -= 0.5;
				}else{
					img = "estr_vf";
					str--;
				}
				$(".rank").append( "<img src='../../img/"+img+".png'>" )
			}
			while( rest > 0 ){
				$(".rank").append( "<img src='../../img/estr_gf.png'>" )	
				rest--;
			}
		};

	$(".tit-fond-azul").html( datos.name );

	$('[img-com]').css({'background-image':"url("+datos.logo+")"});

	if( datos.phone != "" ){           		$("[cont-com]").append( "<a class='ui-btn' style='background-image: url(../../img/dtl_tlf.png);' href=# data-href='tel:"+datos.phone+"'>"+datos.phone+"</span>" );											}
 	if( datos.email != "" ){           		$("[cont-com]").append( "<a class='ui-btn' style='background-image: url(../../img/dtl_cor.png);' href=# data-href='mailto:"+datos.email+"'>"+datos.email+"</span>" );											}
	if( datos.geolocalizacion != "," ){		$("[cont-com]").append( "<a class='ui-btn' style='background-image: url(../../img/dtl_loc.png);' href=# data-href='http://maps.google.com/?q="+datos.geolocalizacion+"'>"+datos.geolocalizacion+"</span>" );	}

	$("[cont-com] a").each( function(){ 
		$(this).click(function() {
			window.open( $(this).attr('data-href'), "_system" );
		})
	})

	if( datos.facebook != "" ){        		$(".soc").append( html_stack("facebook", datos.facebook) );			}
	if( datos.twitter != "" ){         		$(".soc").append( html_stack("twitter", datos.twitter) );			}
	if( datos.instagram != "" ){			$(".soc").append( html_stack("instagram", "https://www.instragram.com/"+datos.instagram.substring(1, datos.instagram.lenght ) ) );		}

	fun_estr( datos.ranking );

	if( paquetes.length > 0 ){
		var sel = "<div class='input-agrupado'>\
			<div class='ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'><input type='text' placeholder='Seleccione...'></div>\
			<span class='fa fa-search icono-verde'></span>\
		</div>";
		$('.lista-catalogo').before(sel);
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
		$("#comercio-detalle.ui-page-active .lista-catalogo").append( html );
		$(".elemento-lista").click(function() {
			promo = $(this).attr('data-promo-id');
			$.mobile.changePage('../promociones/promo-detalle.html');
		})
	}else{
		$('.lista-catalogo').before("<div style='margin: 5% 7%;'>ESTA EMPRESA NO TIENE PAQUETES REGISTRADOS POR LOS MOMENTOS</div>");
	}	
}