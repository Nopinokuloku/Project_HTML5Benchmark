/*
 * opt
 * - nb : number of bubbles
 * - dom
 */
function bubble(opt){
  var width = 960,
    height = 500;

  var n = opt.nb,
      m = 12,
      degrees = 180 / Math.PI;

  var bubbles = d3.range(n).map(function() {
    var x = Math.random() * width,
        y = Math.random() * height;
    return {
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
      path: d3.range(m).map(function() { return [x, y]; }),
      count: 0
    };
  });

  var svg = d3.select('#'+opt.dom).append("svg")
      .attr("width", width)
      .attr("height", height);

  var g = svg.selectAll("g")
      .data(bubbles)
    .enter().append("g");

  var head = g.append("ellipse")
      .attr("rx", opt.size)
      .attr("ry", opt.size)
      .attr("style",'fill:rgba('+randomGen('num',255)+','+randomGen('num',255)+','+randomGen('num',255)+','+randomGen('num',1)+')');

  d3.timer(function() {
    for (var i = -1; ++i < n;) {
      var bubble = bubbles[i],
          path = bubble.path,
          dx = bubble.vx,
          dy = bubble.vy,
          x = path[0][0] += dx,
          y = path[0][1] += dy,
          speed = Math.sqrt(dx * dx + dy * dy),
          count = speed * 10,
          k1 = -5 - speed / 3;

      // Bounce off the walls.
      if (x < 0 || x > width) bubble.vx *= -1;
      if (y < 0 || y > height) bubble.vy *= -1;

      // Swim!
      for (var j = 0; ++j < m;) {
        var vx = x - path[j][0],
            vy = y - path[j][1],
            k2 = Math.sin(((bubble.count += count) + j * 3) / 300) / speed;
        path[j][0] = (x += dx / speed * k1) - dy * k2;
        path[j][1] = (y += dy / speed * k1) + dx * k2;
        speed = Math.sqrt((dx = vx) * dx + (dy = vy) * dy);
      }
    }

    head.attr("transform", headTransform);
  });

  function headTransform(d) {
    return "translate(" + d.path[0] + ")rotate(" + Math.atan2(d.vy, d.vx) * degrees + ")";
  }

  function tailPath(d) {
    return "M" + d.join("L");
  }

}