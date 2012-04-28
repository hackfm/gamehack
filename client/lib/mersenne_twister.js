// MersenneTwister
//
// This is a javascript transcription of the pseudo code on
// http://en.wikipedia.org/wiki/Mersenne_twister

var MersenneTwister = function()
{
};

MersenneTwister.prototype.seed = function(seed)
{
    var carry = seed;
    var mt = [seed];

    for (var i=1; i<624; ++i)
    {
        carry = 0xffffffff & (1812433253 * (carry ^ ((mt[i-1])>>30)) + i);
        mt.push(carry);
    }

    this._mt = mt;
    this._index = 0;
};

// Extract a tempered pseudorandom number based on the index-th value,
// calling generate_numbers() every 624 numbers
MersenneTwister.prototype.extract_number = function() {
    if (this._index == 0)
    {
        this.generate_numbers();
    }

    var mt = this._mt;

    var y = mt[this._index];

    y = y ^ (y >> 11);
    y = y ^ ((y>>7) & (2636928640)); // 0x9d2c5680
    y = y ^ ((y<<15) & (4022730752)); // 0xefc60000
    y = y ^ (y>>18);

    this._index = (this._index + 1) % 624;

    return y;
};

// Generate an array of 624 untempered numbers
MersenneTwister.prototype.generate_numbers = function() {
    var mt = this._mt;

    for (var i=0; i<624; ++i)
    {
        var y = (mt[i] & 0x80000000) + (mt[(i+1) % 624])&0x7fffffff;
        mt[i] = mt[(i + 397) % 624] ^ (y>>1);
        if (y & 1)
        { // y is odd
        mt[i] = mt[i] ^ (2567483615); // 0x9908b0df
        }
    }
};

if ((typeof(module) != "undefined"))
{
    module.exports=MersenneTwister;
}
