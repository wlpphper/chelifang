var $back = $('<i class="iconfont">&#xf0006;</i>');
var $forward = $('<i class="iconfont">&#xf0005;</i>');
var $home = $('<i class="iconfont">&#xf012b;</i>');
var $refresh = $('<i class="iconfont">&#x3478;</i>');

$back.on("click",function(){
  window.history.back();
});

$forward.on("click",function(){
  window.history.forward();
});

$home.on("click",function(){
  document.location.href="../index.html";
  //window.history.forward();
});

$refresh.on("click",function(){
  document.location.reload();
});

var $w_back = $('<a></a>').append($back);
var $w_forward = $('<a></a>').append($forward);
var $w_home = $('<a></a>').append($home);
var $w_refresh = $('<a></a>').append($refresh);

$('<div class="footer-nav"></div>').append($w_back,$w_forward,$w_home,$w_refresh).appendTo($('body'));