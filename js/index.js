$(function(){
  var $nav = $('#nav');
  var $logo = $('#logo');
  var $ul = $nav.find('ul');
  var $ol = $nav.find('ol');
  var allPos = [],subPos =[],allWH = {},hidePos = {l:-500,t:-500};

  function resize(){
    var w = $('body').width();
    var h = $('body').height();
    var min = Math.min(w,h);

    $logo.removeClass('rotate').add($ul.find('li').data('pop','unpoped').show()).add($ol.find('a').css({width:0,height:0})).stop();

    allPos.length = 0;
    subPos.length = 0;

    var nav = {};
        nav.maxW = 470;
        nav.maxH = 488;
        nav.w = Math.min(parseInt(min * 0.9,10),nav.maxW);
        nav.h = parseInt(nav.w * (nav.maxH/nav.maxW),10);
        nav.l = (w - nav.w)/2;
        nav.t = (h - nav.h)/2;

    var sub = {};
        sub.margin = 4;
        sub.maxW = 186;
        sub.maxH = 160;
        sub.h = parseInt((nav.h - sub.margin * 2) / 3,10);
        sub.w = sub.h * sub.maxW / sub.maxH;
        sub.l = (nav.w - sub.w) / 2;
        sub.t = (nav.h - sub.h) / 2;
        allPos.push({t:sub.t,l:sub.l});
        allWH.w = sub.w;
        allWH.h = sub.h;

        sub.s12T = 0;
        sub.s12L = sub.l;
        subPos.push({t:sub.s12T,l:sub.s12L});
        allPos.push({t:sub.s12T,l:sub.s12L});

        sub.s6T = sub.t + sub.h + sub.margin;
        sub.s6L = sub.l;
        subPos.push({t:sub.s6T,l:sub.s6L});
        allPos.push({t:sub.s6T,l:sub.s6L});

        sub.s11T = nav.h / 2 -sub.margin / 2 - sub.h;
        sub.s11L = 0;
        subPos.push({t:sub.s11T,l:sub.s11L});
        allPos.push({t:sub.s11T,l:sub.s11L});

        sub.s7T =  sub.s11T + sub.h + sub.margin;
        sub.s7L = 0;
        subPos.push({t:sub.s7T,l:sub.s7L});
        allPos.push({t:sub.s7T,l:sub.s7L});

        sub.s1T = sub.s11T;
        sub.s1L = nav.w / 2 - sub.w + nav.w / 2;
        subPos.push({t:sub.s1T,l:sub.s1L});
        allPos.push({t:sub.s1T,l:sub.s1L});

        sub.s5T = sub.s7T;
        sub.s5L = sub.s1L;
        subPos.push({t:sub.s5T,l:sub.s5L});
        allPos.push({t:sub.s5T,l:sub.s5L});

    $nav.css({width:nav.w,height:nav.h,left:nav.l,top:nav.t});
    $logo.css({width:sub.w,height:sub.h,left:sub.l,top:sub.t});
    $ul.find('li').css({width:sub.w,height:sub.h,left:sub.l,top:sub.t,opacity:0});
    setTimeout(function(){
      $nav.addClass('rotate');
      $ul.find('li').each(function(k,v){
        $(this).stop().animate({
          width:sub.w,
          height:sub.h,
          left: subPos[k].l,
          top: subPos[k].t,
          opacity:1
        },1000,function(){
          $nav.removeClass('rotate');
        });
      });
    },1000)
  }

  resize();

  $ul.on('click','li',function(){
    if($(this).hasClass('p')){
      var me = $(this);
      var siblings = me.siblings();
      $logo.removeClass('rotate');
      if(me.data('pop') == 'poped'){
        hideChildren(me);
        $logo.stop().animate({
          left:allPos[0].l,
          top:allPos[0].t,
          opacity:1
        },500,function(){
          setTimeout(function(){
              siblings.show();
              $ul.find('li').each(function(k,v){
                $(this).stop().animate({
                  left: subPos[k].l,
                  top: subPos[k].t,
                  opacity:1
              },500);
            });

          },500);
          me.data('pop','unpoped');
        });

        return;
      }

      siblings.stop().animate({
        left:allPos[0].l,
        top:allPos[0].t,
        opacity:0
      },600,function(){
        siblings.hide();
        $logo.addClass('rotate').stop().animate({
          left:hidePos.l,
          top:hidePos.t
        },2000,function(){
          $(this).removeClass('rotate');
          siblings.css({'left':hidePos.l,top:hidePos.t});
        });
        showChildren(me);
        me.data('pop','poped');

      });
    }



  });

  function showChildren(obj){
    var c = obj.data('child');
    var $li = $ol.find('li').eq(c);
    var l = obj.css('left');
    var t = obj.css('top');
    $li.find('a').css({width:allWH.w,height:allWH.h,left:l,top:t,opacity:0}).each(function(k,v){
       var id = $(this).data('id');
       var pos = allPos[id];
       $(this).stop().animate({
         left:pos.l,
         top:pos.t,
         opacity:1
       },500);
    });
  }

  function hideChildren(obj){
    var c = obj.data('child');
    var $li = $ol.find('li').eq(c);
    var l = obj.css('left');
    var t = obj.css('top');
    $li.find('a').stop().animate({
      left:l,
      top:t,
      opacity:0
    },1000);
  }

  $(window).resize(function(){
    resize();
  });


});