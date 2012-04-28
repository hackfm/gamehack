var velocity_factor = [
    1,
    0.7071067811865476
    ];

var Player = function(map, width, speed) {
    this.map = map;
    this.width = width;
    this.speed = speed||1;
    this.events = [];
};

Player.prototype.getLineSegments = function (y0, y1, t) {
    var events = this.events;
    var linesegments = [];

    for (var i=0; i<events.length; ++i)
    {
        var e0 = events[i];

        if (e0.t > t)
        {
            break;
        }

        var e1;
        
        if (i+1 < events.length)
        {
            e1 = events[i+1];
            if (e1.t > t)
            {
                e1 = this.getPosition(t);
            }
        }
        else
        {
            e1 = this.getPosition(t);
        }
        
        if ((e0.y<y0 && e1.y<y0)||(e0.y>y1 && e1.y>y1))
        {
            continue;
        }

        linesegments.push({ x0:e0.x, y0:e0.y,
                            x1:e1.x, y1:e1.y});
    }

    return linesegments;
}

Player.prototype.getXValues = function (y0, y1, t) {
    var linesegments = this.getLineSegments(y0, y1, t);
    var xvalues = [];

    for (var i=0; i<linesegments.length; ++i)
    {
        var seg = linesegments[i];
        var x = seg.x0;
        var dx = (seg.x1-seg.x0) / (seg.y1-seg.y0);
        
        for (var y=seg.y0; y<=seg.y1; ++y)
        {
            if (y>=y0 && y<=y1)
            {
                xvalues[y-y0] = x;
                x+=dx;
            }
        }
    }

    return xvalues;
}

Player.prototype.addEvent = function (event) {
    this.events.push(event);
}

Player.prototype.createEvent = function(t, action) {
    var event = this.getPosition(t);
    var dx = 0;
    
    if (!event.obstacle)
    {
        if (action==="left")
        {
            dx = -1;
        }
        else if (action==="right")
        {
            dx = 1;
        }
        if (event.dx !== dx)
        {
            event.dx = dx;
            event.v = Math.max(Math.min(event.v / 1.1, 1.0), 0.2);
        }
    }
    else
    {
        event.dx = 0;
        event.v = 0;
    }
    

    this.addEvent(event);
    return event;
}

Player.prototype.getPosition = function(t) {
    var idx = this.events.length - 1;

    if (idx < 0)
    {
        // We have no events at all
        return null;
    }

    for (; idx >= 0; --idx)
    {
        if (this.events[idx].t < t)
            break;
    }

    if (idx < 0)
    {
        // t is before the first event
        // Return first event, it's coordinates are what we want.
        return this.events[0];
    }

    var event = this.events[idx];

    if (!event.v)
    {
        // player is stationary
        return event;
    }

    var a = 0.003;
    var v = event.v; // current velocity
    var now = event.t;
    var x = event.x;
    var y = event.y;
    var inc = v > 0 ? 1 : -1; // direction of y-velocity
    var dx = (event.dx||0)|0;
    var vy = v * velocity_factor[Math.abs(dx)];
    var T = inc/vy/this.speed; // time needed for travelling one pixel in y-direction
    var obstacle = false;

    while(true)
    {
        var next = now + T;
        if (next > t)
        {
            break;
        }
        now = next;
        y += inc;
        x += dx;
        v = Math.min(v+2*a*T, 3.0);

        var tile = this.map(x, y);

        if (tile === "obstacle")
        {
            obstacle = true;
            break;
        }
        if (tile === "speedup")
        {
            v *= 1.1;
        }
        else if (tile === "slowdown")
        {
            v /= 1.1;
        }
        else
        {
            continue;
        }
        vy = v * velocity_factor[Math.abs(dx)];
        T = inc/vy/this.speed;
    }

    return {x:x, y:y, t:now, v:v, dx:dx, obstacle:obstacle};
}

if ((typeof(module) != "undefined"))
{
    module.exports=Player;
}
