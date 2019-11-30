/*
kamal@relaxpanama.com
*/

function cambiar_pin(){
	var pin = {
		a: $("[name=pin]").val(),
		n: $("[name=new_pin]").val(),
		r: $("[name=r_pin]").val(),
	}

	if( pin.a == "" || pin.n == "" || pin.r == "" ){
		abrirModal( 1, "No debe dejar campos vacíos." );
	}else if( pin.n != pin.r ){
		abrirModal( 1, "Los campos PIN NUEVO y CONFIRMAR PIN deben ser iguales. Por favor, corrija e intente de nuevo." );
	}else{
		var data = { 
			id: usuario.id,
			card_id: activeCard.id,
			pin: pin.a,
			new_pin: pin.n 
		}
		AJAX( 'cambiaPin', data , cambiaPinRSP );
	}
}

function cambiaPinRSP( xhr ) {
	if( xhr.status == true ){
		abrirModal(2, xhr.response, 1);
	}else{
		abrirModal(1, xhr.response);
	}
}

$("[type=tel]").keyup(function(e) {
	$(this).val( $(this).val().replace( /[^0-9]/g, "" ) );
})