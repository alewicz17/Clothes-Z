const express = require('express')
var cors= require('cors')
const stripe= require('stripe')('sk_test_51O2bonLc31zaQaNQUPs5P2RsOOgou0eqjZY8h8KUschBfbFf0ZMWE69a6wfS46jbOL1aJgkWV9iAbPSY8IQ5ynZl00QqMfN9C8')
const app= express()
app.use(cors())
app.use(express.static("public"))
app.use(express.json())
app.post("/", async(req,res)=>{
    const products= req.body.products
    let lineItems=[]
    products.forEach((item) => {
        lineItems.push(
            {           
                price_data: { 
                    currency: 'eur',
                    product_data: { 
                      name: item.product.name,
                    },
                    unit_amount: item.product.price * 100,
                  },
                  adjustable_quantity: {
                    enabled:true,
                    minimum: 1,
                  },
                  quantity: item.quantity
            }
        )
    });
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url:  `${req.headers.origin}`,
        cancel_url: `${req.headers.origin}`,
    })
    res.send(JSON.stringify({
        url: session.url
    }))
})
app.listen(4000)