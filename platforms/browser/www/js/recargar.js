/*
kamal@relaxpanama.com
*/

$("[data-serial]").attr( "data-serial", activeCard.serial );

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
	.val("0.00")
	.mask('00000.00')
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

