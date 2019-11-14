/*
kamal@relaxpanama.com
*/

AJAX( 'catalogo/'+promo+"/detalle", null , promodetalleRSP, "GET" );


function promodetalleRSP( xhr ) {
	var datos 		= xhr.detalles,
		html_stack 	= function( tipo ) {
			return "<span class='fa-stack fa-1x'>\
  				<i class='fa fa-circle fa-stack-2x'></i>\
  				<i class='fa fa-"+tipo+" fa-stack-1x fa-inverse'></i>\
			</span>";
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

	$('[img-com]').css({'background-image':"url("+datos.comercio.logo+")"});
	$('[tit-com]').html(datos.comercio.name);

	if( datos.comercio.phone != "" ){
		$("[cont-com]").append( "<span  style='background-image: url(../../img/dtl_tlf.png);'>"+datos.comercio.phone+"</span><br><br>" );
	}
	if( datos.comercio.email != "" ){
		$("[cont-com]").append( "<span  style='background-image: url(../../img/dtl_cor.png);'>"+datos.comercio.email+"</span><br><br>" );
	}
	if( datos.comercio.geolocalizacion != "," ){
		$("[cont-com]").append( "<span  style='background-image: url(../../img/dtl_loc.png);'>"+datos.comercio.geolocalizacion+"</span>" );
	}

	if( datos.comercio.facebook != "" ){
		$(".soc").append( html_stack("facebook") );
	}

	if( datos.comercio.twitter != "" ){
		$(".soc").append( html_stack("twitter") );
	}

	if( datos.comercio.instagram != "" ){
		$(".soc").append( html_stack("instagram") );
	}

	fun_estr( datos.comercio.ranking );

	$('[tit-promo]').html(datos.name);
	$('[desc-promo]').html(datos.large_description);
	$('[img-promo]').attr( 'src', datos.large_image);
	$('[term-promo]').html(datos.terms);
	$('[prec-promo]').html(datos.price);
}

function compraPromo() {
	
}