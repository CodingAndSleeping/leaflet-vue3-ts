let arr = [3, 3, 2,
    90, 90, 90,
    80, 100, 80,
    80, 85, 85,
]

let map = new Map()
for (let i = 0; i < arr[0]; i++) {
    map.set(i + 1, arr[3 + i * 3] + arr[4 + i * 3] + arr[5 + i * 3])
}

let arrMap = Array.from(map);
arrMap.sort((a, b) => {
    return b[1] - a[1]
})


let result;
arrMap.forEach((item, index) => {
    // console.log(item)
    if (item[0] == arr[2]) {
        result = index + 1;
    }
})
console.log(result)


// let arr = [4, 3,
//     3, 2, 1,2]


// let res, left, right, num=0;
// for(let i = 2;i< 2+arr[0] ; i++){
//     left = arr[i];
//     arr.forEach((item, index)=>{
//         if(index!=0 && index!=1 && index !=i){
//             // console.log(item)
//             if(item * left >= arr[1]){
//                 num++;
//             }
//         }
//     })
// }

// console.log(num);