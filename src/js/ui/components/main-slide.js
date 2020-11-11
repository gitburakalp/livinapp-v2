function setMainSlide(data) {
  var imageUrl = '';
  var location = '';

  data.images.forEach(e => {
    if (e.width > 375 && e.width < 768) {
      imageUrl = e.path;
    }
  });

  data.filterLabels.forEach(e => {
    if (e.includes('Location')) {
      location = e;
    }
  });

  var mainSliderSlide = `
  <div class="main-slide swiper-slide">
    <div class="main-cards">
        <figure class="image">
            <img src="${imageUrl}" alt="" data-thumbs="${imageUrl.split(/.jpg/)[0] + '_thumb.jpg'}">
        </figure>
        <div class="main-cards-contents"
            data-description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia, accusantium! Veritatis eaque provident, ipsum libero odio illo nulla iure distinctio autem, illum dolores facere velit cum asperiores maxime. Suscipit, officia.">
            <h3 class="title">
                ${data.name}
            </h3>
            <div class="form-row">
                <div class="col-auto">
                    <div class="location">
                        ${location}<i class="fal fa-map-marker ml-2"></i>
                    </div>
                </div>
                <div class="col-auto">
                    <div class="time">
                        ${data.startTime} - ${data.endTime}
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
  `;

  $('.main-slider .main-wrapper').append(mainSliderSlide);
}

export default setMainSlide = {
  setMainSlide,
};
