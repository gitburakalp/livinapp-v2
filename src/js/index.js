import $ from 'jquery';
import Swiper from 'swiper/bundle';

import mainSlideComponents from './ui/components/main-slide';

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

  if (ww > 767.99) {
    var mainsSliderSlideCount = $mainSlider.find('.main-slide').length;

    $('<div class="main-thumb-slider-block"><div class="main-thumb-slider swiper-container"><div class="swiper-wrapper"></div></div></div>').insertBefore('.main-slider-block');

    $mainSlider.find('.main-slide').each(function () {
      var $this = $(this);
      var $mainThumbSlider = $('.main-thumb-slider');
      var title = $this.find('.title').text().trim();
      var description = $this.find('.main-cards-contents').data('description');

      $mainThumbSlider.find('.swiper-wrapper').append(`
        <div class="swiper-slide">
            <h3 class="title">${title}</h3>

            <div class="description-block">
                <p class="description" data-swiper-parallax-opacity="0" data-swiper-parallax-y="-300" data-swiper-parallax-duration="1000">${description}</p>
            </div>
        </div>
      `);
    });

    $mainSlider.append('<div class="main-slider-controls"><i class="fal fa-chevron-left main-slider--prev"></i><i class="fal fa-chevron-right main-slider--next"></i></div>');

    var mainSlider = new Swiper('.main-slider', {
      speed: 1000,
      slidesPerView: 2.875,
      spaceBetween: 15,
      loop: true,
      loopedSlides: mainsSliderSlideCount,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      slideToClickedSlide: true,
      navigation: {
        nextEl: '.main-slider--next',
        prevEl: '.main-slider--prev',
      },
      on: {
        transitionStart: () => {
          setTimeout(function () {
            var thisSource = $('.main-slider').find('.swiper-slide-active img').attr('src');

            $('.fixed-bg').attr('style', `background-image:url('${thisSource}')`);
          }, 500);

          setTimeout(function () {
            $('.fixed-bg').addClass('active');
          }, 900);
        },
      },
    });

    var mainThumbsSlider = new Swiper('.main-thumb-slider', {
      speed: 1000,
      slidesPerView: 2.875,
      spaceBetween: 15,
      loop: true,
      loopedSlides: mainsSliderSlideCount,
      direction: 'vertical',
      centeredSlides: true,
      slideToClickedSlide: true,
      parallax: true,
    });

    mainSlider.controller.control = mainThumbsSlider;
    mainThumbsSlider.controller.control = mainSlider;
  } else {
    $mainSlider.each(function () {
      var $this = $(this);
      var config = {
        slidesPerView: 1.875,
        spaceBetween: 15,
        freeMode: true,
        loop: false,
        breakpoints: {
          768: {
            slidesPerView: 2.875,
            freeMode: false,
            loop: true,
          },
        },
      };

      window.mainSlider = new Swiper($this[0], config);
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
