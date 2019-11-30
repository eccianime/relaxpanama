if( cards.length == 1 ){
	var html = "<input type='text' name='cartera' class='cartera-field' readonly='true' data-val="+cards[0].id+" value="+cards[0].serial+">";
	$("[cant-monedas]").html(cards[0].balance.toFixed(2));

	$('[data-monedas]').after(html);
}else{
	var html = "<select name='cartera-multi' data-icon='false'>";
	$.each( cards, function( i ) {
		html += "<option data-balance="+cards[i].balance+" value="+cards[i].id+">"+cards[i].serial+"</option>";
	})
	html += "</select>";
	$('[data-monedas]').after(html).ready(function() {
		$("[cant-monedas]").html(cards[0].balance.toFixed(2));
		$("select[name=cartera-multi]").unbind('change').bind( 'change', function() {
			$("[cant-monedas]").html( parseFloat( $("option:selected").attr( 'data-balance' ) ).toFixed(2) );
		})
	});
}

$(".numero").click(function() {
	var largo 	= $(this).html().length,
		n 		= largo == 1 ? $(this).html() : ( largo == 3 ? "CLR" : "BS" ),
		pinval 	= $("[name=pin]").val();
	if( n == "BS" ){
		if( !$(this).hasClass('numero-disabled') ){
			if( pinval.length == 1 ){ 
				$(this).addClass("numero-disabled"); 
				$('.numero-clr').addClass("numero-disabled"); 
			}
			$("[name=pin]").val( pinval.substring(0, pinval.length-1) );
		};
	}else if( n == "CLR" ){
		$(this).addClass("numero-disabled"); 
		$('.numero-back').addClass("numero-disabled"); 
		$("[name=pin]").val( "" );
	}else{
		$("[name=pin]").val( pinval+n.toString() );
		$('.numero-disabled').removeClass("numero-disabled"); 
	}
	$("[name=pin]").trigger('change');
})

$("[name=pin]").change( function(e) {
	var v = $(this).val();
	if( v.length == 4 ){
		if( promo_det.price > parseFloat($("[cant-monedas]").html()) ){
			abrirModal( 1, "Saldo insuficiente. Por favor, elija otra cartera, otro paquete o recargue su saldo." );
			$(".numero-clr").click();
		}else{
			var envio = {
				card: cards.length == 1 ? $("[name=cartera]").attr('data-val') : $("select[name=cartera-multi]").find("option:selected").attr('value'),
				paquete: promo_det.id
			}
			AJAX( 'catalogo/comprando', envio, compraRSP );
		}
	}
} )

function compraRSP( xhr ) {
	$(".numero-clr").click();
	if( xhr.result == "true" ){
		abrirModal( 2, xhr.mensaje );
		$.mobile.changePage( '../dashboard.html' );
	}else{
		abrirModal( 1, xhr.mensaje );	
	}
}