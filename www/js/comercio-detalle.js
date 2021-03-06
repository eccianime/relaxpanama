/*
kamal@relaxpanama.com
*/
AJAX( "comercios/detalle", {slug:com} , comerciodetalleRSP );
var promo;
function comerciodetalleRSP( xhr ) {
	var datos 		= xhr.detalle,
		categorias 	= xhr.categorias,
		html 		= "", 
		html2 		= "", 
		paquetes 	= datos.paquetes,
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
				$(".rank").append( "<img src='../../img/"+img+".png'>" )
			}
			while( rest > 0 ){
				$(".rank").append( "<img src='../../img/estr_gf.png'>" )	
				rest--;
			}
		},
		pago_sitio 	= function( ps, pr ) {
			var p_s = ps == 1 ? "" : "in";
			var p_r = pr == 1 ? "" : "in";
			$(".pago-sitio").append( "<img class=img-responsive src='../../img/pago_sitio_"+p_s+"activo.png'>" )
			$(".pago-sitio").append( "<img class=img-responsive src='../../img/pago_remoto_"+p_r+"activo.png'>" )
		};

	$(".tit-fond-azul").html( datos.name );
	$('[img-com]').css({'background-image':"url("+datos.logo+")"});

	if( datos.phone != "" ){           		$("[cont-com]").append( "<a class='ui-btn' style='background-image: url(../../img/dtl_tlf.png);' href=# data-href='tel:"+datos.phone+"'>"+datos.phone+"</span>" );											}
 	if( datos.email != "" ){           		$("[cont-com]").append( "<a class='ui-btn' style='background-image: url(../../img/dtl_cor.png);' href=# data-href='mailto:"+datos.email+"'>"+datos.email+"</span>" );											}
	if( datos.geolocalizacion != "," ){		$("[cont-com]").append( "<a class='ui-btn' style='background-image: url(../../img/dtl_loc.png);' href=# data-href='http://maps.google.com/?q="+datos.geolocalizacion+"'>Dirección</span>" );	}

	if( datos.facebook != "" ){			$(".soc").append( html_stack("facebook", datos.facebook) );					}
	if( datos.twitter != "" ){			$(".soc").append( html_stack("twitter", datos.twitter) );					}
	if( datos.instagram != "" ){		$(".soc").append( html_stack("instagram", "https://www.instragram.com/"+datos.instagram.substring(1, datos.instagram.lenght ) ) );		}

	$("[cont-com] a, .soc a").each( function(){ 
		var btn = $(this);
		btn.click(function() {
			window.open( btn.attr('data-href'), "_system" );
		})
	})
	
	fun_estr( datos.ranking );
	pago_sitio( datos.pago_sitio, datos.retomte_paymenet );


	if( paquetes.length > 0 ){
		$.each( paquetes, function( i ) {
			html += "\
				<div class='elemento-lista' data-promo-cat="+paquetes[i].category_id+" data-promo-price="+paquetes[i].price+" data-promo-name="+paquetes[i].name+" data-promo-id="+paquetes[i].id+"><div class='row'><div class='col-xs-4'>\
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
		$(".ui-page-active .lista-catalogo").append( html ).ready( function() {
			$(".elemento-lista").click(function() {
				promo = $(this).attr('data-promo-id');
				mostrarComprar = 1;
				$.mobile.changePage('../promociones/promo-detalle.html');
			})

			var sel = "<div class='categ-comercios'>\
							<select name='categ-comercios' data-icon=search>\
								<option value=''>Todos</option>\
							</select>\
						</div>";
			$('.lista-categ').append(sel).trigger('create');

			$.each( categorias, function( i ) {
				html2 += "<option value="+i+">"+categorias[i]+"</option>"
			});

			$("[name=categ-comercios]").append( html2 ).ready(function() {
				$(this).change( function() {
					if( $("option:selected").attr('value') == "" ){
						$("[data-promo-cat]").css({display:"block"});
					}else{
						$("[data-promo-cat]").css({display:"none"});
						$("[data-promo-cat="+$("option:selected").attr('value')+"]").css({display:"block"});
					}
				})
			});
		} );
	}else{
		$('.lista-catalogo').before("<div style='margin: 5% 7%;'>ESTA EMPRESA NO TIENE PAQUETES REGISTRADOS POR LOS MOMENTOS</div>");
	}	
}