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
		},
		pago_sitio 	= function( ps, pr ) {
			var p_s = ps == 1 ? "" : "in";
			var p_r = pr == 1 ? "" : "in";
			$(".pago-sitio").append( "<img class=img-responsive src='../../img/pago_sitio_"+p_s+"activo.png'>" )
			$(".pago-sitio").append( "<img class=img-responsive src='../../img/pago_remoto_"+p_r+"activo.png'>" )
		};;

	$('[img-com]').css({'background-image':"url("+datos.comercio.logo+")"});
	$('[tit-com]').html(datos.comercio.name);

	if( datos.comercio.phone != "" ){           		$("[cont-com]").append( "<a class='ui-btn' style='background-image: url(../../img/dtl_tlf.png);' href=# data-href='tel:"+datos.comercio.phone+"'>"+datos.comercio.phone+"</span>" );											}
 	if( datos.comercio.email != "" ){           		$("[cont-com]").append( "<a class='ui-btn' style='background-image: url(../../img/dtl_cor.png);' href=# data-href='mailto:"+datos.comercio.email+"'>"+datos.comercio.email+"</span>" );											}
	if( datos.comercio.geolocalizacion != "," ){		$("[cont-com]").append( "<a class='ui-btn' style='background-image: url(../../img/dtl_loc.png);' href=# data-href='http://maps.google.com/?q="+datos.comercio.geolocalizacion+"'>Dirección</span>" );	}

	if( datos.comercio.facebook != "" ){			$(".soc").append( html_stack("facebook", datos.comercio.facebook) );					}
	if( datos.comercio.twitter != "" ){				$(".soc").append( html_stack("twitter", datos.comercio.twitter) );					}
	if( datos.comercio.instagram != "" ){			$(".soc").append( html_stack("instagram", "https://www.instragram.com/"+datos.comercio.instagram.substring(1, datos.comercio.instagram.lenght ) ) );		}
	
	$("[cont-com] a, .soc a").each( function(){ 
		var btn = $(this);
		btn.click(function() {
			window.open( btn.attr('data-href'), "_system" );
		})
	})

	fun_estr( datos.comercio.ranking );
	pago_sitio( datos.comercio.pago_sitio, datos.comercio.retomte_paymenet );

	promo_det = {
		id: datos.id,
		name: datos.name,
		price: datos.price,
	}

	$('[id-promo]').attr('id-promo', datos.id);
	$('[tit-promo]').html(datos.name);
	$('[desc-promo]').html(datos.large_description);
	
	
	var html = "";

	if( datos.img_adicionales.length > 0 ){
		html = "<div class='jcarousel-wrapper'><div class='jcarousel'>\
						<ul data-lista-carousel>\
							<li><div class='carta'><img class='img-responsive' src='"+datos.large_image+"'></div></li>";

		$.each( datos.img_adicionales, function( i ) {
			html += "<li><div class='carta'><img class='img-responsive' src='"+datos.img_adicionales[i]+"'></div></li>";
		})

		html += "</ul></div><a href='#' class='jcarousel-control-prev'>&lsaquo;</a><a href='#' class='jcarousel-control-next'>&rsaquo;</a></div>";
		$(".img-o-carousel").append( html ).ready(function() {
			var jcarousel = $('.jcarousel')
				.on('jcarousel:reload jcarousel:create', function () {
					var carousel = $(this),
						width = carousel.innerWidth();

					carousel.jcarousel('items').css('min-width', $(document).width() + 'px');
					carousel.jcarousel('items').css('max-width', $(document).width() + 'px');
				})
				.jcarousel({
					wrap: 'circular'
				});

			$('.jcarousel-control-prev')
				.jcarouselControl({
					target: '-=1'
				});

			$('.jcarousel-control-next')
				.jcarouselControl({
					target: '+=1'
				});
		});
	}else{
		html = "<img class='img-responsive' src='"+datos.large_image+"'>";
		$(".img-o-carousel").append( html );
	}
	

	$('[term-promo]').html(datos.terms);
	$('[prec-promo]').html(datos.price);

	if( mostrarComprar == 0 ){
		$(".mostrarComprar").css({display:"none"});
	}
}

function compraPromo() {
	$.mobile.changePage( "../compra/compra.html" );
}