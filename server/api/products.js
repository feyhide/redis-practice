export const productPromise = () => new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve({
            products:[
                {
                    id:1231235324545344332,
                    name:"product",
                    price:100
                }
            ]
        })
    },4000)
})