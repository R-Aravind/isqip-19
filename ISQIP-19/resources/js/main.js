$(document).ready(()=> {
    $('#sidebar-btn').click(()=>{
        $(".sidebar").fadeIn(300);
        $(".mob-topbar, .content-side").css({opacity:0.5});
    });
});

let $menu = $('.sidebar'); 

$(document).mouseup(function (e) {
    if (!$('.sidebar').is(e.target) && $('.sidebar').has(e.target).length === 0){
        $(".sidebar").fadeOut();
        $(".mob-topbar, .content-side").css({opacity:1});
    }
  });