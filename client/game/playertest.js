var Player = require('./player');
function assert_equal(x, y) { if (x!==y) { console.log("Assertion failed: "+x+" != "+y); }};

var Player=require('./player');
var p = new Player(function(x,y){return "def";}, 100);
p.addEvent({x:0,y:0,v:1,t:0,dx:1});

var pos;

pos = p.getPosition(0);
assert_equal(pos.x, 0);
assert_equal(pos.y, 0);

pos = p.getPosition(1);
assert_equal(pos.x, 0);
assert_equal(pos.y, 0);

pos = p.getPosition(2);
assert_equal(pos.x, 1);
assert_equal(pos.y, 1);

pos = p.getPosition(10);
assert_equal(pos.x, 7);
assert_equal(pos.y, 7);

p.addEvent({x:7,y:7,v:1,t:10,dx:0});


console.log(p.getLineSegments(0,10, 2));
console.log(p.getLineSegments(0,10, 20));

console.log(p.getXValues(-10,100,12));
