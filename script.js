var NAMELIST_NORMAL = "信健建博広輝元機基本樹智知偉新才財富理論真尊誠明朗成睦和貴作創昇登思考豊領聰学研巧匠愉悦怡至証正天秀優祥希志幸中宇華嘉家達慧耀哲悠慶進慎啓賢勝賀唯実錦昴昌悟駿総";
var NAMELIST_MIZU = "澤洋海济泰永源深準漢滙溫潇澳濟瀚瀛港鴻康浩澔淵渡治清";
var NAMELIST = NAMELIST_NORMAL + NAMELIST_MIZU;

function getRandomInt(max) {
   return Math.floor(Math.random() * Math.floor(max));
}
function generate(name) {
     var name = '';
     if ($('#check_water').is(":checked")) {
          var nn_length = NAMELIST_NORMAL.length;
          var nw_length = NAMELIST_MIZU.length;
          var ran1 = getRandomInt(nn_length);
          var ran2 = getRandomInt(nw_length);
          var ran3 = getRandomInt(nw_length);
          while (ran2 == ran3) {
               ran2 = getRandomInt(nw_length);
               ran3 = getRandomInt(nw_length);
          }
          var txt_normal = NAMELIST_NORMAL.substring(ran1, ran1+1);
          var txt_water1 = NAMELIST_MIZU.substring(ran2, ran2+1);
          var txt_water2 = NAMELIST_MIZU.substring(ran3, ran3+1);

          var type = getRandomInt(5);
          switch (type) {
               case 0: name = txt_normal + txt_water1; break;
               case 1: name = txt_normal + txt_water2; break;
               case 2: name = txt_water1 + txt_normal; break;
               case 3: name = txt_water2 + txt_normal; break;
               default: name = txt_water1 + txt_water2; break;
          }

     } else {

          var nl_length = NAMELIST.length;
          var ran1 = getRandomInt(nl_length);
          var ran2 = getRandomInt(nl_length);
          while (ran1 == ran2) {
               ran1 = getRandomInt(nl_length);
               ran2 = getRandomInt(nl_length);
          }
          var name = NAMELIST.substring(ran1, ran1+1) + NAMELIST.substring(ran2, ran2+1);
     }

     $( "#name-list" ).after( '<div class="name-result">'+ name + 
     // '<a class="btn btn-secondary btn-sm search-button" href="#" onclick="copyText(' + "'" + name +"'"+ ')">コピー</a>' +
     getBtnHtml(name) +
     '<button class="btn btn-danger btn-sm search-button" onclick="addToFavorite(\''+name+'\')">★</button>' +
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

var fav_list = localStorage.getItem('fav_list');
if (fav_list) {
     fav_list = JSON.parse(fav_list);
} else {
     fav_list = [];
}

function addToFavorite(name) {
     if (!fav_list.includes(name)) {
          fav_list.unshift(name);
          localStorage.setItem('fav_list', JSON.stringify(fav_list));
     }
}

function removeFromFavorite(name) {
     fav_list = fav_list.filter(function(x){return x != name;});
     localStorage.setItem('fav_list', JSON.stringify(fav_list));
     location.reload();
}

function getBtnHtml(name) {
     return '<a class="btn btn-secondary btn-sm search-button" target="_blank" href="https://www.google.com/search?query='+ name +' 名前">Google</a>' +
     '<a class="btn btn-secondary btn-sm search-button" target="_blank" href="https://name.sijisuru.com/Pname/pdetail?pname='+ name +'">読み方</a>' +
     '<a class="btn btn-secondary btn-sm search-button" target="_blank" href="https://seimeiuranai.jp/seimei.php?sei=宮坂&mei='+ name +'">運勢(宮坂)</a>' +
     '<a class="btn btn-secondary btn-sm search-button" target="_blank" href="https://seimeiuranai.jp/seimei.php?sei=陳&mei='+ name +'">運勢(陳)</a>';
}

function renderFavList() {
     $( "#fav-list" ).empty();
     for (let i = 0; i < fav_list.length; ++i) {
          var name = fav_list[i];
          $( "#fav-list" ).after( '<div class="name-result">'+ name + 
          getBtnHtml(name) +
          '<button class="btn btn-danger btn-sm search-button" onclick="removeFromFavorite(\''+name+'\')">削除</button>' +
          "</div>" );
     }
}

function init_tools() {
     $('#input-name').change(function() {
          var name = $(this).val();
          if (name == '') {
               $('#tool-field').html(
                    "<p>名前入力してください</p>"
               );
          } else {
               $('#tool-field').html(
                    "<p><b>名前：</b>"+name+"</p>" + 
                    getBtnHtml(name) +
                    '<button class="btn btn-danger btn-sm search-button" onclick="addToFavorite(\''+name+'\')">★</button>'
               );
          }

     });
}