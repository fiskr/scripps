(function( $ ) {
  // cf. http://requirejs.org/docs/api.html#config-waitSeconds
  //if waitSeconds in requirejs config has been set, use that - otherwise default to 7
  var originalWait = ( typeof requirejs.config.waitSeconds !== 'undefined' ) ? requirejs.config.waitSeconds : '7'; 
  requirejs.config.waitSeconds = 30; //expand the wait time to 15 seconds
  require(['http://d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v5.0.2.min.js'], function( Kinetic ){ 
    //require(['http://images.hgtv.com/webhgtv/hg20/pkgs/2015/dream-home/floorplan.js']);
    (function($){
  var FloorPlan = FloorPlan || {};

  FloorPlan.App = function () {

    var tentpoleId = "DH15",
        rooms = [],
        roomData = [],
    appOffset = $('#app').offset();

    //---------------------------------
    // room object data
    //---------------------------------

    roomData = [
      {
        name: "Front Yard",
        id: "front-yard",
        floor: 1,
        roomBoundaries: 0,
        visited: isVisited(this.name),
        clicktag: "http://www.hgtv.com/design/hgtv-dream-home/2015/articles/front-yard-from-hgtv-dream-home-2015",
        point: { x: 60.6, y: 206.1 },
        drawFunc: function (ctx) {
          ctx.beginPath();
          ctx.moveTo(61.1, 218.9);
          ctx.bezierCurveTo(54.3, 218.9, 48.7, 213.4, 48.7, 206.5);
          ctx.bezierCurveTo(48.7, 199.7, 54.3, 194.2, 61.1, 194.2);
          ctx.bezierCurveTo(68.0, 194.2, 73.5, 199.7, 73.5, 206.5);
          ctx.bezierCurveTo(73.5, 213.4, 68.0, 218.9, 61.1, 218.9);
          ctx.closePath();
          ctx.fillStrokeShape(this);
        }
      },
      {
        name: "Great Room",
        id: "great-room",
        floor: 1,
        roomBoundaries: 1,
        visited: isVisited(this.name),
        clicktag: "http://www.hgtv.com/design/hgtv-dream-home/2015/articles/great-room-from-hgtv-dream-home-2015",
        point: {x: 148.5, y: 198.3},
        drawFunc: function(ctx) {
          ctx.beginPath();
          ctx.moveTo(182.0, 127.0);
          ctx.lineTo(182.0, 154.0);
          ctx.lineTo(153.0, 154.0);
          ctx.lineTo(153.0, 134.0);
          ctx.lineTo(142.0, 134.0);
          ctx.lineTo(142.0, 112.0);
          ctx.lineTo(113.0, 112.0);
          ctx.lineTo(113.0, 154.0);
          ctx.lineTo(103.0, 154.0);
          ctx.lineTo(103.0, 252.0);
          ctx.lineTo(113.0, 252.0);
          ctx.lineTo(113.0, 295.0);
          ctx.lineTo(134.0, 295.0);
          ctx.lineTo(134.0, 252.0);
          ctx.lineTo(208.0, 252.0);
          ctx.lineTo(208.0, 154.0);
          ctx.lineTo(199.0, 154.0);
          ctx.lineTo(199.0, 127.0);
          ctx.lineTo(182.0, 127.0);
          ctx.closePath();
          ctx.fillStrokeShape(this);
        }
      },
      {
        name: "Kitchen",
        id: "kitchen",
        floor: 1,
        roomBoundaries: 1,
        visited: isVisited(this.name),
        clicktag: "http://www.hgtv.com/design/hgtv-dream-home/2015/articles/kitchen-from-hgtv-dream-home-2015",
        point: {x: 163.8, y: 277.6},
        drawFunc: function(ctx) {
          ctx.beginPath();
          ctx.moveTo(199.0, 252.0);
          ctx.lineTo(199.0, 295.0);
          ctx.lineTo(134.0, 295.0);
          ctx.lineTo(134.0, 252.0);
          ctx.lineTo(199.0, 252.0);
          ctx.closePath();
          ctx.fillStrokeShape(this);
        }
      },
      {
        name: "Master Bedroom",
        id: "master-bedroom",
        floor: 1,
        roomBoundaries: 1,
        visited: isVisited(this.name),
        clicktag: "http://www.hgtv.com/design/hgtv-dream-home/2015/articles/master-bedroom-from-hgtv-dream-home-2015",
        point: {x: 231.2, y: 325.9},
        drawFunc: function(ctx) {
          ctx.beginPath();
          ctx.moveTo(113.0, 295.0);
          ctx.lineTo(113.0, 315.0);
          ctx.lineTo(199.0, 315.0);
          ctx.lineTo(199.0, 362.0);
          ctx.lineTo(221.0, 362.0);
          ctx.lineTo(221.0, 367.0);
          ctx.lineTo(241.0, 367.0);
          ctx.lineTo(241.0, 362.0);
          ctx.lineTo(264.0, 362.0);
          ctx.lineTo(264.0, 295.0);
          ctx.lineTo(113.0, 295.0);
          ctx.closePath();
          ctx.fillStrokeShape(this);
        }
      },
      {
        name: "Master Patio",
        id: "master-patio",
        floor: 1,
        roomBoundaries: 1,
        visited: isVisited(this.name),
        clicktag: "http://www.hgtv.com/design/hgtv-dream-home/2015/articles/master-patio-from-hgtv-dream-home-2015",
        point: {x: 214.2, y: 375.2},
        drawFunc: function(ctx) {
          ctx.beginPath();
          ctx.moveTo(199.0, 354.0);
          ctx.lineTo(113.0, 354.0);
          ctx.lineTo(113.0, 362.0);
          ctx.lineTo(58.0, 362.0);
          ctx.lineTo(58.0, 394.0);
          ctx.lineTo(113.0, 394.0);
          ctx.lineTo(113.0, 378.0);
          ctx.lineTo(197.0, 378.0);
          ctx.lineTo(197.0, 394.0);
          ctx.lineTo(264.0, 394.0);
          ctx.lineTo(264.0, 362.0);
          ctx.lineTo(241.0, 362.0);
          ctx.lineTo(241.0, 367.0);
          ctx.lineTo(221.0, 367.0);
          ctx.lineTo(221.0, 362.0);
          ctx.lineTo(199.0, 362.0);
          ctx.lineTo(199.0, 354.0);
          ctx.closePath();
          ctx.fillStrokeShape(this);
        }
      },
      {
        name: "Master Closet",
        id: "master-closet",
        floor: 1,
        roomBoundaries: 1,
        visited: isVisited(this.name),
        clicktag: "http://www.hgtv.com/design/hgtv-dream-home/2015/articles/master-closet-from-hgtv-dream-home-2015",
        point: { x: 177.5, y: 336.3 },
        drawFunc: function(ctx) {
          ctx.beginPath();
          ctx.moveTo(199.0, 354.0);
          ctx.lineTo(199.0, 315.0);
          ctx.lineTo(155.0, 315.0);
          ctx.lineTo(155.0, 354.0);
          ctx.lineTo(199.0, 354.0);
          ctx.closePath();
          ctx.fillStrokeShape(this);
        }
      },
      {
        name: "Dressing Room",
        id: "dressing-room",
        floor: 1,
        roomBoundaries: 1,
        visited: isVisited(this.name),
        clicktag: "http://www.hgtv.com/design/hgtv-dream-home/2015/articles/dressing-room-from-hgtv-dream-home-2015",
        point: { x: 132.2, y: 337.3 },
        drawFunc: function (ctx) {
          ctx.beginPath();
          ctx.moveTo(155.0, 354.0);
          ctx.lineTo(155.0, 315.0);
          ctx.lineTo(113.0, 315.0);
          ctx.lineTo(113.0, 354.0);
          ctx.lineTo(155.0, 354.0);
          ctx.closePath();
          ctx.fillStrokeShape(this);
        }
      },
      {
        name: "Master Bathroom",
        id: "master-bathroom",
        floor: 1,
        roomBoundaries: 1,
        visited: isVisited(this.name),
        clicktag: "http://www.hgtv.com/design/hgtv-dream-home/2015/articles/master-bathroom-from-hgtv-dream-home-2015",
        point: {x: 91.2, y: 326.3},
        drawFunc: function(ctx) {
          ctx.beginPath();
          ctx.moveTo(113.0, 362.0);
          ctx.lineTo(58.0, 362.0);
          ctx.lineTo(58.0, 295.0);
          ctx.lineTo(113.0, 295.0);
          ctx.lineTo(113.0, 362.0);
          ctx.closePath();
          ctx.fillStrokeShape(this);
        }
      },
      {
        name: "Guest Bedroom",
        id: "guest-bedroom",
        floor: 1,
        roomBoundaries: 1,
        visited: isVisited(this.name),
        clicktag: "http://www.hgtv.com/design/hgtv-dream-home/2015/articles/guest-bedroom-from-hgtv-dream-home-2015",
        point: {x: 84.2, y: 85.9},
        drawFunc: function(ctx) {
          ctx.beginPath();
          ctx.moveTo(58.0, 112.0);
          ctx.lineTo(58.0, 45.0);
          ctx.lineTo(113.0, 45.0);
          ctx.lineTo(113.0, 75.0);
          ctx.lineTo(132.0, 75.0);
          ctx.lineTo(132.0, 112.0);
          ctx.lineTo(58.0, 112.0);
          ctx.closePath();
          ctx.fillStrokeShape(this);
        }
      },
      {
        name: "Guest Bathroom",
        id: "guest-bathroom",
        floor: 1,
        roomBoundaries: 1,
        visited: isVisited(this.name),
        clicktag: "http://www.hgtv.com/design/hgtv-dream-home/2015/articles/guest-bathroom-from-hgtv-dream-home-2015",
        point: {x: 120.8, y: 51.6},
        drawFunc: function(ctx) {
          ctx.beginPath();
          ctx.moveTo(132.0, 75.0);
          ctx.lineTo(113.0, 75.0);
          ctx.lineTo(113.0, 31.0);
          ctx.lineTo(132.0, 31.0);
          ctx.lineTo(132.0, 75.0);
          ctx.closePath();
          ctx.fillStrokeShape(this);
        }
      },
      {
        name: "Laundry Room",
        id: "laundry-room",
        floor: 1,
        roomBoundaries: 1,
        visited: isVisited(this.name),
        clicktag: "http://www.hgtv.com/design/hgtv-dream-home/2015/articles/laundry-room-from-hgtv-dream-home-2015",
        point: {x: 167.5, y: 142.6},
        drawFunc: function(ctx) {
          ctx.beginPath();
          ctx.moveTo(182.0, 134.0);
          ctx.lineTo(153.0, 134.0);
          ctx.lineTo(153.0, 154.0);
          ctx.lineTo(182.0, 154.0);
          ctx.closePath();
          ctx.fillStrokeShape(this);
        }
      },
      {
        name: "Kids' Bedroom",
        id: "kids--bedroom",
        floor: 1,
        roomBoundaries: 1,
        visited: isVisited(this.name),
        clicktag: "http://www.hgtv.com/design/hgtv-dream-home/2015/articles/kids--bedroom-from-hgtv-dream-home-2015",
        point: {x: 225.2, y: 85.2},
        drawFunc: function(ctx) {
          ctx.beginPath();
          ctx.moveTo(199.0, 94.0);
          ctx.lineTo(182.0, 94.0);
          ctx.lineTo(182.0, 127.0);
          ctx.lineTo(199.0, 127.0);
          ctx.lineTo(199.0, 112.0);
          ctx.lineTo(253.0, 112.0);
          ctx.lineTo(253.0, 45.0);
          ctx.lineTo(182.0, 45.0);
          ctx.lineTo(182.0, 70.0);
          ctx.lineTo(199.0, 70.0);
          ctx.lineTo(199.0, 94.0);
          ctx.closePath();
          ctx.fillStrokeShape(this);
        }
      },
      {
        name: "Kids' Bathroom",
        id: "kids--bathroom",
        floor: 1,
        roomBoundaries: 1,
        visited: isVisited(this.name),
        clicktag: "http://www.hgtv.com/design/hgtv-dream-home/2015/articles/kids--bathroom-from-hgtv-dream-home-2015",
        point: {x: 170.8, y: 118.6},
        drawFunc: function(ctx) {
          ctx.beginPath();
          ctx.moveTo(182.0, 112.0);
          ctx.lineTo(142.0, 112.0);
          ctx.lineTo(142.0, 134.0);
          ctx.lineTo(182.0, 134.0);
          ctx.closePath();
          ctx.fillStrokeShape(this);
        }
      },
      {
        name: "Garage",
        id: "garage",
        floor: 1,
        roomBoundaries: 1,
        visited: isVisited(this.name),
        clicktag: "http://www.hgtv.com/design/hgtv-dream-home/2015/articles/garage-from-hgtv-dream-home-2015",
        point: {x: 153.5, y: 69.2},
        drawFunc: function(ctx) {
          ctx.beginPath();
          ctx.moveTo(132.0, 112.0);
          ctx.lineTo(182.0, 112.1);
          ctx.lineTo(182.0, 94.0);
          ctx.lineTo(199.0, 94.0);
          ctx.lineTo(199.0, 70.0);
          ctx.lineTo(182.0, 70.0);
          ctx.lineTo(182.0, 45.0);
          ctx.lineTo(199.0, 45.0);
          ctx.lineTo(199.0, 31.0);
          ctx.lineTo(132.0, 31.0);
          ctx.lineTo(132.0, 112.0);
          ctx.closePath();
          ctx.fillStrokeShape(this);
        }
      },
      {
        name: "Back Patio",
        id: "back-patio",
        floor: 1,
        roomBoundaries: 1,
        visited: isVisited(this.name),
        clicktag: "http://www.hgtv.com/design/hgtv-dream-home/2015/articles/back-patio-from-hgtv-dream-home-2015",
        point: {x: 239.5, y: 203.3},
        drawFunc: function(ctx) {
          ctx.beginPath();
          ctx.moveTo(265.0, 295.0);
          ctx.lineTo(265.0, 252.0);
          ctx.bezierCurveTo(265.0, 252.0, 275.3, 233.5, 275.3, 202.2);
          ctx.bezierCurveTo(275.2, 175.1, 265.0, 154.0, 265.0, 154.0);
          ctx.lineTo(208.0, 154.0);
          ctx.lineTo(208.0, 252.0);
          ctx.lineTo(199.0, 252.0);
          ctx.lineTo(199.0, 295.0);
          ctx.lineTo(265.0, 295.0);
          ctx.closePath();
          ctx.fillStrokeShape(this);
        }
      },
      {
        name: "Outdoor Shower",
        id: "outdoor-shower",
        floor: 1,
        roomBoundaries: 1,
        visited: isVisited(this.name),
        clicktag: "http://www.hgtv.com/design/hgtv-dream-home/2015/articles/outdoor-shower-from-hgtv-dream-home-2015",
        point: {x: 225.8, y: 120},
        drawFunc: function(ctx) {
          ctx.beginPath();
          ctx.moveTo(216.0, 112.0);
          ctx.lineTo(216.0, 127.0);
          ctx.lineTo(237.0, 127.0);
          ctx.lineTo(237.0, 112.0);
          ctx.lineTo(216.0, 112.0);
          ctx.closePath();
          ctx.fillStrokeShape(this);
        }
      }
    ];

    //---------------------------------
    // cookie functions
    //---------------------------------
    var createCookie = function (name,value,days) {
      if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
      }
      else var expires = "";
      document.cookie = name+"="+value+expires+"; path=/";
    };

    var readCookie = function (name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    };

    var eraseCookie = function (name) {
      createCookie(name,"",-1);
    };

    //---------------------------------
    // state load
    //---------------------------------

    var cookie = readCookie('visitedRooms'),
        decompVisitedRooms = JSON.parse(cookie);

    var start = '/articles/', // where to start the slicing to get room name
      stop = '-from-hgtv-dream-home-2015', //where to stop the slicing
      pathname = document.location.pathname; 

    var selectedRoom = pathname.substring(document.location.pathname.lastIndexOf(start)+start.length, pathname.indexOf(stop));

    var selectedRoomId = selectedRoom ? getRoomById(selectedRoom) ? selectedRoom : roomData[0].id : roomData[0].id;
    var startHere = getRoomById(selectedRoom) ? false : true;

    var visitedRooms = decompVisitedRooms != null ? decompVisitedRooms : [];

    createCookie('visitedRooms', JSON.stringify(visitedRooms), 1);

    function isVisited(room) {
        return decompVisitedRooms != null ? decompVisitedRooms.indexOf(room) > -1 : false;
    }

    function setDefaultColor(room) {
      if (!startHere)
        return room == selectedRoomId ? "#B9B9BA" : isVisited(room) ? "#E6E6E6" : "#FFF";
      else 
        return isVisited(room) ? "#E6E6E6" : "#FFF";
    }

    function addRoomVisit(room) {
      if (!isVisited(room))
        visitedRooms.push(room);
      createCookie('visitedRooms', JSON.stringify(visitedRooms), 1);
    }

    var tip = $('#tip'),
        start = $('#start'),
        floorBtnDown = $('#floor-down'),
        floorBtnUp = $('#floor-up'),
        floorBtnFirst = $('#floor-1'),
        floorBtnSecond = $('#floor-2');
        //floorBtnThird = $('#floor-3');

    var stage = new Kinetic.Stage({
      container: 'floorplanContainer',
      width: 322,
      height: 455
    });

    var currentRoomText = new Kinetic.Text({
      x: 0,
      y: 420,
      //fontFamily: 'Arial',
      fontSize: 11,
      fill: '#888' 
    });

    var currentRoomName = new Kinetic.Text({
      x: 0,
      y: 418,
      //fontFamily: 'Arial',
      fontSize: 15,
      fontStyle: 'bold',
      fill: '#444' 
    });
    
    var floorPlanLayer = new Kinetic.Layer();
    var overlayLayer = new Kinetic.Layer();
    var firstFloorGroup = new Kinetic.Group();
    var secondFloorGroup = new Kinetic.Group();
    var locationPointGroup = new Kinetic.Group();     

    var firstFloorRooms = new Kinetic.Group();
    var firstFloorWalls = new Kinetic.Group();
    var secondFloorRooms = new Kinetic.Group();
    var secondFloorWalls = new Kinetic.Group();

    var firstFloorWallsImage;
    //var secondFloorWallsImage;

    //---------------------------------
    // room object creation
    //---------------------------------

    for (var i = roomData.length - 1; i >= 0; i--) {
      rooms.push({
          name: roomData[i].name,
          id: roomData[i].id,
          floor: roomData[i].floor,
          clicktag: roomData[i].clicktag,
          shape: new Kinetic.Shape({
            drawFunc: roomData[i].drawFunc,
            fill: setDefaultColor(roomData[i].id),
            name: roomData[i].name,
            id: i,
            opacity: roomData[i].roomBoundaries
          })
        });
    };
        
    for (var i = rooms.length - 1; i >= 0; i--) {

      rooms[i].shape.on('mouseover', function() {
        tip.show().text(this.getAttr('name'));
        if (roomData[this.getAttr('id')].id != selectedRoomId || startHere)
          this.setFill('#BADBE5');
        floorPlanLayer.draw();
        document.body.style.cursor = 'pointer';
        start.removeClass('display'); 
      });

      rooms[i].shape.on('click touchend', function (e) {
          if (e.button != 2) {
              addRoomVisit(roomData[this.getAttr('id')].id);
              var s = s || {};
              if (s.tl != null) {
                  s.events = "event47";
                  s.eVar46 = tentpoleId;
                  s.eVar47 = tentpoleId + ":Select New Space-RR Floor Plan";
                  s.eVar48 = tentpoleId + ":Tour:Select New Space-RR Floor Plan:" + getRoomById(selectedRoomId).name + " to " + this.getAttr('name');
                  s.tl();
              }
              window.location.href = roomData[this.getAttr('id')].clicktag;
          }
      });

      rooms[i].shape.on('mouseout', function() {
        tip.hide();
        this.setFill(setDefaultColor(roomData[this.getAttr('id')].id));
        floorPlanLayer.draw();
        document.body.style.cursor = 'default';
        if (startHere) {
          start.addClass('display');
        }
      });
      if (rooms[i].floor == 1)
        firstFloorRooms.add(rooms[i].shape);
      else
        secondFloorRooms.add(rooms[i].shape);

    }
    
    $('#floorplanContainer').on('mousemove', function(e) {
      appOffset = $('#app').offset();
      var mousex = e.pageX - (tip.width() / 1.5) - appOffset.left;
      var mousey = e.pageY - 33 - appOffset.top;
      var tipWidth = tip.width();
      var tipHeight = tip.height();
      
      var tipVisX = $('#floorplanContainer').width() - (mousex + tipWidth);
      var tipVisY = $('#floorplanContainer').height() - (mousey + tipHeight);
      if (tipVisX < 20) {
          mousex = e.pageX - tipWidth;
      } if (tipVisY < 20) {
          mousey = e.pageY - tipHeight - 20;
      }

      tip.css({ top: mousey, left: mousex });
    });

    $('#mobileCurtain').on('click tap', function (e) {
        var pos = { x: e.offsetX, y: e.offsetY };
        var shape = stage.getIntersection(pos);
        shape.fire('click');
    });

    function getRoomById(id) {
      if (id != null) {
        var pos = roomData.map(function(e) { return e.id; }).indexOf(id);
        return roomData[pos];
      }
      
      return false;
    }

    function writeMessage(message) {
      currentRoomName.setText(message);
      currentRoomText.setText("CURRENT SPACE: ");
      currentRoomText.offsetX(-(stage.getWidth() - currentRoomText.getWidth() - currentRoomName.getWidth()) / 2);
      currentRoomName.offsetX(-currentRoomText.getWidth() - (stage.getWidth() - currentRoomText.getWidth() - currentRoomName.getWidth()) / 2);
      floorPlanLayer.draw();
    }

    currentRoomText.offsetX(-(stage.getWidth() - currentRoomText.getWidth()) / 2);

    function loadImages(sources, callback) {
      var assetDir = '';
      var images = {};
      var loadedImages = 0;
      var numImages = 0;
      for(var src in sources) {
        numImages++;
      }
      for(var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
          if(++loadedImages >= numImages) {
            callback(images);
          }
        };
        images[src].src = assetDir + sources[src];
      }
    }


    function buildStage(images) {
      var backgroundImage = new Kinetic.Image({
        image: images.backgroundImage,
        x: 0,
        y: 0
      });

      firstFloorWallsImage = new Kinetic.Image({
        image: images.firstFloorWallsImage,
        x: 0,
        y: 0
      });

      //secondFloorWallsImage = new Kinetic.Image({
      //  image: images.secondFloorWallsImage,
      //  x: 0,
      //  y: 0
      //});

      overlayLayer.add(firstFloorWallsImage);
      //overlayLayer.add(secondFloorWallsImage);
      floorPlanLayer.add(backgroundImage);
      floorPlanLayer.add(firstFloorRooms);
      floorPlanLayer.add(secondFloorRooms);
      overlayLayer.add(currentRoomText);
      overlayLayer.add(currentRoomName);

      stage.add(floorPlanLayer);
      stage.add(overlayLayer);

      if (getRoomById(selectedRoomId).floor == 1) {
        secondFloorRooms.hide();
        //secondFloorWallsImage.hide();
        floorBtnDown.removeClass('active').prop({disabled:true});
        floorBtnFirst.removeClass('active').prop({disabled:true});
      }
      else {
        firstFloorRooms.hide();
        firstFloorWallsImage.hide();
        floorBtnUp.removeClass('active').prop({disabled:true});
        floorBtnSecond.removeClass('active').prop({disabled:true});
      }

      overlayLayer.listening(false);

      floorPlanLayer.draw();
      overlayLayer.draw();

      function toggleButtons(floor) {
          floorBtnDown.toggleClass('active').prop({disabled:true});
          floorBtnUp.toggleClass('active').prop({disabled:true});
          floorBtnFirst.toggleClass('active').prop({disabled:true});
          floorBtnSecond.toggleClass('active').prop({disabled:true});
          $('.active').prop({disabled:false});

          if (startHere) {
            if (floor == 1)
              start.show().css('display', '');
            else
              start.hide();
          }
      }

      floorBtnDown.on('click', function() {
        if ($(this).hasClass('active')) {
          if (getRoomById(selectedRoomId).floor == 1) {
            locationPointGroup.show();
          } else {
            locationPointGroup.hide();
          }
          secondFloorRooms.hide();
          //secondFloorWallsImage.hide();
          firstFloorRooms.show();
          firstFloorWallsImage.show();
          floorPlanLayer.draw();
          overlayLayer.draw();
          toggleButtons(1);
        }
      });

      floorBtnUp.on('click', function() {
        if ($(this).hasClass('active')) {
          if (getRoomById(selectedRoomId).floor == 1) {
            locationPointGroup.hide();
          } else {
            locationPointGroup.show();
          }
          firstFloorRooms.hide();
          firstFloorWallsImage.hide();
          secondFloorRooms.show();
          //secondFloorWallsImage.show();
          floorPlanLayer.draw();
          overlayLayer.draw();
          toggleButtons(2);
        }
      });

      floorBtnFirst.on('click', function () {
        if ($(this).hasClass('active')) {
          if (getRoomById(selectedRoomId).floor == 1) {
            locationPointGroup.show();
          } else {
            locationPointGroup.hide();
          }
          secondFloorRooms.hide();
          //secondFloorWallsImage.hide();
          firstFloorRooms.show();
          firstFloorWallsImage.show();
          floorPlanLayer.draw();
          overlayLayer.draw();
          toggleButtons(1);
        }
      });

      floorBtnSecond.on('click', function () {
        if ($(this).hasClass('active')) {
          if (getRoomById(selectedRoomId).floor == 1) {
            locationPointGroup.hide();
          } else {
            locationPointGroup.show();
          }
          firstFloorRooms.hide();
          firstFloorWallsImage.hide();
          secondFloorRooms.show();
          //secondFloorWallsImage.show();
          floorPlanLayer.draw();
          overlayLayer.draw();
          toggleButtons(2);
        }
      });

    }

    var sources = {
      firstFloorWallsImage: 'http://images.hgtv.com/webhgtv/hg20/pkgs/2015/dream-home/first-floor.png',
      //secondFloorWallsImage: 'http://frontend.scrippsnetworks.com/~bfoster/HSP/1732/second-floor.png',
      backgroundImage: 'http://images.hgtv.com/webhgtv/hg20/pkgs/2015/dream-home/background-white.png'
    };

    loadImages(sources, buildStage);

    var room = getRoomById(selectedRoomId),
        roomX = room.point.x,
        roomY = room.point.y;

    if (startHere) {
      start.css({ top: roomY + 10, left: roomX - (start.outerWidth() / 2) }).addClass('display');
    } 
    else {
      writeMessage(room.name);

      var locationPoint = new Kinetic.Circle({
        x: roomX,
        y: roomY,
        radius: 6.5,
        fill: '#333'
      });

      var radar1 = new Kinetic.Circle({
        x: roomX,
        y: roomY,
        radius: 4,
        stroke: '#333',
        strokeWidth: 1
      });

      var radar2 = new Kinetic.Circle({
        x: roomX,
        y: roomY,
        radius: 4,
        stroke: '#333',
        strokeWidth: 1
      });

      var radar3 = new Kinetic.Circle({
        x: roomX,
        y: roomY,
        radius: 4,
        stroke: '#333',
        strokeWidth: 1
      });

      locationPointGroup.add(radar1);
      locationPointGroup.add(radar2);
      locationPointGroup.add(radar3);
      locationPointGroup.add(locationPoint);
      overlayLayer.add(locationPointGroup);

      var pointTween1 = new Kinetic.Tween({
        node: locationPoint, 
        duration: .8,
        scaleX: 1.6,
        scaleY: 1.6,
        onFinish: function() {
          var pointTween2 = new Kinetic.Tween({
            node: locationPoint, 
            duration: .5,
            scaleX: 1,
            scaleY: 1,
            onFinish: function() {
              setTimeout(function() {
                  pointTween2.reset();
                pointTween1.play();
              }, 3000);
            }
          });
          this.reset();
          pointTween2.play();
          setTimeout(function() {
            radar1Tween.play();
            radar2Tween.play();
          }, 100);
          setTimeout(function() {
            radar3Tween.play();
          }, 200);
        }
      });

      var radar1Tween = new Kinetic.Tween({
        node: radar1, 
        duration: .9,
        radius: 48,
        opacity: 0.05,
        easing: Kinetic.Easings['EaseOut'],
        onFinish: function() {
          this.reset();
        }
      });
      var radar2Tween = new Kinetic.Tween({
        node: radar2, 
        duration: 1.8,
        radius: 48,
        opacity: 0.05,
        easing: Kinetic.Easings['EaseOut'],
        onFinish: function() {
          this.reset();
        }
      });
      var radar3Tween = new Kinetic.Tween({
        node: radar3, 
        duration: 3.4,
        radius: 48,
        opacity: 0.05,
        easing: Kinetic.Easings['EaseOut'],
        onFinish: function() {
          playTweens();
          this.reset();
        }
      });

      function playTweens() {
        pointTween1.play();
      }

      pointTween1.play();
    }

    return {
      createCookie: createCookie,
      readCookie: readCookie,
      eraseCookie: eraseCookie
    }
  }();

})(jQuery);

  });
  requirejs.config.waitSeconds = originalWait; //put things back as they were.
})( jQuery );