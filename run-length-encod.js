// there  are two ways of doing run length encoding
// 1. using a loop and counting the number of consecutive characters
// 2. using regular expressions to match consecutive characters --> this method is more efficient and concise and shorter and production ready

// method 1
const encodeRegex = (str) => {
  return str.replace(/(.)\1*/g, (match, char) => match.length + char);
};

// Matches digits followed by a non-digit character
const decodeRegex = (str) => {
  return str.replace(/(\d+)(\D)/g, (_, count, char) => char.repeat(count));
};


// Method 2 -- iterative approach without regex
const decode = (str) => {
  let decoded = "";
  let count = "";

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    // Check if the character is a digit (the count)
    if (!isNaN(parseInt(char))) {
      count += char;
    } else {
      // Once we hit a letter, repeat it by the accumulated count
      decoded += char.repeat(parseInt(count) || 1);
      count = ""; // Reset count string
    }
  }
  return decoded;
};

// Usage
const original = "AAAABBBCCDAA";
const encoded = encode(original); // "4A3B2C1D2A"
console.log(decode(encoded));    // "AAAABBBCCDAA"
