$(document).ready(function(){
  // Fix navbar overlappint content
  $('body').css('padding-top', parseInt($('#main-navbar').css("height"))+20);

  //Put footer always at te bottom of the page
  var docHeight = $(window).height();
  var footerHeight = $('#footer').height();
  var footerTop = $('#footer').position().top + footerHeight;

  if (footerTop < docHeight)
      $('#footer').css('margin-top', ((docHeight - footerTop) - 30) + 'px');

});

// $(document).ready(function(){
//     $(window).resize(function () { 
//         $('body').css('padding-top', parseInt($('#main-navbar').css("height"))+10);
//     });
//     $(window).on(function () { 
//         $('body').css('padding-top', parseInt($('#main-navbar').css("height"))+10);        
//     });
// });

function enableRepeatSchedule() {

  const items = document.getElementsByClassName("scheduleItem");
  const el = document.getElementById("repeat");

  for (let i = 0; i < items.length; i++) {
    if (el.checked) {
      items[i].disabled = false;
    } else {
      items[i].disabled = true;
    }
  }
}

function setMinScheduleDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  today = `${yyyy}-${mm}-${dd}`;
  document.getElementById('schedule').setAttribute('min', today);
}
