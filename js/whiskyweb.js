var WhiskyWeb = (function() {

  var sections = ['#home', '#information', '#speakers', '#sponsors', '#tickets'];
  var positions = $.map(sections, function(id) {
    return $(id).position().top;
  });

  var toScroll = $(window.opera ? 'html' : 'html, body');
  var active = null;
  var ignoreScroll = false;
  var links = {};

  $('navigation a').each(function(i, link) {

    var $link = $(link);
    var target = $link.attr('href');
    var $section = $(target);

    links[target] = $link;

    // Temporarily swap out the ID of the target so hashchange doesnt
    // immediately jump
    $link.bind('mousedown', function() {
      ignoreScroll = true;
      $section.attr('id', '');
      document.location.hash = target;
      highlightNavAtPosition(positions[i]);
      toScroll.animate({
        scrollTop : parseInt(positions[i], 10)
      }, 'fast', function() {
        $section.attr('id', target.replace(/^#/, ''));
        ignoreScroll = false;
      });
    });

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
    if (!ignoreScroll) {
      highlightNavAtPosition($(window).scrollTop() + 50);
    }
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