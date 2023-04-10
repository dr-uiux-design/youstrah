$(document).ready(function ($) {

  //добавление класса к пункту  меню
  $(".nav-link").each(function () {
    var location2 = window.location.protocol + '//' + window.location.host + window.location.pathname;
    //  console.log(location2);
    var link = this.href;
    if (link == location2) {
      $(this).parent().addClass('active');
      //$(this).parent().parent().addClass('show');
      // $(this).parent().parent().prev().removeClass('collapsed');

    }
  });
  //плавная прокрутка
  $("body").on('click', '[href*="#"]', function (e) {
    var fixed_offset = 0;
    $('html,body').stop().animate({
      scrollTop: $(this.hash).offset().top - fixed_offset
    }, 1000);
    console.log('эпрокрутка');
    e.preventDefault();
  });

  //partners slider
  function partners_slider() {
    if ($('.partners_slider').length) {
      $('.partners_slider').owlCarousel({
        loop: true,
        margin: 20,
        items: 1,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 6000,
        smartSpeed: 2500,
        autoplayHoverPause: true,
        dotsEach: false,
        navContainer: '.partners_slider',
        navText: ['<img src="img/arrow-prev.svg"></img>', '<img src="img/arrow-next.svg"></img>'],
        responsive: { //Адаптивность. Кол-во выводимых элементов при определенной ширине.
          0: {
            items: 1
          },
          600: {
            items: 2
          },
          800: {
            items: 3
          },
          1000: {
            items: 3
          },
          1200: {
            items: 4
          },
          1300: {
            items: 4
          }
        }
      });
    }
  }
  partners_slider();

  //меню
  function resize() {
    var menu = $('.navbar-collapse');
    var header = $('header');
    var widthHead = header.width();
    if (widthHead < 992) {
      menu.css({ 'display': 'none' });
      header.addClass('mobile');
    } else {
      menu.css({ 'display': 'flex' });
      header.removeClass('mobile');
    }
  }
  resize();

  $(window).resize(function () {
    resize();
  });


  $('.navbar-toggler').click(function () {
    element = $('.navbar-collapse');
    display = element.css('display');
    if (display == 'none')
      $('.navbar-collapse').slideDown(400);
    if (display == 'block')
      $('.navbar-collapse').slideUp(400);
  });

  $('.navbar-collapse a').click(function () {
    var header = $('header');
    var widthHead = header.width();
    if (widthHead < 992)
      $('.navbar-collapse').slideUp(400);
  });



});


//параллакс фона
if (document.querySelector('.mouse-parallax-fog-2')) {
  //let bg = document.querySelector('.mouse-parallax-bg');
  //let fog1 = document.querySelector('.mouse-parallax-fog-1');
  let fog2 = document.querySelector('.mouse-parallax-fog-2');
  window.addEventListener('mousemove', function (e) {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    //bg.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
    //fog1.style.transform = 'translate(+' + x * 50 + 'px, -' + y * 50 + 'px)';
    fog2.style.transform = 'translate(-' + x * 10 + 'px, -' + y * 10 + 'px)';
  });
}

//accordion
if (document.querySelector('.accordion')) {
  let accordion = document.querySelector('.accordion');
  let items = accordion.querySelectorAll('.accordion_item');
  let title = accordion.querySelectorAll('.accordion_title');

  function toggleAccordion() {
    let thisItem = this.parentNode;

    items.forEach(item => {
      if (thisItem == item) {
        // if this item is equal to the clicked item, open it.
        thisItem.classList.toggle('show');
        return;
      }
      // otherwise, remove the open class
      item.classList.remove('show');
    });
  }

  title.forEach(question => question.addEventListener('click', toggleAccordion));
}

// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () { };
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());