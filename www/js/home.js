function login() {
	var data = {
		email: $("[name=email]").val(),
		password: $("[name=password]").val()
	}

	if( data.email != "" && data.password != "" ){
		AJAX( 'signin', data, loginRSP );
	}else{
		abrirModal( 1, "No debe dejar campos vacíos" );
		//kamal@relaxpanama.com
	}
}

function resetPass() {
	var data = {
		email: $("#olvidePass [name=email]").val(),
	}

	if( data.email != "" ){
		AJAX( 'forgot-password', data, resetPassRSP );
	}else{
		abrirModal( 1, "No debe dejar campos vacíos" );
		//oscarovido@gmail.com
	}
}

function resetPassRSP( xhr ) {
	if( xhr.result == "true" ){
		abrirModal( 2, "La contraseña fue enviada a su correo." );
	}else{
		abrirModal( 1, "El usuario no existe. Intente nuevamente." );
	}
}

function loginRSP( xhr ) {
	usuario = xhr.data;
	$.mobile.changePage( 'tpl/dashboard.html' );
}