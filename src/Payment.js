import React, { useState, useEffect} from 'react'
import CheckoutProduct from './CheckoutProduct'
import './Payment.css'
import { useStateValue} from './StateProvider'
import {Link, useNavigate} from 'react-router-dom'
import { getBasketTotal } from './reducer'
import CurrencyFormat from "react-currency-format"
import { CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import axios from './axios'
import {db} from './firebase'

function Payment() {
    const [{basket, user}, dispatch] = useStateValue()

    const navigate = useNavigate()

    const stripe = useStripe()
    const elements = useElements()

    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState("")
    const [clientSecret, setClientSecret] = useState(true)


    useEffect(() => { 
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            console.log('URL >>>>>>>>>> ', `/payments/create?total=${getBasketTotal(basket) * 100}`)
            try {
                const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
                //url: `/pay`,
                 headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "X-Requested-With",
                    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
                } 
            });
            console.log(response)
            setClientSecret(response.data.clientSecret)
            //console.log('done awaiting for post method ', clientSecret)
            } catch (error) {
                console.log(error.message)
            }
            
        }
        getClientSecret();
    }, [basket])

    console.log('the secret is >>> ', clientSecret)

    const handleSubmit = async(event) => {
        event.preventDefault()
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent}) => {
            //paymentIntent = payment confirmation
            //{user ? 'Sign Out':'Sign In'}

            db.collection('users')
            .doc(user.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            }) //nosql database

            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            navigate('/orders', {replace: true})
        })
    }

    const handleChange = event => {
        setDisabled(event.empty)
        setError(event.error ? event.error.message:'')
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (<Link to='/checkout'>{basket.length} items</Link>)
                </h1>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{!user ? '' : user.email}</p>
                        <p>213 Major Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}/>
                            ))}
                    </div>
                </div>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment__details'>
                        {/*stripe*/}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className='payment__priceContainer'>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />

                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p>:"Buy Now"}</span>
                                    </button>
                                </div>
                                {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment