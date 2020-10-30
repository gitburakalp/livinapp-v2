function fillMainSlide(data) {
  var ww = $(window).outerWidth();
  var serviceTypeName = data.serviceTypeName.toLowerCase().replace(' ', '-');
  var title = data.name;
  var startEndTime = data.startValue == 1440 && data.endValue == 1439 ? 'All Day' : `${data.startTime} | ${data.endTime}`;

  var elLocation = [];

  data.filterLabels.forEach(function (elem) {
    if (elem.toLowerCase().includes('location')) {
      elLocation.push(elem);
    }
  });

  var imageUrl = data.images[0].path;

  if (ww < 1280) {
    imageUrl = data.images[1].path;
  }

  return `
    <div class="slide-item" data-filter-props="${serviceTypeName}" data-start-hour="${data.startTime}" data-end-hour="${data.endTime}" data-start-value="${data.startValue}" data-end-value="${data.endValue}">
      <figure class="image">
        <img src="${imageUrl}" />
      </figure>
      <div class="slide-contents">
        <h3 class="slide-title">
          ${title}
        </h3>

        <div class="loc-list">
          <a class="loc-item ${elLocation == '' ? 'd-none' : ''}">
            ${elLocation}
          </a>
          <span class="loc-item">
            ${startEndTime}
          </span>
        </div>
      </div>
    </div>
  `;
}

export default fillMainSlide = {
  fillMainSlide,
};
