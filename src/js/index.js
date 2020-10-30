import $ from 'jquery';
import 'slick-carousel';
import '../sass/main.scss';

import mainSliderSlide from './ui/_main-slide';

window.jQuery = $;
window.$ = $;

const DATE = new Date();
const LANG = $('html').attr('lang');

var flavoursData = [];
var spaData = [];

function typeNavInit() {
  $('.type-nav').each(function () {
    var activeClass = 'is-active';

    $('.type-list > *').on('click', function () {
      var $this = $(this);
      var thisType = $this.data('type');

      $('.type-list > *').removeClass(activeClass);
      $(this).addClass(activeClass);

      $('#mainSlider').slick('slickUnfilter');
      $('#mainSlider').slick('slickFilter', `[data-filter-props='${thisType}']`);
    });
  });
}

/**
 * Get Json data From Url
 * @param {string} dataUrl
 */
function GetDataFromUrl(dataUrl) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', dataUrl);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
}

var FlavoursData = [];

const GetAllData = (selectedType = 'flavours') => {
  var url = `http://www.rubiplatinum.com/api/v1/services?lang=${LANG != 'en' ? LANG + '-' + LANG.toUpperCase() : 'en-US'}`;

  GetDataFromUrl(url).then(x => {
    var data = JSON.parse(x).data;

    data.forEach(dt => {
      var elType = dt.serviceTypeName;

      dt.subTenantServices.forEach(el => {
        FlavoursData.push(el);
      });
    });

    initMainSlider();
  });
};

function initMainSlider() {
  $('#mainSlider').each(function () {
    var $this = $(this);

    FlavoursData.forEach(function (el) {
      var slideElem = mainSliderSlide.fillMainSlide(el);

      $this.append(slideElem);
    });

    $('#mainSlider').slick({
      rows: 0,
      centerMode: true,
      centerPadding: '60px',
      arrows: false,
      slidesToShow: 1,
      focusOnSelect: true,
      adaptiveHeight: true,
    });

    $('#mainSlider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
      var thisImageSource = $(`[data-slick-index=${currentSlide}]`).find('img').attr('src');

      $('.fixed-bg').fadeOut(125);

      setTimeout(() => {
        $('.fixed-bg').attr('style', `background-image:url("${thisImageSource.split(/.jpg/)[0] + '_thumb.jpg'}")`);
      }, 75);

      setTimeout(() => {
        $('.fixed-bg').fadeIn(250);
      }, 150);
    });

    $('#mainSlider').slick('slickFilter', "[data-filter-props='flavours']");
  });
}

document.addEventListener('DOMContentLoaded', function () {
  typeNavInit();
  GetAllData();
});
