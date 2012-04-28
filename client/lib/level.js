var Level = function(name, universe)
{
    try
    {
        universe = Number(universe) & 0xffffffff;
    }
    catch (e)
    {
        universe = 1000;
    }

    var mt = this.mt = new MersenneTwister();
    mt.seed(universe);

    var seed = 0;

    if (name.length)
    {
        mt.seed(name.charCodeAt(0));
        seed = mt.extract_number();

        for (var i=1; i<name.length; ++i)
        {
            seed = (seed * mt.extract_number());
            seed += (name.charCodeAt(i) * mt.extract_number());
            seed = seed & 0xffffffff;
        }
    }

    this.original_seed = seed;
}

Level.prototype.getMap = function(number, length, width)
{
    var mt = this.mt;
    mt.seed(this.original_seed + (number || 0));

    length = length || 500;
    width = width || 48;

    var line = [];
    for (var i=0; i<width; ++i)
        line.push(" ");
    var field = [];
    for (var i=0; i<length; ++i)
        field.push(line.slice());

    // speed boosts and bumps
    for (var y=0; y<length; y+=5)
    {
        for (var x=0; x<4; ++x)
        {
            var t = mt.extract_number() % 35;
            var c;
            if (t===0)
            {
                c="+";
            }
            else if (t===1)
            {
                c="-";
            }
            else
            {
                continue;
            }

            var w =(width*0.25)|0;
            var x0 = mt.extract_number() % (width-w);

            for (var xx=w; xx<width; ++xx)
            {
                for (var yy=0; yy<5; ++yy)
                {
                    field[y+yy][(xx+x0)%width] = c;
                }
            }
        }
        
    }
    
    // obstacles
    var o=6+ mt.extract_number()%24;
    for (var i=0; i<o; ++i)
    {
        var x;
        var w=(width*0.6) | 0;
        
        if (mt.extract_number() & 1)
        {
          x=0;  
        }
        else
        {
            x=width - w;
        }

        var y=(((i+0.5)/o)*length) | 0;

        for (var yy=0; yy<5; ++yy)
        {
            var c = (yy==0 || yy==4) ? "X":"O";
            for (var xx=0; xx<w; ++xx)
            {
               field[y+yy][x+xx] = c;
            }
        }
    }
    
    for (var i=0; i<length; ++i)
        field[i] = field[i].join("");

    return field;
}

if ((typeof(module) != "undefined"))
{
    MersenneTwister=require('./mersenne_twister');
    module.exports=Level;
}
