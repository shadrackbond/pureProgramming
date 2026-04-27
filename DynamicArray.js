// BUilding a dynamic array in JavaScript from scratch
// resources: https://alexweblab.com/articles/building-an-array-in-javascript-from-scratch
// step 1: create a class for the dynamic array
//this class will have two properties length and data

class DynamicArray {
    constructor(){
        this.length = 0; //tracks the number of elements
        this.data = {}; // an object to store the elements
    }
    //step 2 : Adding a push method --> adds an element at the next available index
    push(item){
        this.data[this.length] = item;
        this.length++;
        return this.length;
        //for example if we push 5, the data object will look like this {0: 5} and length will be 1
    }
    //step 3: Adding a get method --> retrieves an element at a specific index
    get(index){
        return this.data[index];
        // for example if we call get(0) after pushing 5, it will return 5
    }
    //step 4: Adding a pop method --> removes the last element and returns it
    pop(){
        if(this.length === 0) return undefined; // if the array is empty, return undefined
        const lastItem = this.data[this.length - 1]; // get the last item
        delete this.data[this.length - 1]; // remove the last item from the data object
        this.length--; //decrease the length by 1
        return lastItem; // return the removed item
        // for example if we call pop() after pushing 5, it will return 5 and the data object will be empty again
    }
    //step 5: removing an element by index --> deleting an element and shifting the reminders
    delete(index){
        const item = this.data[index]
        this._shiftItems(index);
        return item;
    }

    _shiftItems(index){
        for (let i = index; i <this.length-1; i++){// loop through the items starting from the index to the end of the array
            this.data[i] = this.data[i+1]; // shift the next item to the current index
        }
        delete this.data[this.length - 1]; // delete the last item
        this.length--; // decrease the length by 1
    }

    // step 6: Adding a method to insert an element at a specific index
    insert(index, item){
        if (index >= this.length) {
            return this.push(item); // if the index is greater than or equal to the length, push the item to the end of the array
        }
        for (let i = this.length; i > index; i--){ // loop through the items starting from the end of the array to the index
            this.data[i] = this.data[i-1]; // shift the previous item to the current index
        }
        this.data[index] = item; // insert the new item at the specified index
        this.length++; // increase the length by 1
    }
    //step 7: add/remove elements at the beginning of the array
    shift(){
        if(this.length === 0) return undefined; // if the array is empty, return undefined
        const firstItem = this.data[0]; // get the first item
        this._shiftItems(0); // shift all items to the left starting from index 0
        return firstItem; // return the removed item
    }
    unshift(item){
        for(let i = this.length ; i>0; i--){ // loop through the items starting from the end of the array to the beginning
            this.data[1] = this.data[i-1]// shift the previous item to the current index
        }
        this.data[0] = item; // insert the new item at the beginning of the array
        this.length++; // increase the length by 1
        return this.length; // return the new length of the array
    }
    //step 8: Implementing splice method --> removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
    splice(index,deleteCount, ...items){
        for(let i = index; i<index + deleteCount;i++){ // loop through the items starting from the index to the index + deleteCount
            delete this.data[i]; // delete the item at the current index
        }

        // shift the remaining items to the left starting from index
        if(items.length > 0){
            for(let i = this.length - 1; i >= index; i--){ // loop through the items starting from the end of the array to the index
                this.data[i + items.length] = this.data[i]; // shift the previous item to the current index + items.length
            }

            // insert the new items at the specified index
            items.forEach((item, i) => {
                this.data[index + i] = item;
            });
            this.length += items.length - deleteCount; // update the length of the array
        }

        this.length -= deleteCount; // decrease the length by the number of deleted items
    }
}