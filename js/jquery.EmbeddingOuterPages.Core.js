//埋め込み置換js(EmbeddingOuterPages)
//2013/02/13:ThreadReplaceHTMLの引数をJQueryっぽいものに変更
(function(jQuery){
	//メイン処理層
	jQuery.EmbeddingOuterPages = function(){
		var Func_ListLinks = new Object();
		var Func_ListOther = new Object();
		var TypeName = "sitetype";	//置換を認識するための要素名
		var EndFlag = "isChanged";	//置換作業が終わったタグに埋め込む要素名

		this.ReplaceHTML = function(expr){
			var afterFuncs = new Array();
			if(expr == undefined)
				expr = "*";

			ReplaceLinks(this, afterFuncs, jQuery(expr));
			ReplaceOther(this, afterFuncs, jQuery(expr));
			//後処理
			for(key in afterFuncs){ afterFuncs[key](); }
		}
		function replaceLinks(thisEOP, afterFuncs, ele, emb){
			if (emb.is(":visible") == false || emb.attr(EndFlag) == "true")
				return;

			var url = emb.attr("href");
			if (url == undefined || url == "")
				return;

			var tp = emb.attr(TypeName);
			//tpよりアドレスを優先
			tp = ChkURL(tp, url, Func_ListLinks);
			var tag = ReplaceTag(tp, emb, Func_ListLinks, url);

			if (tag == "")
				return;

			emb.attr(EndFlag, "true");
			SetAfter(tp, emb, Func_ListLinks, tag);
			HideBase(tp, emb, Func_ListLinks);

			if (typeof(Func_ListLinks[tp].SetTagFunc) == 'function')
				Func_ListLinks[tp].SetTagFunc();

			if (typeof(Func_ListLinks[tp].AfterFunc) == 'function')
				afterFuncs["links_"+key] = Func_ListLinks[tp].AfterFunc;
		}
		function ReplaceLinks(thisEOP, afterFuncs, ele){
			if(ObjectCount(Func_ListLinks) <= 0)
				return;

			//自身のタグも確認できるようにする
			ele.each(function(){
				if(jQuery(this).get(0).tagName.toUpperCase() == SearchTagPagesLinks.toUpperCase()
					 && jQuery(this).attr(TypeName) != undefined){
					replaceLinks(thisEOP, afterFuncs, ele, jQuery(this));
				}
			});
			ele.children(SearchTagPagesLinks+"["+TypeName+"]").each(function(){
				replaceLinks(thisEOP, afterFuncs, ele, jQuery(this));
			});
		}
		function replaceOther(thisEOP, afterFuncs, ele, emb){
			if (emb.attr(EndFlag) == "true")
				return;

			var tp = emb.attr(TypeName);
			var tag = ReplaceTag(tp, emb, Func_ListOther);

			if (tag == "")
				return;

			emb.attr(EndFlag, "true");
			SetAfter(tp, emb, Func_ListOther, tag);
			HideBase(tp, emb, Func_ListOther);

			if (typeof(Func_ListOther[tp].SetTagFunc) == 'function')
				Func_ListOther[tp].SetTagFunc();

			if (typeof(Func_ListOther[tp].AfterFunc) == 'function')
				afterFuncs["other_"+key] = Func_ListOther[tp].AfterFunc;
		}
		function ReplaceOther(thisEOP, afterFuncs, ele){
			if(ObjectCount(Func_ListOther) <= 0)
				return;

			//自身のタグも確認できるようにする
			ele.each(function(){
				if(jQuery(this).hasClass(SearchClassPagesOther) && jQuery(this).attr(TypeName) != undefined){
					replaceLinks(thisEOP, afterFuncs, ele, ele);
				}
			});
			ele.children("."+SearchClassPagesOther+"["+TypeName+"]").each(function(){
				replaceOther(thisEOP, afterFuncs, ele, jQuery(this));
			});
		}
		function ChkURL(tp, url, list){
			for(key in list){
				if (typeof(list[key].ChkURL) == 'function'){
					if(list[key].ChkURL(url))
						return key;
				}
			}
			return tp;
		}
		function ReplaceTag(tp, emb, list, url){
			if(list[tp] != undefined && typeof(list[tp].ReplaceTag) == 'function')
				return list[tp].ReplaceTag(emb, url);

			return "";
		}
		function SetAfter(tp, emb, list, tag){
			if (list[tp].IsAfterTag == undefined || list[tp].IsAfterTag == true)
				emb.after(tag);
		}
		function HideBase(tp, emb, list){
			if (list[tp].IsHideTag == undefined || list[tp].IsHideTag == true)
				emb.hide();
		}

		//拡張用のデータセット
		var SearchTagPagesLinks = "a";
		this.SetOuterPagesLinks = function(typeName, fncs){
			if(Func_ListLinks[typeName] == undefined)
				Func_ListLinks[typeName] = fncs;
		}
		var SearchClassPagesOther = "OuterPages";
		this.SetOuterPagesOther = function(typeName, fncs){
			if(Func_ListOther[typeName] == undefined)
				Func_ListOther[typeName] = fncs;
		}

		//ハッシュなどのために作成した配列用のObjectの件数を数える
		function ObjectCount(obj) {
			var cnt = 0;
			for (var key in obj){ cnt++; }
			return cnt;
		}
	}

	//動作を管理する
	var EmbeddingOP;

	//ページ置換を実行する
	jQuery.EmbeddingOuterPages.ThreadReplaceHTML = function(options){
		if(EmbeddingOP == undefined)
			return;

		var options = jQuery.extend({
			async : true
		}, options);

		//スレッド呼び出しの場合は自身をもう一度呼び出す。
		if(options.async)
			setTimeout("jQuery.EmbeddingOuterPages.ThreadReplaceHTML({async:false})", 100);
		else
			EmbeddingOP.ReplaceHTML();
	}

	//拡張用のデータセット
	jQuery.EmbeddingOuterPages.SetOuterPagesLinks = function(typeName, fncs){
		if(EmbeddingOP == undefined)
			EmbeddingOP = new jQuery.EmbeddingOuterPages();

		EmbeddingOP.SetOuterPagesLinks(typeName, fncs);
	}
	jQuery.EmbeddingOuterPages.SetOuterPagesOther = function(typeName, fncs){
		if(EmbeddingOP == undefined)
			EmbeddingOP = new jQuery.EmbeddingOuterPages();

		EmbeddingOP.SetOuterPagesOther(typeName, fncs);
	}

	//要素を指定する。
	jQuery.fn.EOPReplaceHTML = function(){
		if(EmbeddingOP != undefined)
			EmbeddingOP.ReplaceHTML(this.selector);

		return this;
	}
})(jQuery);

/*
EmbeddingOuterPages.SetOuterPagesのfuncの中身
	typeName : "sitetype=XX"で設定するXX
	※使用しない関数に関してはテンプレートをコピーしたあとメソッドごと削除してください。
	IsHideTag : 置換する目印タグを非表示にするか（undefined:true）
	IsAfterTag : 置換する目印タグの下に表示するか(しない場合はReplaceTag()の中で置換を完了する)（undefined:true）
	function ChkURL(url) : 引数のURLが置き換えるサイトに該当するものなのかどうかを確認。(return:bool)
		※SetOuterPagesLinks()セットする場合のみ
	function ReplaceTag(emb, url) : 置換するタグを生成する。 (return string)
	function SetTagFunc() : 置換作業が終わった直後にする作業(置換するタグ単位の処理)
	function AfterFunc() : 置換作業が終わったあとにする作業(置換する機能単位の処理)

//appendフォーマット
jQuery(document).ready(function(){ jQuery.EmbeddingOuterPages.SetOuterPagesOther("XXX", new jQuery.EmbeddingOuterPages.XXX()); });
jQuery(document).ready(function(){ jQuery.EmbeddingOuterPages.SetOuterPagesLinks("XXX", new jQuery.EmbeddingOuterPages.XXX()); });
(function(jQuery){
	jQuery.EmbeddingOuterPages.XXX = function(){
		this.IsHideTag = false;	//undefined:true
		this.IsAfterTag = false;	//undefined:true
		this.ChkURL = function(url){
			return (url.indexOf("http://XXXX.XXX") !== -1);
		}
		this.ReplaceTag = function(emb, url){
			var tag = "";
			return tag;
		}
		this.SetTagFunc = function(){
		}
		this.AfterFunc = function(){
		}
	}
})(jQuery);
*/