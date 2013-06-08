#EmbeddingOuterPages(JQuery Plugins)

##概要

このプラグインは、プラグインを使用していない場合は
リンクや画像で示しているものをまとめて変更し見た目を変更することができます。
たとえばJavaScript(又はJQuery)を使用していないページと使用しているページで
同じ内容を表示する場合にYutubeのリンクを表示していると
・使用していないページ：YouTubeのリンクのみ
・使用しているページ：埋め込みの動画を表示する。
という形で切り替えたい時に使用します。
私のブログで表示しているもので例を挙げますと、
・[使用していないページ](http://hs202sa.ddo.jp/myComfBlog/?layout=mobileS&id=kamCLawKh)
・[使用しているページ](http://hs202sa.ddo.jp/myComfBlog/?layout=html5&id=kamCLawKh)
※Chromeブラウザ推奨
この２つは同じデータを表示していますが、後者は
埋め込み動画に切り替わっているのがわかると思います。

現状公開している差し替え機能は
・YouTubeへのリンク→埋め込み動画
・NicoNico動画へのリンク→埋め込み動画
・Vimeoへのリンク→埋め込み動画
・画像タグ→別の画像への差し替え
・画像タグ→サイズを変更

[デモページ](http://hs202sa.ddo.jp/DemoPage/jquery.EmbeddingOuterPages/)
※Youtube/NicoNico動画/Vimeoの差し替えデモ（ボタンのクリックアクションで差し替える）

##ファイル構成
jquery.EmbeddingOuterPages.Core.js
基本となる構成ファイル。このファイルに変更したい機能のjsをさらに追加することで動作します。

jquery.EmbeddingOuterPages.Youtube.js
jquery.EmbeddingOuterPages.Nico.js
jquery.EmbeddingOuterPages.Vimeo.js
jquery.EmbeddingOuterPages.ImgTag.js
各種変換する機能です。
NicoNico動画のみ別途表示するための[ifnico.php]が必要です。
※Getメソッドを取得して対応する値に渡すだけなので、他の言語に差し替えるのは簡単と思われます。
またxx.Nico.jsの中にifnico.phpを保存している変数があるので、必要に応じてそのアドレスを変更してください。

##実装例
※フィールドの値については初期値の値を使用しています。

###タグ側の実装
<a href="http://youtu.be/QH2-TGUlwu4" sitetype="youtube">Youtubeの短縮アドレス(1)</a>
<a href="http://www.nicovideo.jp/watch/sm17520775" sitetype="nico">NicoNico動画のアドレス(2)</a>
<div>
 <a href="http://youtu.be/QH2-TGUlwu4" sitetype="youtube">Youtubeの短縮アドレス(3)</a>
 <a href="http://youtu.be/QH2-TGUlwu4" sitetype="youtube">Youtubeの短縮アドレス(4)</a>
 <a href="http://www.nicovideo.jp/watch/sm17520775" sitetype="nico">NicoNico動画のアドレス(5)</a>
</div>

###JQuery側の実装
1. 要素を指定して実装
	$("a").EOPReplaceHTML();	//(1-5)を差し替え
	$("a[sitetype='youtube']").EOPReplaceHTML();	//(1,3-4)を差し替え
	$("div").EOPReplaceHTML();	//(3-5)を差し替え

2. ページ全体で一括置換
	$.EmbeddingOuterPages.ThreadReplaceHTML({async:true});
	//async:シングルスレッドで動作するかどうか

###2回以上実行を行ったとき
一度差し替えを行ったタグについては差し替え対象から除外されます。
差し替え対象に戻したい場合は、タグについている「」を削除してください。


##ライセンス
細かい所はまだ何も考えていません。

BSDかGPLにしたいと思ってますが、
条文なども書いていませんし、それまでは皆様の良心にお任せします。
でも、一言もらえると喜びます。
[twitter](https://twitter.com/motoyori)
