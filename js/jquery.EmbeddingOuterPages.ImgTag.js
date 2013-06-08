//リンクの自動置換とimgタグのサイズ入れ替えの両方を行う
jQuery(document).ready(function(){ jQuery.EmbeddingOuterPages.SetOuterPagesOther("img", new jQuery.EmbeddingOuterPages.ImgTagOther()); });
jQuery(document).ready(function(){ jQuery.EmbeddingOuterPages.SetOuterPagesLinks("img", new jQuery.EmbeddingOuterPages.ImgTagLink()); });
(function(jQuery){
	//returnで返しているのはダミーのデータ。ここでセットしないからと空白で返すと置換失敗扱いになるため
	jQuery.EmbeddingOuterPages.ImgTagOther = function(){
		this.IsHideTag = false;
		this.IsAfterTag = false;
		this.ReplaceTag = function(emb, url){
			var ar = new Array("height", "width", "src");
			for(var key in ar){
				var str = emb.attr("r"+ar[key]);
				if(str != undefined)
					emb.attr(ar[key], str);
			}
			return "tag";
		}
	};
	jQuery.EmbeddingOuterPages.ImgTagLink = function(){
		this.IsHideTag = false;
		this.IsAfterTag = false;
		this.ReplaceTag = function(emb, url){
			//tagのJqueryオブジェクト化
			var jTag = jQuery("<img />");

			var src = emb.attr("href");
			if (src == undefined || src == "")
				return "tag";

			jTag.attr("src", src);

			var w = emb.attr("width");
			if (w != undefined && w != "")
				jTag.width(w);

			var h = emb.attr("height");
			if (h != undefined && h != "")
				jTag.height(h);

			var ht = emb.html();
			if (ht != undefined && ht != "")
				jTag.attr("alt", ht).attr("title", ht);

			var noL = emb.attr("nolink");
			if (noL != undefined && noL == "true"){
				//リンクの中ではなく置換してリンクしない状態にする。
				this.IsHideTag = true;
				this.IsAfterTag = true;
				return jTag;
			}else{
				emb.html(jTag);
				return "tag";
			}
		}
		this.SetTagFunc = function(){
			//noLink設定時にフラグを元に戻す。
			if(this.IsHideTag == true){
				this.IsHideTag = false;
				this.IsAfterTag = false;
			}
		}
	};
})(jQuery);
