// Router
window.onload = () => Route({'': 'banner.html', '/contact': 'contact.html', '/faq': 'faq.html', '/isqip': 'isqip.html', '/ticket': 'ticket.html'});
// ///


// SIDE BAR MOBILE
$(document).ready(() => {
    $('#sidebar-btn').click(() => {
        $(".sidebar").fadeIn(300);
        $(".mob-topbar, .content-side").css({opacity: 0.5});
    });
    $(window).on('resize', function () {
        var win = $(window);
        if (win.width() >= 575.98) {
            $(".sidebar").fadeIn(300);
            $(".mob-topbar, .content-side").css({opacity: 1});
        }
        if (win.width() < 575.98) {
            $(".sidebar").fadeOut(300);
        }
    });

    // side bar active change
    $(window).on('hashchange load', () => {
        let currentPage = window.location.hash.substring(1).slice(1);
        if(currentPage != ''){
            $('.menu li').removeClass('active');
            $('.menu li div.selected').remove();
            currentPage ='.' + currentPage + '-btn';
            $(currentPage).append('<div class="selected"></div>');
        }else{
            $('.menu li').removeClass('active');
            $('.menu li div.selected').remove();
            $('.home-btn').append('<div class="selected"></div>');
        }
    });

});
$(document).mouseup(function (e) {
    if ($(window).width() < 575.98) {
        if (!$('.sidebar').is(e.target) && $('.sidebar').has(e.target).length === 0) {
            $('.sidebar').fadeOut();
            $(".mob-topbar, .content-side").css({opacity: 1});
        }
    }
});
// ///////////

/**
 * contact page global variables
 */
var textCurtains = null;
var textToReveal = null;
var textCurtainEffect = null;
var pageRevealerAnimationRaise = null;
// Page Scripts //
let pageScript = () => { // FAQ PAGE
    $('.faq-question').click(function () {

        $(this).next('.faq-answer').fadeToggle();
    });

    /**
     * Contact page scripts
     */
    console.log('yes it fires');
    // text curtain reveal animation
    textCurtains = document.getElementsByClassName('text-reveal-curtain');
    textToReveal = document.getElementsByClassName('text-to-reveal');
    textCurtainEffect = anime.timeline({
        easing: 'easeInOutSine',
        duration: 100,
        delay: anime.stagger(50),
        endDelay: 50,
        autoplay: false
    });

    textCurtainEffect
    .add({
        targets: textCurtains,
        scaleX: [0, 1],
        direction: 'alternate',
        complete: function () {
            for (var i = 0; i < textToReveal.length; ++ i) {
                textToReveal[i].classList.toggle('make-invisible');
                textCurtains[i].style.transformOrigin = 'right';
            }
        }
    })
    .add({
        targets: textCurtains,
        scaleX: [1, 0]
    });
    $('.contact-container').ready(function(){
        setTimeout(function () {
            textCurtainEffect.play();
        }, 500);
    });


    // FAQ PAGE

    // PAGINATION
    let crt_faq_page = 0;
    let total_page = $('.page').length;
    let pageNumber = function(crt, tot){
        return `${crt+1}\\${tot}`;
    }

    $('.page').hide();
    $(`.page:eq(${crt_faq_page})`).show();
    $('.page-number').text(pageNumber(crt_faq_page, total_page));

    $('#faq-btn-next').click(()=>{
        $('.page').hide();
        crt_faq_page += 1;
        if(crt_faq_page == total_page){crt_faq_page = 0;}
        $(`.page:eq(${crt_faq_page})`).show();
        $('.page-number').text(pageNumber(crt_faq_page, total_page));
    });
    $('#faq-btn-prev').click(()=>{
        $('.page').hide();
        if(crt_faq_page == 0){crt_faq_page = total_page;}
        crt_faq_page -= 1;
        $(`.page:eq(${crt_faq_page})`).show();
        $('.page-number').text(pageNumber(crt_faq_page, total_page));
    });

    /**
     * Page revealing animation
     */
    var pageRevealerElement = document.getElementsByClassName('page-revealer-element');

    pageRevealerAnimationRemove = anime.timeline({
        easing: 'easeInOutSine',
        duration: 800,
        delay: anime.stagger(100),
        endDelay: 50,
        autoplay: false
    });

    pageRevealerAnimationRemove
    .add({
        targets: pageRevealerElement,
        scaleY: [1, 0],
        complete: function () {
            for (var i = 0; i < pageRevealerElement.length; ++i) {
                pageRevealerElement[i].style.transformOrigin = 'left bottom'
            }
        },
    })
    .add({
        targets: '#main',
        translateY: ['2rem', '0rem'],
        duration: 100,
        opacity: [0, 1]
    });

    pageRevealerAnimationRaise = anime.timeline({
        easing: 'easeInOutSine',
        duration: 800,
        delay: anime.stagger(100),
        endDelay: 50,
        autoplay: false
    });

    pageRevealerAnimationRaise
    .add({
        targets: pageRevealerElement,
        scaleY: [0, 1],
        complete: function () {
            for (var i = 0; i < pageRevealerElement.length; ++i) {
                pageRevealerElement[i].style.transformOrigin = 'left top'
            }
        }
    });

    // trigger page transition on clicking menu
    $('.menu>li').click(function() {
        console.log('load');
        $('#main').css('opacity', 0);
        pageRevealerAnimationRaise.play();
    });

    $('#main').ready(function() {
        console.log('ready');
        pageRevealerAnimationRemove.play();
    });
};
// //////////////
