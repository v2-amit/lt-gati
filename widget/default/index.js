(function() {
	var loadjsfile = function (filename, callback) {
		var fileref = document.createElement('script');
		fileref.src = filename;
                if (typeof callback != "undefined")
                    fileref.onload = callback;
		document.getElementsByTagName("head")[0].appendChild(fileref);
	}
	loadjsfile("//cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.11/iframeResizer.min.js", function(){
		iFrameResize({}, '#lendingtreeIframe');
	});
})();