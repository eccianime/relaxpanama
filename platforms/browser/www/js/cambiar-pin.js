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
			id: activeCard.id,
			serial: activeCard.serial,
			pin: pin.a,
			new_pin: pin.n 
		}

		AJAX( 'cambiarPin', data , cambiarPinRSP );
	}
}

function cambiarPinRSP( xhr ) {
	console.log( xhr );
}