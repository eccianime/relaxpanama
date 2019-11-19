/*
kamal@relaxpanama.com
*/

AJAX( 'catalogo/'+promo+"/detalle", null , promodetalleRSP, "GET" );

var promo_det = {};

function promodetalleRSP( xhr ) {
	var datos 		= xhr.detalles,
		html_stack 	= function( tipo, link ) {
			return "<a href=# data-href='"+link+"' class='ui-btn text-green'><span class='fa-stack fa-1x'>\
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
				$(".rank").append( "<img src='../../img/"+img+".png'>" );
			}
			while( rest > 0 ){
				$(".rank").append( "<img src='../../img/estr_gf.png'>" );
				rest--;
			}
		};

	$('[img-com]').css({'background-image':"url("+datos.comercio.logo+")"});
	$('[tit-com]').html(datos.comercio.name);

	if( datos.comercio.phone != "" ){           		$("[cont-com]").append( "<a class='ui-btn' style='background-image: url(../../img/dtl_tlf.png);' href=# data-href='tel:"+datos.comercio.phone+"'>"+datos.comercio.phone+"</span>" );											}
 	if( datos.comercio.email != "" ){           		$("[cont-com]").append( "<a class='ui-btn' style='background-image: url(../../img/dtl_cor.png);' href=# data-href='mailto:"+datos.comercio.email+"'>"+datos.comercio.email+"</span>" );											}
	if( datos.comercio.geolocalizacion != "," ){		$("[cont-com]").append( "<a class='ui-btn' style='background-image: url(../../img/dtl_loc.png);' href=# data-href='http://maps.google.com/?q="+datos.comercio.geolocalizacion+"'>"+datos.comercio.geolocalizacion+"</span>" );	}

	$("[cont-com] a").each( function(){ 
		$(this).click(function() {
			window.open( $(this).attr('data-href'), "_system" );
		})
	})

	if( datos.comercio.facebook != "" ){			$(".soc").append( html_stack("facebook", datos.comercio.facebook) );					}
	if( datos.comercio.twitter != "" ){				$(".soc").append( html_stack("twitter", datos.comercio.twitter) );					}
	if( datos.comercio.instagram != "" ){			$(".soc").append( html_stack("instagram", "https://www.instragram.com/"+datos.comercio.instagram.substring(1, datos.comercio.instagram.lenght ) ) );		}

	$(".soc a").each( function(){ 
		$(this).click(function() {
			window.open( $(this).attr('data-href'), "_system" );
		})
	})
	
	fun_estr( datos.comercio.ranking );

	promo_det = {
		id: datos.id,
		name: datos.name,
		price: datos.price,
	}

	$('[id-promo]').attr('id-promo', datos.id);
	$('[tit-promo]').html(datos.name);
	$('[desc-promo]').html(datos.large_description);
	$('[img-promo]').attr( 'src', datos.large_image);
	$('[term-promo]').html(datos.terms);
	$('[prec-promo]').html(datos.price);
}

function compraPromo() {
	$.mobile.changePage( "../compra/compra.html" );
}