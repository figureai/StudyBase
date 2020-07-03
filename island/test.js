console.log('1')

setTimeout(() => {
    console.log('2')
    process.nextTick(()=>{
        console.log('3')
    })
    setTimeout(() => {
        console.log('10')
        new Promise((resolve)=>{
            console.log('11')
            resolve()
        }).then(()=>{
            console.log('12')
        })
    });
    new Promise((resolve)=>{
        console.log('4')
        resolve()
    }).then(()=>{
        console.log('5')
    })
});

process.nextTick(()=>{
    console.log('6')
})

new Promise((resolve)=>{
    console.log('7')
    resolve()
}).then(()=>{
    console.log('8')
    setTimeout(() => {
        console.log('9')   
    });
})

console.log('13')

// 1, 7, 13, 6, 8, 2, 4, 3, 5, 9, 10, 11, 12

// 1, 2, 4, 8, 3, 5,6,7