// BUilding a dynamic array in JavaScript from scratch
// step 1: create a class for the dynamic array
//this class will have two properties length and data

class DynamicArray {
    constructor(){
        this.length = 0; //tracks the number of elements
        this.data = {}; // an object to store the elements
    }
    //step 2 : Adding a push method --> adds an element at the next available index
    Push(item){
        this.data[this.length] = item;
        this.length++;
        return this.length;
    }
}