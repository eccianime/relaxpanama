AJAX( 'home', {id: usuario.id}, homeRSP );

function homeRSP( xhr ) {
	$("[name=nombreUsuario]").html( xhr.user.name );
	var html = "";
	var cards = xhr.cards;
	$.each( cards, function( i ) {
		html +="<li><div class='carta' data-carta="+cards[i].id+">\
			<img class='img-responsive' src='../img/disponible.png'>\
			<div class='disponibles'>"+cards[i].balance.toFixed(2)+"</div>\
			<div class='cartera'>\
				<div class='punteado row'>\
					<div class='xs-6'>\
						<a href='#' class='ui-link'><img class='img-responsive' src='../img/cambiar_pin.png'></a>\
						<a href='#' class='ui-link'><img class='img-responsive' src='../img/recargar.png'></a>\
						<a href='#' class='ui-link'><img class='img-responsive' src='../img/mis_paquetes.png'></a>\
					</div>\
					<div class='xs-6'>\
						<div class='abajo-izq'>\
							<a class='ui-btn boton-dentro-cart' href='#'>VER<br>MOVIMIENTOS</a>\
							<div class='id-usuario'>\
								<span class='id-cart'>ID: </span><span class='num-cart'>"+cards[i].serial+"</span>\
							</div>\
						</div>\
					</div>\
				</div>\
			</div>\
		</div></li>";
	});
	$("[data-lista-carousel]").append(html);

	var jcarousel = $('.jcarousel')
		.on('jcarousel:reload jcarousel:create', function () {
			var carousel = $(this),
				width = carousel.innerWidth();

			carousel.jcarousel('items').css('min-width', Math.ceil(width) + 'px');
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

}

 