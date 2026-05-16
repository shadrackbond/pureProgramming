//Implementing array rotation and reversal 
//Time complexity: O(n)
//Space complexity: O(1)
//why it matters: indexing fluency and in-place transformation 
/* 
- rotate left by k
- rotate righ by k
-reverse subarray in place
*/

//Array rotation is shiffting of elements of the array in a specified direction with a rotation factor. Example:
// [1,2,3,4,5] --> {rotate by a factor of one} --> [2,3,4,5,1]
//idealy there are many ways in which we can do this:
//1. having a temporary array to store the values then replace them in the actual array -->  [1,2,3,4,5,6] -->{factor of 2} --> counts index upto 2 then the reminder is put in the new array and the sliced up bit is pushed to it
//2. remove the sliced part then add it to the array as it will be stored in a temporary variable
//3. Reversal algorithm
// - reverse d elements --> d is rotation factor
// - reverse n-d elements
// - finally reverse n elements

function reverseArray(samparr,begin,end){
    while(begin<end){
        temp = samparr[begin];
        samparr[begin] = samparr[end];
        samparr[end] = temp;
        begin = begin + 1;
        end = end -1;
    }
}

function rotateArray(samparr,d,n){
    if(d==0){
        return;
    }
    reverseArray(samparr,0,d-1);
    reverseArray(samparr,0,n-1);
    reverseArray(samparr,d,n-1);
    
}

function display(samparr,n){
    for(let i = 0;i<n;i++){
        console.log(samparr[i])
    }
}

let array1 = [1,2,3,4,5,6,7,8,9,10];
let n = array1.length;
let d = 4;
rotateArray(array1,d,n);
display(array1,n);