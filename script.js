var BOY_NAMELIST_NORMAL = "信健建博広輝元機基本樹智知偉新才財富理論真尊誠明朗成睦和貴作創昇登思考豊領聰学研巧匠愉悦怡至証正天秀優祥希志幸中宇華嘉家達慧耀哲悠慶進慎啓賢勝賀唯実錦昴昌悟駿総";
var BOY_NAMELIST_MIZU = "澤洋海济泰永源深準漢滙溫潇澳濟瀚瀛港鴻康浩澔淵渡治清";
var BOY_NAMELIST = BOY_NAMELIST_NORMAL + BOY_NAMELIST_MIZU;

var GIRL_FIRST_NAMELIST = '詩遥麗雅絆静真睦智知思仁祐瞳慈礼律光千百寿天秀澪初清朝雫玉若環';
var GIRL_SECOND_NAMELIST = '珊実央代乃';
var GIRL_SECOND_USUAL = '美子';
var GIRL_BOTH_NAMELIST = '愛莉心日英美子海鈴玲時理科香音琴言瑞和芽夕久星舞尋柚夢怜晴泉翼翠古茜優希望志幸珠柔絵詠季華慧唯帆凛凪安杏奈月風澄空春夏秋冬雪雨夜明響織暁彩未来萌見貴世良早佳紀弓由羽裕結果恵友琳';

var selected_gender = 'girl';


function getRandomInt(max) {
   return Math.floor(Math.random() * Math.floor(max));
}
function generate(name) {
     var name = '';
     if (selected_gender == 'boy') {
          if ($('#check_water').is(":checked")) {
               var nn_length = BOY_NAMELIST_NORMAL.length;
               var nw_length = BOY_NAMELIST_MIZU.length;
               var ran1 = getRandomInt(nn_length);
               var ran2 = getRandomInt(nw_length);
               var ran3 = getRandomInt(nw_length);
               while (ran2 == ran3) {
                    ran2 = getRandomInt(nw_length);
                    ran3 = getRandomInt(nw_length);
               }
               var txt_normal = BOY_NAMELIST_NORMAL.substring(ran1, ran1+1);
               var txt_water1 = BOY_NAMELIST_MIZU.substring(ran2, ran2+1);
               var txt_water2 = BOY_NAMELIST_MIZU.substring(ran3, ran3+1);

               var type = getRandomInt(5);
               switch (type) {
                    case 0: name = txt_normal + txt_water1; break;
                    case 1: name = txt_normal + txt_water2; break;
                    case 2: name = txt_water1 + txt_normal; break;
                    case 3: name = txt_water2 + txt_normal; break;
                    default: name = txt_water1 + txt_water2; break;
               }

          } else {

               var nl_length = BOY_NAMELIST.length;
               var ran1 = getRandomInt(nl_length);
               var ran2 = getRandomInt(nl_length);
               
               while (ran1 == ran2) {
                    ran1 = getRandomInt(nl_length);
                    ran2 = getRandomInt(nl_length);
               }
               name = BOY_NAMELIST.substring(ran1, ran1+1) + BOY_NAMELIST.substring(ran2, ran2+1);
          }
     } else {
          var first_char_list = GIRL_FIRST_NAMELIST + GIRL_BOTH_NAMELIST;
          var second_char_list = GIRL_SECOND_NAMELIST + GIRL_BOTH_NAMELIST + GIRL_SECOND_USUAL;
          var first_char = '';
          var second_char = '';
          do {
               var ran1 = getRandomInt(first_char_list.length);
               var ran2 = getRandomInt(second_char_list.length);
               first_char = first_char_list.substring(ran1, ran1+1);
               second_char = second_char_list.substring(ran2, ran2+1);
          } while (first_char == second_char);
          name = first_char + second_char;
     }

     $( "#name-list" ).after( '<div class="name-result">'+ name + 
     getBtnHtml(name) +
     '<button class="btn btn-danger btn-sm search-button" onclick="addToFavorite(\''+name+'\')">★</button>' +
     "</div>" );
}


function copyText(text) {
     let textarea = $('<textarea></textarea>');
     textarea.text(text);
     $("#copy-div").append(textarea);
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
     '<a class="btn btn-secondary btn-sm search-button" target="_blank" href="https://seimeiuranai.jp/seimei.php?sei=陳&mei='+ name +'">運勢(陳)</a>' +
     '<a class="btn btn-secondary btn-sm search-button" href="#" onclick="copyText(' + "'" + name +"'"+ ')">コピー</a>';
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

function init_index() {
     $("#water-text").hide();
     $('input[name="gender"]').change(function () {
          var val = $(this).val();
          // Show and hide "名前に"水"含める" checkbox
          if (val == 'boy') {
               $("#water-text").show();
          } else {
               $("#water-text").hide();
          }
          selected_gender = val;
      });  
}