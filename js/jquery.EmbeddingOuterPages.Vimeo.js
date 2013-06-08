//Vimeoを埋め込み用に置換
jQuery(document).ready(function(){ jQuery.EmbeddingOuterPages.SetOuterPagesLinks("vimeo", new jQuery.EmbeddingOuterPages.Vimeo()); });
(function(jQuery){
	jQuery.EmbeddingOuterPages.Vimeo = function(){
		var DefWidth = 485;
		var DefHeight = 385;
		var VimeoShortUrl = "http://vimeo.com/";
		var VimeoReplaceUrl = "http://player.vimeo.com/video/";
		this.ChkURL = function(url){
			return (url.indexOf(VimeoShortUrl) !== -1);
		}
		this.ReplaceTag = function(emb, url){
			//tagのJqueryオブジェクト化
			var jTag = jQuery("<iframe />");

			//emb.width()でないので注意(リンクタグの中にある要素を取得)
			var w = emb.attr("width");
			if (w == undefined || w == "")
				w = ""+DefWidth;

			jTag.width(parseInt(w));

			//emb.height()でないので注意(リンクタグの中にある要素を取得)
			var h = emb.attr("height");
			if (h == undefined || h == "")
				h = ""+Math.round((parseInt(w)/DefWidth)*DefHeight);

			jTag.height(parseInt(h));

			//先頭一致で短縮アドレスの場合は正しい埋め込みのものに置換
			if (url.indexOf(VimeoShortUrl) !== -1)
				url = url.replace(VimeoShortUrl, VimeoReplaceUrl);

			url += "?title=0&amp;byline=0&amp;portrait=0";

			jTag.attr("src", url).attr("frameborder","0")
				.val("webkitAllowFullScreen").val("mozallowfullscreen").val("allowFullScreen");

			return jTag;
			//<iframe width="w" height="h" src="VimeoReplaceUrl?title=0&amp;byline=0&amp;portrait=0"
			// frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
		}
	};
})(jQuery);