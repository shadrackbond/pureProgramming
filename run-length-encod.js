//A RUN LENGTH ENCODER USING JS
// https://javascript.plainenglish.io/run-length-encoding-21241e00fcbb this is a link to what am using
//lossless data compression this runs of data stored as a single data value and count rather than as the original run
// aaabbbcd(a->a->a->b) --> 3a
/*
1. Iterate over the string as a whole
2. Check the next value against the current value --> to detect the start of a run
3. If a run is encountered you begin iteration which catalogs the run and also adda the corresponding number
4. what if a run exceeds 9.
*/

function runLengthEncoding(string){
  //intialise an empty string, count variable and the iteration(for loop)
  let result = "";
  let count = 1;
  for(let i = 0; i <string.length;i++){
    //iteration logic
    let j = i + 1;
    while(string[i] === string[j]){
      count ++;
      if(count === 9){
          j++;
          break;
      }else{
          j++;
      }
    }
    
    result += count + string[i] // 3a
    count = 1
    i = j-1
  }
  return result
}

console.log(runLengthEncoding("aaaaaaaabbbbbbbbcccccd"))

//second implementation

function runLengthEncoding2(string){
  let result = "";
  let count = 1;

  for(let i = 1; i<=string.length;i++){
    const currentChar = string [i];
    const previousChar = string [i-1];

    if(currentChar !== previousChar || count === 9){
      result += count + previousChar;
      count = 1;
    } else {
      count ++;
    }
  }
  return result
}

const encodedString = runLengthEncoding2("aaaaaaaaaaaaaaaabbbbbbbbcccccd");
console.log(encodedString)

// decoding the encoded string
function runLengthDecoding(encodedString){
  let result = "";
  for(let i = 0; i < encodedString.length; i+=2){ // we are iterating through the encoded string with a step of 2 because we are looking at pairs of count and character
    const count = parseInt(encodedString[i]);// we are parsing the count from the encoded string, which is a string representation of a number, into an actual number using parseInt
    const char = encodedString[i+1];// we are getting the character from the encoded string, which is the next character after the count
    result += char.repeat(count);// we are using the repeat method to repeat the character count times and adding it to the result string
  }
  return result;
}

console.log(runLengthDecoding(encodedString))