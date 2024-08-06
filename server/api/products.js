export const productPromise = () => new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve({
            products:[
                {
                    id:1,
                    name:"product",
                    price:100
                }
            ]
        })
    },4000)
})