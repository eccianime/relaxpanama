/*
kamal@relaxpanama.com
*/

$("[data-serial]").attr( "data-serial", activeCard.serial ).html(activeCard.serial);

function recargar() {
	var data = {
		serial: $("[data-serial]").attr( 'data-serial' ),
		monto: $("[name=monto]").val() ,
		number_tdc: $("[name=tarjeta]").val(),
		mount: $("[name=mes-vence]").val(),
		year: $("[name=ano-vence]").val(),
		nombre: $("[name=nombre]").val(),
		cvv: $("[name=cvv]").val(),
	}

	var vacios = 0;
	$.each( data, function( i ) {
		if( data[i] == "" ){
			vacios++;
		}
	})
	if( !vacios ){
		AJAX( 'autorecarga', data , autorecargaRSP );	
	}else{
		abrirModal( 1, "No puede dejar campos en blanco.");
	}
	
}

$("[type=tel]").keyup(function(e) {
	$(this).val( $(this).val().replace( /[^0-9]/g, "" ) );
})

$("[name=monto]")
	.val("")
	.focus(function() {
		$(this).val("");
	});

function autorecargaRSP( xhr ) {
	if( xhr.status == true ){
		abrirModal( 2, xhr.mensaje, 1 );
	}else{
		abrirModal( 1, xhr.mensaje );
	}
}


$("[name=monto]").val("0.00");

$(".numero").click(function() {
	var largo 	= $(this).html().length,
		n 		= largo == 1 ? $(this).html() : ( largo == 3 ? "CLR" : "BS" ),
		pinval 	= $("[name=monto]").val();
	if( n == "BS" ){
		if( !$(this).hasClass('numero-disabled') ){
			var x = (parseFloat(pinval)/10).toFixed(3).toString(),
				y = x.substring(0, x.indexOf(".")+3 );

			$("[name=monto]").val( y );
			if( $("[name=monto]").val() == "0.00" ){
				$(this).addClass("numero-disabled"); 
				$('.numero-clr').addClass("numero-disabled"); 
			}
		};
	}else if( n == "CLR" ){
		$(this).addClass("numero-disabled"); 
		$('.numero-back').addClass("numero-disabled"); 
		$("[name=monto]").val( "0.00" );
	}else{
		$("[name=monto]").val( (parseFloat(pinval+n)*10).toFixed(2) );
		$('.numero-disabled').removeClass("numero-disabled"); 
		if( $("[name=monto]").val() == "0.00" ){
			$('.numero-back').addClass("numero-disabled"); 
			$('.numero-clr').addClass("numero-disabled"); 
		}
	}
})