/** 
 1) Design a pseudo-code recursive method, findMax(L), that returns the maximum
number in the list L. [You can regular array index approach, not necessary to use
Sequence ADT ].

Input array [4 2 8 9 1 ] – Return 9 as output, which is max number.


function findMax(L, i = 0) {

  if (i >= L.length) {
    return false;
  }
 
  if (i === L.length - 1) {
    return L[i];
  }
  let current = L[i];
  let max = findMax(L, i + 1);
  if current > max 
    return current
  else
    return max
}


2. Write a pseudo code function, sum(n), to recursively sum the first n natural numbers
but divide the problem in half and make two recursive calls. [ Refer Decrease and
Conquer Approach] – Example: Multiple Recursion.

function sum(n)
  if n == 0 then
    return 0
  else
    let m = floor(n / 2)
    return sum(m) + sum(n - m)




3) Write a pseudo code function, isEven(n) to recursively determine whether a natural
number, n, is an even number.

function isEven(n)
  
  if n == 0 then
    return true
  else if n == 1 then
    return false
  
  else
    
    return isEven(n - 2)
    let n = 10

    function semIsAGenius(n){

        if(n <= 1)
            return false
        else if(n % 2 == 0){
            console.log(`${n} is an even number`)
            semIsAGenius(n-1)
        }
        else
            semIsAGenius(n-1)
    }

    semIsAGenius(n)


4) Write a recursive pseudo code function, power(x, k), that computes x^k
Can you do this in log k time?

function power(x, k)
    if k == 0 then
        return 1
    let half = floor(k / 2)
    let result = power(x, half)
    if k % 2 == 0 then
        return result * result
    else
        return result * result * x


function SemIspowerful(x, k){

    if(x===0)
        return 1

    else if (k==1)
        return x

    else
    return x*SemIspowerful(x,k-1)

    }

    console.log(SemIspowerful(2,3))
**/

// sem = [4,2,8,9,1]
// let n = -1
// let max = 0
// function findMax(sem){


//     if(sem.length == 0)
//         return false
//     else if(sem.length == 1)
//         return sem[0]
//     else{

//         if((n) > sem.length){
//             if(sem[n] > max)
//              max = sem[n]
//         else
//             return max
//         }

//        return 1 + findMax(sem)

//     }


// }



// console.log(findMax(sem,max))
let ja = [1,2,3,4]
// function subset(arr){

//     for(let i = arr.length; i > -1; i--){
//         if(i == arr.length)
//             console.log(`[]`)
//         else{
//             let newArr = []
//             for(let j = i; j < arr.length; j++){
//                 newArr.push(arr[j])
//             console.log(`inner ${newArr}`)}
//     }
// }


// }
//     let a = help(arr, arr.length)
//     return a 
// }

// function help(arr, i){

//     if(i === arr.length){
//         console.log(`[]`)
//         help(arr, i-1)
//     }
//     if(i > 0)
//         return false
//     let j = i
//     if(j >  )

//     console.log(arr[i])
// }


//subset(ja)

// const inputArray = [1, 2];

// function subsets(arr) {
//     const result = [];
//     const subset = [];
 
//     function innerSub(i) {
//         if (i >= arr.length) {
//             result.push([...subset]);
//             return;
//         }
//         subset.push(arr[i]);
//         innerSub(i + 1);
 
//         subset.pop();
//         innerSub(i + 1);
//     }
  
//     innerSub(0);
//     return result;
// }
 


// const resultSubsets = subsets(inputArray);
// console.log(resultSubsets);

let ob= {1:"mike", 2:"yitbarek"}

console.log(ob[1])