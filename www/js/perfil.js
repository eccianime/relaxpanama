/*
kamal@relaxpanama.com
*/

AJAX( 'perfil', {id: usuario.id} , perfilRSP );

function perfilRSP( xhr ) {
	var img = "";
	if( xhr.status == true ){
		img = xhr.imagen;
	}else{
		img = "../../img/default_usr.png";	
	}

	$(".mega-icon").append( '<img src="'+img+'" class="img-responsive">' );
}

function cambiarFotoPerfil() {
	if( $("[name=imagen_perfil]").val() == "" ){
		abrirModal(1, "No ha seleccionado una imagen para su perfil");
	}else{
		mostrarCargando();
		var fd = new FormData();
		var archivo = $("[name=imagen_perfil]")[0].files[0]; 	
		fd.append('archivo', archivo);
		fd.append('id', usuario.id );
	
		$.ajax({
			type: 'post',
			url: URL_BASE+"updatePerfil",
			contentType: false,
			enctype: 'multipart/form-data',
			processData: false,
			cache: false,
			data: fd,
			complete: function ( xhr, status ) {
				console.log( status );
				var resp = $.parseJSON( xhr.responseText );
			
				quitarCargando();
				if( resp.status == true ){
					abrirModal(2, "Su foto de perfil se ha subido exitósamente.", 1);
				}else{
					abrirModal(1, "Ocurrió un problema, informe al administrador");
				}
			},
		});
	}
}

$("[name=mantener-cambiar]").click( function() {
	if( $(this).attr('value') == "cambiar" ){
		$("[name=imagen_perfil]").click();
	}else{
		$("[name=imagen_perfil]").val("");
	}
})