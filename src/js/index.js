import $ from 'jquery';
import Swiper from 'swiper/bundle';

import mainSlideComponents from './ui/components/main-slide';
import mainThumbSlideComponents from './ui/components/main-thumbs-slide';

import '../sass/main.scss';

window.jQuery = $;
window.$ = $;

const lang = $('html').attr('lang');
const localeLang = lang != 'en' ? lang + '-' + lang.toUpperCase() : 'en-US';
const $mainSlider = $('.main-slider');
const servicesURL = `https://www.rubiplatinum.com/api/v1/services?lang=${localeLang}`;

var activeMenuItem = $('.main-list-item.active').data('type');

window.servicesURL = servicesURL;

function getData(url) {
  fetch(url)
    .then(response => response.json())
    .then(dt => {
      var data = dt.data;

      data.forEach(e => {
        if (e.serviceTypeName.toLowerCase() == activeMenuItem) {
          e.subTenantServices.forEach(el => {
            mainSlideComponents.setMainSlide(el);
          });
        }
      });

      initSwiper();
    });
}

const setMainListEvents = () => {
  $('.main-list').each(function () {
    $(this)
      .find('.main-list-link')
      .on('click', function () {
        $('.main-list-item').removeClass('active');
        $(this).parent().addClass('active');
      });
  });
};

const initSwiper = () => {
  var ww = $(window).outerWidth();
  var $fixedBg = $('.bg');
  var swiperSpeed = 750;

  if (ww > 767.99) {
    $('<div class="main-thumb-slider-block"><div class="main-thumb-slider swiper-container"><div class="swiper-wrapper"></div></div></div>').insertBefore('.main-slider-block');

    $mainSlider.find('.main-slide').each(function () {
      var $this = $(this);
      var title = $this.find('.title').text().trim();
      var description = $this.find('.main-cards-contents').data('description');

      mainThumbSlideComponents.setMainThumbsSlide(title, swiperSpeed, description);
    });

    $mainSlider.append('<div class="main-slider-controls"><i class="fal fa-chevron-left main-slider--prev"></i><i class="fal fa-chevron-right main-slider--next"></i></div>');

    var mainSlider = new Swiper('.main-slider', {
      slidesPerView: 2.875,
      speed: swiperSpeed,
      spaceBetween: 15,
      loop: true,
      loopedSlides: 2.875,
      keyboard: true,
      slideToClickedSlide: true,
      navigation: {
        nextEl: '.main-slider--next',
        prevEl: '.main-slider--prev',
      },
      on: {
        transitionStart: swiper => {
          var $activeSlide;
          var imgSource;

          swiper.slides.forEach(e => {
            if ($(e).attr('class').includes('swiper-slide-active')) {
              $activeSlide = $(e);
              imgSource = $activeSlide.find('img').data('thumbs');
            }
          });

          $fixedBg
            .fadeTo(150, 0.5, function () {
              $(this).css('background-image', 'url(' + imgSource + ')');
            })
            .fadeTo(350, 1);
        },
      },
    });

    var mainThumbsSlider = new Swiper('.main-thumb-slider', {
      speed: swiperSpeed,
      slidesPerView: 2.875,
      spaceBetween: 15,
      loop: true,
      loopedSlides: 2.875,
      direction: 'vertical',
      centeredSlides: true,
      parallax: true,
      slideToClickedSlide: true,
    });

    mainSlider.controller.control = mainThumbsSlider;
    mainThumbsSlider.controller.control = mainSlider;
  } else {
    $mainSlider.each(function () {
      var $this = $(this);
      var config = {
        speed: 750,
        touchRatio: 0.5,
        slidesPerView: 1.875,
        spaceBetween: 15,
        loop: true,
        on: {
          transitionStart: swiper => {
            var $activeSlide;
            var imgSource;

            swiper.slides.forEach(e => {
              if ($(e).attr('class').includes('swiper-slide-active')) {
                $activeSlide = $(e);
                imgSource = $activeSlide.find('img').data('thumbs');
              }
            });

            $fixedBg
              .fadeTo(150, 0.5, function () {
                $(this).css('background-image', 'url(' + imgSource + ')');
              })
              .fadeTo(350, 1);
          },
        },
      };

      var mainSlider = new Swiper($this[0], config);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  var hh = $('header').outerHeight();

  getData(servicesURL);
  setMainListEvents();

  $(window).on({
    load: () => {
      document.documentElement.style.setProperty('--hh', `${hh}px`);
    },
    resize: () => {
      document.documentElement.style.setProperty('--hh', `${hh}px`);
    },
  });
});
