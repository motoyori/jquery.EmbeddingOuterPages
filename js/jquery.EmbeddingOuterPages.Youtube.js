//Youtubeを埋め込み用に置換
//2012/02/13:通常のURLの置換にも対応(https/http両方対応)
jQuery(document).ready(function(){ jQuery.EmbeddingOuterPages.SetOuterPagesLinks("youtube", new jQuery.EmbeddingOuterPages.YouTube()); });
(function(jQuery){
	jQuery.EmbeddingOuterPages.YouTube = function(){
		var DefWidth = 485;
		var DefHeight = 385;
		var YTubeNormalSSLUrl = "https://www.youtube.com/watch";
		var YTubeNormalUrl = "http://www.youtube.com/watch";
		var YTubeShortUrl = "http://youtu.be/";
		var YTubeReplaceUrl = "http://www.youtube.com/embed/";
		this.ChkURL = function(url){
			return (url.indexOf(YTubeShortUrl) !== -1
					 || url.indexOf(YTubeNormalSSLUrl) !== -1
					 || url.indexOf(YTubeReplaceUrl) !== -1
					 || url.indexOf(YTubeNormalUrl) !== -1);
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

			//httpのものはhttpsに置換
			if (url.indexOf(YTubeNormalUrl) !== -1)
				url = url.replace(YTubeNormalUrl, YTubeNormalSSLUrl);


			if (url.indexOf(YTubeNormalSSLUrl) !== -1){
				//通常URLを埋め込みURLに置換
				var parm = url.split(/[?&]+/);
				for(var key in parm){
					if(parm[key].indexOf(YTubeNormalSSLUrl) !== -1)
						continue;

					var parms = parm[key].split('=');
					if(parms.length == 2 && parms[0]=="v"){
						url = YTubeReplaceUrl + parms[1];
						break;
					}
				}
			}else if (url.indexOf(YTubeShortUrl) !== -1){
				//先頭一致で短縮アドレスの場合は正しい埋め込みのものに置換
				url = url.replace(YTubeShortUrl, YTubeReplaceUrl);
			}

			jTag.attr("src", url).attr("frameborder","0").val("allowfullscreen");

			return jTag;
			//<iframe width="w" height="h" src="YTubeReplaceUrl" frameborder="0" allowfullscreen></iframe>
		}
	};
})(jQuery);