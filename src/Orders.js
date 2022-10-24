import React, { useState, useEffect } from 'react'
import {db} from './firebase'
import './Orders.css'
import { useStateValue } from './StateProvider'
import Order from './Order.js'


function Orders() {
    const [{basket, user}, dispatch] = useStateValue()
    const [orders, setOrders] = useState([])
    
    useEffect(() => { 
        if(user){
        //console.log('this is the user from orders')
        //console.log(user)
        db.collection('users')
        .doc(user.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
        }
        else{
            setOrders([])
        }
        
        //console.log('orders below')
        //console.log(orders)
    }, [user])

    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            <div className='orders__order'>
            {!orders ? '' : orders.map(order => (
                    <Order order={order}/>
                ))}
            </div>
        </div>
    )
}

export default Orders