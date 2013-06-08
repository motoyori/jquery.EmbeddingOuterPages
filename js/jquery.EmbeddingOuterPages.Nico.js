//ニコニコ動画を埋め込み用に置換
jQuery(document).ready(function(){ jQuery.EmbeddingOuterPages.SetOuterPagesLinks("nico", new jQuery.EmbeddingOuterPages.Nico()); });
(function(jQuery){
	jQuery.EmbeddingOuterPages.Nico = function(){
		var NicoIfClass = "ifnico";
		var DefWidth = 485;
		var DefHeight = 385;
		var BlankWidth = 20;
		var BlankHeight = 20;
		var NicoShortUrl = "http://nico.ms/";
		var NicoNormalUrl = "http://www.nicovideo.jp/watch/";
		var NicoReplaceUrl = "http://ext.nicovideo.jp/thumb_watch/";
		var NicoIfreameUrl = "./pubapi/user/php/ifnico.php";
		this.ChkURL = function(url){
			return (url.indexOf(NicoShortUrl) !== -1 || url.indexOf(NicoNormalUrl) !== -1);
		}
		this.ReplaceTag = function(emb, url){
			//tagのJqueryオブジェクト化
			var jTag = jQuery("<iframe />").addClass(NicoIfClass);

			//emb.width()でないので注意(リンクタグの中にある要素を取得)
			var w = emb.attr("width");
			if (w == undefined || w == "")
				w = ""+DefWidth;

			jTag.width((parseInt(w)+BlankWidth));
			url+= "&w="+w;

			//emb.height()でないので注意(リンクタグの中にある要素を取得)
			var h = emb.attr("height");
			if (h == undefined || h == "")
				h = ""+Math.round((parseInt(w)/DefWidth)*DefHeight);

			jTag.height((parseInt(h)+BlankHeight));
			url+= "&h="+h;

			//先頭一致で短縮アドレスの場合は正しい埋め込みのものに置換
			if (url.indexOf(NicoShortUrl) !== -1)
				url = url.replace(NicoShortUrl, NicoNormalUrl);

			url+= "&nli=1";
			url = url.replace(NicoNormalUrl, NicoReplaceUrl);

			jTag.attr("src", NicoIfreameUrl+"?url="+encodeURI(url));

			return jTag;
			//<iframe class="ifnico" width="w" height="h" src="NicoIfreameUrl?url=xxxx"></iframe>
		}
	};
})(jQuery);