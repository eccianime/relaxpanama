$(function() {
	$("[data-comercio]").html(cobros[0].nombre);
	$("[data-precio]").html(cobros[0].monto);
})

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

function compraRSP( xhr ) {
	$(".numero-clr").click();
	if( xhr.result == "true" ){
		abrirModal( 2, xhr.mensaje, 4);
	}else{
		abrirModal( 1, xhr.mensaje );	
	}
}

function rechazarPago(){
	var datos = {
		idTransaccion: cobros[0].idTransaccion,
		pin: $("[name=pin]").val(),
		action: 0,
	}
	AJAX( 'remotepayment', datos, compraRSP );
}

function aceptarPago(){
	var datos = {
		idTransaccion: cobros[0].idTransaccion,
		pin: $("[name=pin]").val(),
		action: 1,
	}
	AJAX( 'remotepayment', datos, compraRSP );
}

function compraRSP( xhr ) {
	$(".numero-clr").click();
	if( xhr.status == true ){
		abrirModal( 2, xhr.mensaje, 1);
	}else{
		abrirModal( 1, xhr.mensaje );	
	}
}