$(document).ready(function(){
  // Fix navbar overlappint content
  $('body').css('padding-top', parseInt($('#main-navbar').css("height"))+20);

  //Put footer always at te bottom of the page
  var docHeight = $(window).height();
  var footerHeight = $('#footer').height();
  var footerTop = $('#footer').position().top + footerHeight;

  if (footerTop < docHeight){
    $('#footer').css('margin-top', ((docHeight - footerTop) - 30) + 'px');
  }
  $(".alerts").first().hide().fadeIn(200).delay(2000).fadeOut(1000, function () { $(this).remove(); });

  $('#action_menu_btn').click(function(){
    $('.action_menu').toggle();
  });

});