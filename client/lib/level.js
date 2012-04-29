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

            var x0 = (width * x / 4)|0;
            var x1 = (width * (x+1) /4)|0;

            for (var xx=x0; xx<x1; ++xx)
            {
                for (var yy=0; yy<5; ++yy)
                {
                    field[y+yy][xx] = c;
                }
            }
        }
        
    }
    
    // obstacles
    var o = 6 + mt.extract_number() % 15;
    for (var i=0; i<o; ++i)
    {
        var w=(width*0.4) | 0;
        var x = mt.extract_number() % (width-w+1);

        var y=(((i+0.5)/o)*length) | 0;

        for (var yy=0; yy<5; ++yy)
        {
            var c = (yy==0 || yy==4) ? "X":"O";
            for (var xx=w; xx<width; ++xx)
            {
               field[y+yy][(x+xx)%width] = c;
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
