var WhiskyWeb = (function() {

  var sections = ['#home', '#information', '#speakers', '#sponsors', '#tickets'];
  var positions = $.map(sections, function(id) {
    return $(id).position().top;
  });

  var toScroll = $(window.opera ? 'html' : 'html, body');
  var active = null;
  var ignoreScroll = false;
  var links = {};

  $('nav a').each(function(i, link) {

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
  activeInf.not(':first').removeClass('active');
  $('#information h2').bind('mousedown', function() {
    if (activeInf) {
      activeInf.removeClass('active');
    }
    activeInf = $(this).parents('.item').addClass('active');
    setTimeout(function() {
        positions = $.map(sections, function(id) {
            return $(id).position().top;
          });
    }, 500);
  });

  // Recalculate positions once everything has been given a bit of time
  // to be positioned correctly
  setTimeout(function() {
    positions = $.map(sections, function(id) {
      return $(id).position().top;
    });
  }, 1000);
    
    var openstreetmapUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
     openstreetmapAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 openstreetmap',
     openstreetmap = new L.TileLayer(openstreetmapUrl, {maxZoom: 18, attribution: openstreetmapAttribution});
    
    var map = new L.Map('map');
    map.setView(new L.LatLng(55.9488, -3.195), 14).addLayer(openstreetmap);
    
    var HubIcon = L.Icon.extend({
         iconUrl: './img/marker.png',
         shadowUrl: null,
         iconSize: new L.Point(71, 73),
         iconAnchor: new L.Point(36, 73)
    });
    
    var marker = new L.Marker(new L.LatLng(55.9488, -3.195), {icon: new HubIcon()});
    map.addLayer(marker);
    
    $('div.hotel-map').each(function() {
        var openstreetmapUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var openstreetmapAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 openstreetmap';
        var openstreetmap = new L.TileLayer(openstreetmapUrl, {maxZoom: 18, attribution: openstreetmapAttribution});
    
        var lat = $(this).find('span.lat').text();
        $(this).find('span.lat').remove();
        var lon = $(this).find('span.lon').text();
        $(this).find('span.lon').remove();
        var mapId = $(this).attr('id');
        var mapNumber = mapId.charAt(mapId.length -1);
    
        var map = new L.Map('hotel-map-' + mapNumber);
        map.setView(new L.LatLng(lat, lon), 15).addLayer(openstreetmap);
    
        var MapIcon = L.Icon.extend({
              iconUrl: './img/mapmarker.png',
              shadowUrl: null,
              iconSize: new L.Point(32, 32),
              iconAnchor: new L.Point(16, 32)
        });
    
        var marker = new L.Marker(new L.LatLng(lat, lon), {icon: new MapIcon()});
        map.addLayer(marker);
    });
    
    $('#accommodation').find('.slider').anythingSlider({
         buildNavigation: false,
         resizeContents: false,
         showMultiple: 1,
         changeBy: 1,
         autoPlay: false,
         buildStartStop: false
    });
    
})();
