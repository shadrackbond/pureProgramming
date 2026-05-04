//tokenizing is also known as lexing, and the tokens are also known as lexemes
//tokenizing is the process of breaking a stream of text into meaningful units called tokens
//tokens are the basic building blocks of a programming language, and they can be keywords, identifiers, literals, operators, etc.

export const END = Symbol('END'); // we have an End variable that is not changeable and something of it connected to the same symbol

export class TextTokenizer { // initialising a class for tokenizing
    #tokenTypes;

    constructor(tokenTypes) {// this is a constructor that holds configuration for what tokens to look out for
        this.#tokenTypes = tokenTypes;
    }

    *tokenize(text){ // method to iterate through the text to find tokens based on rule in constructor
        let index = 0; // initialising index to 0
        /*
        we set up a while condition to check for as long as the index is less than the length of the text
        */
        while(index<text.length){
            let hasMatched = false; 
            // this is where the iteration/ looping is taking place
            for(const {matcher,type,valueExtractor} of this.#tokenTypes){
                const currentMatcher = new RegExp(matcher.source,"y");//the y flag by cloning the regexp into a new variable currentMatcher
                currentMatcher.lastIndex = index; // updating the index value to the currentMatcher last index
                const matched = currentMatcher.exec(text);//try matching the currentMatcher with the text and store the result in matched variable

                if(matched !== null){
                    index += matched[0].length;
                    if(type !== null){
                        const token = {type,index};
                        if(valueExtractor){
                            token.value = valueExtractor(matched[0]);
                        }
                        yield token;
                    }
                    hasMatched = true;
                }
            }
            if(!hasMatched){
                throw new Error(`Unexpected token at index ${index}`);
            }
        }
        yield {type: END};
    }
}