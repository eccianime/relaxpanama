AJAX( 'blogitem/'+blogSlug, null , blogItemRSP, "GET" );

function blogItemRSP( xhr ) {
	var datos 	= xhr.blog,
		html 	= "",
		et 		= "";

	$.each( datos.tags, function( i ) {
		et += i == 0 ? datos.tags[i] : ", "+datos.tags[i];
	})

	html += "\
		<div class='blog-item'>\
			<img class='img-responsive' src="+datos.image+">\
			<div class='contenido'>\
				<h3 class='text-center'>"+datos.title+"</h3>\
				<p><b>Tags</b>: "+et+"</p>\
				<p><i class='fa fa-clock-o'></i> "+restaDeFechas(datos.created_at)+"</p>\
				<p class='text-justify'>"+datos.content+"</p>\
			</div>\
		</div>";
	$("#blog-item.ui-page-active .ui-content").append( html );
}
