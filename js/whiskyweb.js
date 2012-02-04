var WhiskyWeb = (function() {

  var sections = ['#home', '#information', '#speakers', '#sponsors', '#tickets'];
  var positions = $.map(sections, function(id) {
    return $(id).position().top;
  });

  var active = null;
  var links = {};

  $('navigation a').each(function(i, link) {
    links[$(link).attr('href')] = $(link);
  });

  function calculateNavSection(scrollTop) {
    for (var i = 1, len = positions.length; i < len; i++) {
      if (scrollTop < positions[i]) {
        return sections[i-1];
      }
    }
    return sections[sections.length - 1];
  }


  function highlightNavAtPosition(position) {
    var section = calculateNavSection(position);
    if (active) {
      active.removeClass('selected');
    }
    active = links[section].addClass('selected');
  }


  function highlightCurrentNav() {
    highlightNavAtPosition($(window).scrollTop() + 50);
  }

  setInterval(highlightCurrentNav, 200);

  var activeInf = $('#information').find('.active');
  $('#information h2').bind('mousedown', function() {
    if (activeInf) {
      activeInf.removeClass('active');
    }
    activeInf = $(this).parents('.item').addClass('active');
  });

})();