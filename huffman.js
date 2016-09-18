codes = {};
var frequency = function(str)
{
	var freq = {}
	for( ch in str)
        {
                if(freq[str[ch]] == undefined){
                        freq[str[ch]] = 1;}
                else{
                        freq[str[ch]]++;}       
        }
        return(freq)
}
var sortFreq = function(freq)
{
	tuples = []
	for( key in freq)
	{
		tuples.push(Array(freq[key],key))
	}
        return tuples.sort()

}

var buildTree = function(tuples)
{
	while(tuples.length > 1)
        {
                var leastTwo = tuples.slice(0,2);
                var theRest = tuples.slice(2,tuples.length);
                var combFreq = leastTwo[0][0] + leastTwo[1][0];
                tuples = theRest;
                tuples.push(Array(combFreq, leastTwo));
                tuples.sort();
        }
        return tuples[0];
}

var trimTree = function(tree)
{
        var t = tree[1]
        if(typeof t == 'string')
	{
		return t;
	}
        else
        	return Array(trimTree(t[0]), trimTree(t[1]))

}

var assignCodes = function(node, pat)
{
	if(typeof node == 'string')
	{
		codes[node] = pat;
	}
	else
	{
        	assignCodes(node[0],pat+"0");
        	assignCodes(node[1],pat+"1");
        }
      return codes;        
}
var encode = function(str)
{
	var output ='';
	for(ch in str)
	{
		output = output + codes[str[ch]];
	}
	return output;
}
var decode = function(tree, code)
{
	var str = ''
	var t = tree;
	for(bit in code)
	{
        	if(code[bit] == '0')
		{
			t = t[0];
       		}
        else
	{
		t = t[1];
        }
        if(typeof t == 'string')
	{
        	str = str + t;
        	t = tree;
        }
	}
	return str;
}

var freqs=frequency("aaabccdeeeeeffg");
var tuples=sortFreq(freqs);
var tree = buildTree(tuples);
var tree = trimTree(tree);
assignCodes(tree, '');
var small = encode("aaabccdeeeeeffg");
var str = decode(tree,small);
console.log('text length is '+str.length)
console.log('Required '+small.length+' bytes '+(((small.length)+7)%8))
console.log(codes);
if("aaabccdeeeeeffg" == str)
{
	console.log('restored matched original');
}
