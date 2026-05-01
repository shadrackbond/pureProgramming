/*  
    this is the pseudocode for the naive string search algorithm

    Loop over the long string.
    Loop over the shorter string.
    If the characters don’t match break out from the inner loop.
    If you complete the inner loop and find a match, increment the count of matches
    Return the count
*/
function naiveSearch(longStr, shortStr) {
    let count = 0;
    for(let i = 0; i< longStr.length; i++){
        for(let j = 0; j<shortStr.length;j++){
            if(shortStr[j] !== longStr[i+j]){
                break;
            }
            if(j===pattern.length-1){
                count ++;
            }
        }
    }
    return count;
}


//using KMP algorithm
function findSubstring(master, sub, align) {
    let m = 0; // index for master
    let s = 0; // index for sub

    while (s < sub.length && (sub.length - s) <= (master.length - m)) {// while there are characters left in sub and enough characters left in master to match sub
        if (master[m] === sub[s]) {
            m++;
            s++;
        } else if (s === 0) {
            m++;
        } else {
            s = align[s];
        }
    }

    if (s === sub.length) {
        return m - sub.length;
    } else {
        return -1;
    }
}

function buildAlign(string) {
    const L = string.length;
    const align = new Array(L);

    align[0] = -1;
    if (L > 1) align[1] = 0;

    for (let p = 2; p < L; p++)// we start from the third character and build the align array based on the previous characters
        {
        let q = align[p - 1]; //the length of the previous best reusable prefix or howmany characters we can reuse
        //in this string[q] == string[p-1] we check wheather the indentified prefix can be extended by one character, if not we try to find a shorter reusable prefix by looking at align[q]
        while (q >= 0 && string[q] !== string[p - 1]) {
            q = align[q];// fall back when the current prefix character does not match the current character, we try to find a shorter reusable prefix by looking at align[q]
        }

        align[p] = q + 1;// does the current prefix character match the current character,yes.
    }

    return align;
}

const master = "ababcababcabc";
const sub = "abc";
const align = buildAlign(sub);
console.log(findSubstring(master, sub, align)); // Output: 2