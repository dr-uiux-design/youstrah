jQuery(document).ready(function ($) {

  


  //плавная прокрутка
  $("body").on('click', '[href*="#"]', function (e) {
    var fixed_offset = 0;
    //console.log(this.hash);
    $('html,body').stop().animate({
      scrollTop: $(this.hash).offset().top - fixed_offset
    }, 1000);
    e.preventDefault();
  });

  //function handler(event) {
  //  var hash = event.target.hash;
  //  var fixed_offset = 0;
//
  //  if (hash) {
  //    event.preventDefault();
//
  //    var tag = $(hash);
//
  //    if ($(hash).length) {
  //      var offset = tag.offset().top - fixed_offset;
  //      $('html, body').stop().animate({scrollTop: offset},'slow');
  //    }
  //  }
  //}
//
  //$('body').on( "click", '[href*="#"]', handler );

  //slick clients
  $('.slick-clients').slick({
    lazyLoad: 'ondemand',
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dots: false,
    prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
    draggable: true,
    responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          infinite: true,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  });

  //Активный пункт меню в каталоге
  $("a.nav-link").each(function () {
    var location = window.location.protocol + '//' + window.location.host + window.location.pathname;
    var link = this.href;
    if (link == location) {
      $(this).addClass('active');
      //  $(this).parent().addClass('show');

    }
  });

  //аккордион
  // клик по шапке
  $('.js-faq-trigger').on('click', function () {

    // Получаем родителя, элемент аккордеона
    var parent = $(this).closest('.js-faq');

    // если при клике мы не нашли у элемента активный класс
    if (parent.hasClass('is-active')) {
      // то мы его удаляем
      parent.removeClass('is-active');
      
    } else {
      // удаляем у всех элементов активный класс
      $('.js-faq').removeClass('is-active');
      

      // добавляем класс тому элементу, по которому кликнули
      parent.addClass('is-active');
      
    }
  });


});


