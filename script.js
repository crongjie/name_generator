var BOY_NAMELIST_NORMAL = "信健建博広輝元機基本樹智知偉新才財富理論真尊誠明朗成睦和貴作創昇登思考豊領聰学研巧匠愉悦怡至証正天秀優祥希志幸中宇華嘉家達慧耀哲悠慶進慎啓賢勝賀唯実錦昴昌悟駿総";
var BOY_NAMELIST_MIZU = "澤洋海济泰永源深準漢滙溫潇澳濟瀚瀛港鴻康浩澔淵渡治清";
var BOY_NAMELIST = BOY_NAMELIST_NORMAL + BOY_NAMELIST_MIZU;

var GIRL_NAMELIST = '愛莉心中日英美子詩海遥鈴玲麗雅絆時理科静香真音琴言睦智知思仁姫瑞碧和祐瞳慈礼芽夕史久星律舞珊光尋柚夢百楽悦怡伊怜寿天秀澪晴泉初翼翠古茜優希望志幸珠柔絵詠季華慧唯実清純帆凛凪安杏奈央月風澄空春夏秋冬雪雨朝夜千明響暁織雫彩未来萌原玉見貴観世代良早佳烈紀弓自由羽裕結果恵若環';
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
          var nl_length = GIRL_NAMELIST.length;
          var ran1 = getRandomInt(nl_length);
          var ran2 = getRandomInt(nl_length);
          while (ran1 == ran2) {
               ran2 = getRandomInt(nl_length);
          }
          name = GIRL_NAMELIST.substring(ran1, ran1+1) + GIRL_NAMELIST.substring(ran2, ran2+1);
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