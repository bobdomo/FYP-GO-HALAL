$('textarea').on('click', function (e) {
  $(this).addClass('clicked');
}).on('transitionend', function (e) {
  $(this).toggleClass('open');
});