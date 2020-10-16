var NAMELIST = "信健建博広輝元源機基本樹智知偉新才財富理論真尊誠明朗成睦和貴作創昇登思考豊領聰学研澤巧匠愉悦怡至証正天秀優祥希志幸中宇華嘉家達泰慧耀康哲悠慶慎啓永賢勝賀唯";

function getRandomInt(max) {
   return Math.floor(Math.random() * Math.floor(max));
}
function generate(name) {
 var nl_length = NAMELIST.length;
 var ran1 = getRandomInt(nl_length);
 var ran2 = getRandomInt(nl_length);
 while (ran1 == ran2) {
      ran1 = getRandomInt(nl_length);
      ran2 = getRandomInt(nl_length);
 }
 var name = NAMELIST.substring(ran1, ran1+1) + NAMELIST.substring(ran2, ran2+1);
 $( "#name-list" ).after( '<div class="name-result">'+ name + 
    // '<a class="btn btn-secondary btn-sm search-button" href="#" onclick="copyText(' + "'" + name +"'"+ ')">コピー</a>' +
    '<a class="btn btn-secondary btn-sm search-button" target="_blank" href="https://www.google.com/search?query='+ name +'">Google 検索</a>' +
    '<a class="btn btn-secondary btn-sm search-button" target="_blank" href="https://name.sijisuru.com/Pname/pdetail?pname='+ name +'">読み方分析</a>' +
    '<a class="btn btn-secondary btn-sm search-button" target="_blank" href="https://seimeiuranai.jp/seimei.php?sei=宮坂&mei='+ name +'">名前判断</a>' +
    "</div>" );
}


function copyText(text) {
     let textarea = $('<textarea></textarea>');
     textarea.text(text);
     $(this).append(textarea);
     textarea.select();
     document.execCommand('copy');
     textarea.remove();
     $('#js-copyalert').show().delay(2000).fadeOut(400);
}

