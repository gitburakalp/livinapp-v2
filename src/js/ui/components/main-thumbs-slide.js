function setMainThumbsSlide(title, speed, desc) {
  var thumbsSliderSlide = `
  <div class="swiper-slide">
      <h3 class="title">${title}</h3>

      <div class="description-block">
          <p class="description" data-swiper-parallax-opacity="0" data-swiper-parallax-y="-300" data-swiper-parallax-duration="${speed}">${desc}</p>
      </div>
  </div>
`;

  $('.main-thumb-slider').find('.swiper-wrapper').append(thumbsSliderSlide);
}

export default setMainThumbsSlide = {
  setMainThumbsSlide,
};
