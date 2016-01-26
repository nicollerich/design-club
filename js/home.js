  var background = {}

  background.initializr = function() {

    var $this = this;

    //option
    $this.id = "background_css3";
    $this.style = {
      bubbles_color: "#A0122B",
      stroke_width: 0,
      stroke_color: "black"
    };
    $this.bubbles_number = 70;
    $this.speed = [1500, 9000]; //milliseconds
    $this.max_bubbles_height = $this.height;
    $this.shape = false // 1 : circle | 2 : triangle | 3 : rect | false :random

    if ($("#" + $this.id).lenght > 0) {
      $("#" + $this.id).remove();
    }
    $this.object = $("<div style='z-inde:-1;margin:0;padding:0; overflow:hidden;position:absolute;bottom:0' id='" + $this.id + "'> </div>'").appendTo("#home");

    $this.ww = $(window).width()
    $this.wh = $(window).height()
    $this.width = $this.object.width($this.ww);
    $this.height = $this.object.height($this.wh);

    $("#home").prepend("<style>.shape_background {transform-origin:center; width:50px; height:50px; background: " + $this.style.bubbles_color + "; position: absolute}</style>");

    for (i = 0; i < $this.bubbles_number; i++) {
      $this.generate_bubbles()
    }

  }

  background.generate_bubbles = function() {
    var $this = this;
    var base = $("<div class='shape_background'></div>");
    var shape_type = $this.shape ? $this.shape : Math.floor($this.rn(1, 2, 3));
    if (shape_type == 1) {
      var bolla = base.css({
        borderRadius: "100%"
      })
    } else if (shape_type == 1) {
      var bolla = base.css({
        width: 50,
        height: 50,
        "border-style": "solid",
        "border-width": "10px 10px 10px 10px",
        "border-color": "transparent transparent " + $this.style.bubbles_color + " transparent",
        background: "transparent"
      });
    } else {
      var bolla = base;
    }
    var rn_size = $this.rn(.4, 1.2);
    bolla.css({
      "transform": "scale(" + rn_size + ") rotate(" + $this.rn(-360, 180) + "deg)",
      top: $this.wh + 100,
      left: $this.rn(-60, $this.ww + 60)
    });
    bolla.appendTo($this.object);
    bolla.transit({
      top: $this.rn($this.wh / 12, $this.wh / 2 - 60),
      "transform": "scale(" + rn_size + ") rotate(" + $this.rn(-360, 360) + "deg)",
      opacity: 0
    }, $this.rn($this.speed[0], $this.speed[1]), function() {
      $(this).remove();
      $this.generate_bubbles();
    })

  }

  background.rn = function(from, to, arr) {
    if (arr) {
      return Math.random() * (to - from + .5) + from;
    } else {
      return Math.floor(Math.random() * (to - from + .5) + from);
    }
  }

$(function(){
  background.initializr()
});