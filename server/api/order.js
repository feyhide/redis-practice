let order = []

export const addorder = (order_) => {
    order.push(order_)
}


export const orderPromise = () => new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve({
            order
        })
    },4000)
})