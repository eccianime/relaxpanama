AJAX( 'home', {id: usuario.id}, homeRSP );

var cards,
	activeCard;
var mostrarComprar = 1;

function homeRSP( xhr ) {
	$("[name=nombreUsuario]").html( xhr.user.name );
	var html = "";
	cards = xhr.cards;
	$.each( cards, function( i ) {
		var htmlCoA = cards[i].pin == "cambiar" ? "cambiar" : "asignar";

		html +="<li><div class='carta' data-carta="+cards[i].id+">\
			<img class='img-responsive' src='../img/disponible.png'>\
			<div class='disponibles'>"+cards[i].balance.toFixed(2)+"</div>\
			<div class='cartera'>\
				<div class='punteado row'>\
					<div class='xs-6'>\
						<a href='#' onclick='"+htmlCoA+"_pin("+cards[i].id+","+cards[i].serial+")' class='ui-link'><img class='img-responsive' src='../img/"+htmlCoA+"_pin.png'></a>\
						<a href='#' onclick='recargar("+cards[i].id+","+cards[i].serial+")' class='ui-link'><img class='img-responsive' src='../img/recargar.png'></a>\
						<a href='#' onclick='mis_paquetes("+cards[i].serial+")' class='ui-link'><img class='img-responsive' src='../img/mis_paquetes.png'></a>\
					</div>\
					<div class='xs-6'>\
						<div class='abajo-izq'>\
							<a class='ui-btn boton-dentro-cart' onclick='movimientos("+cards[i].id+")' href='#'>VER<br>MOVIMIENTOS</a>\
							<div class='id-usuario'>\
								<span class='id-cart'>ID: </span><span class='num-cart'>"+cards[i].serial+"</span>\
							</div>\
						</div>\
					</div>\
				</div>\
			</div>\
		</div></li>";
	});
	$("[data-lista-carousel]")
		.append(html)
		.ready( function() {
			var jcarousel = $('.jcarousel')
				.on('jcarousel:reload jcarousel:create', function () {
					var carousel = $(this),
						width = carousel.innerWidth();

					carousel.jcarousel('items').css('min-width', $(document).width() + 'px');
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
		} );
} 

function perfil() {
	$.mobile.changePage( "perfil/perfil.html" );
}

function cambiar_pin( id, serial ) {
	activeCard = { id: id, serial: serial };
	$.mobile.changePage( "perfil/cambiar-pin.html" );
}

function asignar_pin( id, serial ) {
	activeCard = { id: id, serial: serial };
	$.mobile.changePage( "perfil/asignar-pin.html" );
}

function movimientos( id ) {
	activeCard = id;
	$.mobile.changePage( "perfil/movimientos.html" );
}

function recargar( id, serial ) {
	activeCard = { id: id, serial: serial };
	$.mobile.changePage( "perfil/recargar.html" );
}

function mis_paquetes( serial ) {
	activeCard = { serial: serial };
	$.mobile.changePage( "perfil/mis-paquetes.html" );
}