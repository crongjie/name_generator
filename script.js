var BOY_NAMELIST_NORMAL = "信健建博広輝元機基本樹智知偉新才財富理論真尊誠明朗成睦和貴作創昇登思考豊領聰学研巧匠愉悦怡至証正天秀優祥希志幸中宇華嘉家達慧耀哲悠慶進慎啓賢勝賀唯実錦昴昌悟駿総";
var BOY_NAMELIST_MIZU = "澤洋海济泰永源深準漢滙溫潇澳濟瀚瀛港鴻康浩澔淵渡治清";
var BOY_NAMELIST = BOY_NAMELIST_NORMAL + BOY_NAMELIST_MIZU;

var GIRL_FIRST_NAMELIST = '詩遥麗雅絆静真睦智知思仁祐瞳慈礼律光千百寿天秀澪初清朝雫玉若環';
var GIRL_SECOND_NAMELIST = '珊実央代乃';
var GIRL_SECOND_USUAL = '美子';
var GIRL_BOTH_NAMELIST = '愛莉心日英美子海鈴玲時理科香音琴言瑞和芽夕久星舞尋柚夢怜晴泉翼翠古茜優希望志幸珠柔絵詠季華慧唯帆凛凪安杏奈月風澄空春夏秋冬雪雨夜明響織暁彩未来萌見貴世良早佳紀弓由羽裕結果恵友琳素';

var selected_gender = 'girl';

function getBoolStorageItem(key, defValue) {
     var result = localStorage.getItem(key);
     if (result == null) {
        return defValue;
     } else {
        return result == 'true';
     }
}

function getStorageItem(key, defValue) {
     var result = localStorage.getItem(key);
     if (result == null) {
        return defValue;
     } else {
        return result;
     }
}

var show_google = getBoolStorageItem('show_google', true);
var show_read = getBoolStorageItem('show_read', true);
var show_luck = getBoolStorageItem('show_luck', true);
var show_ref = getBoolStorageItem('show_ref', true);
var show_copy = getBoolStorageItem('show_copy', true);


function getRandomInt(max) {
   return Math.floor(Math.random() * Math.floor(max));
}
function generate() {
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
     var gender_index = (selected_gender == 'boy') ? 1 : 2;
     var first_char = name.substring(0,1);
     var second_char = name.substring(1,2);
     return ((show_google) ? '<a class="btn btn-secondary btn-sm search-button" target="_blank" href="https://www.google.com/search?query='+ name +' 名前">Google</a>' : '') +
     ((show_read) ? '<a class="btn btn-secondary btn-sm search-button" target="_blank" href="https://name.sijisuru.com/Pname/pdetail?pname='+ name +'">読み方</a>' : '') +
     ((show_luck) ? '<a class="btn btn-secondary btn-sm search-button" target="_blank" href="https://seimeiuranai.jp/seimei.php?sei=宮坂&mei='+ name +'">運勢(宮坂)</a>' : '') +
     ((show_luck) ? '<a class="btn btn-secondary btn-sm search-button" target="_blank" href="https://seimeiuranai.jp/seimei.php?sei=陳&mei='+ name +'">運勢(陳)</a>' : '') +
     ((show_ref) ? '<a class="btn btn-secondary btn-sm search-button" target="_blank" href="https://namehintbox.com/kanji.php?k='+ first_char +'&s='+gender_index+'#tabPos">『'+ first_char +'』を使った名前</a>' : '') +
     ((show_ref) ? '<a class="btn btn-secondary btn-sm search-button" target="_blank" href="https://namehintbox.com/kanji.php?k='+ second_char +'&s='+gender_index+'#tabPos">『'+ second_char +'』を使った名前</a>' : '') +
     ((show_copy) ? '<a class="btn btn-secondary btn-sm search-button" href="#" onclick="copyText(' + "'" + name +"'"+ ')">コピー</a>' : '');
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

function init_display() {

     $('#show_google').prop('checked', show_google);
     $('#show_read').prop('checked', show_read);
     $('#show_luck').prop('checked', show_luck);
     $('#show_ref').prop('checked', show_ref);
     $('#show_copy').prop('checked', show_copy);

     $('#show_google').change(function() {
          show_google = $('#show_google').is(":checked");
          localStorage.setItem('show_google', show_google);
     });
     $('#show_read').change(function() {
          show_read = $('#show_read').is(":checked");
          localStorage.setItem('show_read', show_read);
     });
     $('#show_luck').change(function() {
          show_luck = $('#show_luck').is(":checked");
          localStorage.setItem('show_luck', show_luck);
     });
     $('#show_ref').change(function() {
          show_ref = $('#show_ref').is(":checked");
          localStorage.setItem('show_ref', show_ref);
     });
     $('#show_copy').change(function() {
          show_copy = $('#show_copy').is(":checked");
          localStorage.setItem('show_copy', show_copy);
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
      init_display();
}

// 画数別---------------------
var CHAR_LIST = [
     '一乙',
     '二乃',
     '弓女子久万夕千',
     '天文王心仁月円巴友日',
     '世由未永礼冬白氷代玉',
     '帆衣羽光百凪汐早江名',
     '那花希佑里沙杏良秀玖初妙利沢芳',
     '奈和空実佳幸明芽知茉朋英京雨夜苗欣',
     '美咲音香海祐柚春星玲紀泉虹風律茜秋珊',
     '真莉夏紗華桜恵珠栞倖祥時',
     '理菜悠梨彩唯萌雪清',
     '結遥貴智葉絵暁晶詠惠',
     '愛聖睦新慈夢詩鈴',
     '綾緒静鳳',
     '穂凜舞慧澄',
     '曉燕',
     '優翼霜薰',
     '織雛',
     '麗蘭霧'
];

function init_by_number() {
     init_display();
     $("#char1number").val(getStorageItem('char1number', '1'));
     $("#char2number").val(getStorageItem('char2number', '1'));

     $('#char1number').change(function() {
          localStorage.setItem('char1number', $("#char1number").val());
     });
     $('#char2number').change(function() {
          localStorage.setItem('char2number', $("#char2number").val());
     });
}

function generate_by_number() {
     var name = '';
     var first_char_list = CHAR_LIST[parseInt($("#char1number").val()) - 1];
     var second_char_list = CHAR_LIST[parseInt($("#char2number").val()) - 1];
     do {
          var ran1 = getRandomInt(first_char_list.length);
          var ran2 = getRandomInt(second_char_list.length);
          first_char = first_char_list.substring(ran1, ran1+1);
          second_char = second_char_list.substring(ran2, ran2+1);
     } while (first_char == second_char);
     name = first_char + second_char;
     $( "#name-list" ).after( '<div class="name-result">'+ name + 
     getBtnHtml(name) +
     '<button class="btn btn-danger btn-sm search-button" onclick="addToFavorite(\''+name+'\')">★</button>' +
     "</div>" );
}