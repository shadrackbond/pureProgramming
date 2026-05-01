//tokenizing is also known as lexing, and the tokens are also known as lexemes
//tokenizing is the process of breaking a stream of text into meaningful units called tokens
//tokens are the basic building blocks of a programming language, and they can be keywords, identifiers, literals, operators, etc.

export const END = Symbol('END');

export class TextTokenizer {
    #tokenTypes;

    constructor(tokenTypes) {
        this.#tokenTypes = tokenTypes;
    }

    *tokenize(text){
        let index = 0;
        while(index<text.length){
            let hasMatched = false;

            for(const {matcher,type,valueExtractor} of this.#tokenTypes){
                const currentMatcher = new RegExp(matcher.source,"y");
                currentMatcher.lastIndex = index;
                const matched = currentMatcher.exec(text);

                if(matched !== null){
                    index += matched[0].length;
                    if(type !== null){
                        const token = {type,index};
                        if(valueExtractor){
                            token.value = valueExtractor(matched[0]);
                        }
                        yield token;
                    }
                    hasMatchED = true;
                }
            }
            if(!hasMatched){
                throw new Error(`Unexpected token at index ${index}`);
            }
        }
        yield {type: END};
    }
}