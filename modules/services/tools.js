exports.distance = function(pos1, pos2){
  var xs = pos1.x - pos2.x,
      ys = pos1.y - pos2.y;

  return Math.sqrt(xs*xs + ys*ys);
}
