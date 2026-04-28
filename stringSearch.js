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

    while (s < sub.length && (sub.length - s) <= (master.length - m)) {
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

    for (let p = 2; p < L; p++) {
        let q = align[p - 1];

        while (q >= 0 && string[q] !== string[p - 1]) {
            q = align[q];
        }

        align[p] = q + 1;
    }

    return align;
}

const master = "ababcababcabc";
const sub = "abc";
const align = buildAlign(sub);
console.log(findSubstring(master, sub, align)); // Output: 2