var blogSlug = "";
var pag = 1

AJAX( 'blog?page='+pag, null , blogRSP, "GET" );

function blogRSP( xhr ) {
	var datos 	= xhr.data,
		html 	= "";
	if( datos.length > 0 ){
		pag++;
		$.each( datos , function( i ) {
			var et 	= "";
			$.each( datos[i].tags, function( j ) {
				et += j == 0 ? datos[i].tags[j] : ", "+datos[i].tags[j];
			})

			html += "\
				<div class='blog-item'>\
					<img class='img-responsive' src="+datos[i].image+">\
					<div class='contenido'>\
						<h3 class='text-center'>"+datos[i].title+"</h3>\
						<p><i class='fa fa-clock-o'></i> "+restaDeFechas(datos[i].created_at)+"</p>\
						<p class='text-justify'>"+datos[i].content+"</p>\
						<p><b>Tags</b>: "+et+"</p>\
						<div class='text-right'>\
							<a href='#' data-slug="+datos[i].slug+" class='ui-btn ui-btn-inline boton-verde'>LEER ARTÍCULO</a>\
						</div>\
					</div>\
				</div>";
		})
		$("#blog.ui-page-active .ui-content").append( html );
		$(".blog-item a").click( function() {
			blogSlug = $(this).attr( "data-slug" );
			$(document).unbind('scrollstop');
			$.mobile.changePage( "blog-item.html" );
		})	
	}else{
		html+= "<div class='text-center' style='font-size: .8em;color: gray;'>No hay más registros</div>";
		$("#blog.ui-page-active .ui-content").append( html );
		$(document).unbind('scrollstop');
	}
}

$(document).on( 'pagecontainershow', function( e, ui ) {
	if( ui.toPage[0].id == "blog" ){
		$(document).unbind( 'scrollstop' ).bind( 'scrollstop', _scrollstop );
	}else{
		$(document).unbind( 'scrollstop' );
		$(document).unbind( 'pagecontainershow' );
	}
	
})

function _scrollstop() {
	var scroll = $(document).height() - $(document).scrollTop() - $(window).height();
	if( scroll < 200 ){
		AJAX( 'blog?page='+pag, null , blogRSP, "GET" );
	}
}