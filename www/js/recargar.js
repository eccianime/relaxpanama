/*
kamal@relaxpanama.com
*/

$("[data-serial]").html( activeCard.serial );

var altos = {
	a: parseInt( $(".ui-page-active").css('height') ),
	b: parseInt( $(".ui-page-active .ui-header").css('height') ),
	c: parseInt( $(".ui-page-active .tit-fond-azul").css('height') ),
};
$(".ui-page-active .base-movimientos").css({minHeight:( (altos.a)-(altos.b)-(altos.c) )});

function recargar() {
	abrirModal( 2, "En teoría aquí debería mandarme a recargar" );
}