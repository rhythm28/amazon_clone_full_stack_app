import React from 'react'
import './Home.css'
import Product from'./Product'

function Home() {
  return (
    <div className='home'>
        <div className='home__container'>
            <img 
            className='home__image'
            src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'
            alt='bleed_background'
            />

            <div className='home__row'>
                <Product 
                id = {1234}
                title="The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses"
                price={11.99}
                image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
                rating = {5}/>
                <Product 
                id={9999}
                title="Champion Pullover, Powerblend Fleece Midweight Hooded Sweatshirt"
                price={29.99}
                image="https://m.media-amazon.com/images/I/81naTg9Yn3L._AC_UX522_.jpg"
                rating = {5}/>
            </div>

            <div className='home__row'>
            <Product 
            id = {9876}
            title="Apple iPad Pro (12.9-inch, Wi-Fi, 1TB) - Space Grey (4th Generation)"
            price={1799.99}
            image="https://images-na.ssl-images-amazon.com/images/I/811aBwuSuIL._SL1500_.jpg"
            rating = {5}/>
            <Product 
            id = {5678}
            title="Skullcandy Crusher Evo Wireless Over-Ear Headphone - True Black"
            price={165}
            image="https://m.media-amazon.com/images/I/71I0lybSq+L._AC_SY355_.jpg"
            rating = {5}/>
            <Product 
            id = {6543}
            title="Premier Protein Shake 30g Protein (Pack of 12)"
            price={29.99}
            image="https://m.media-amazon.com/images/I/81ot3EQSOhL._AC_SX425_.jpg"
            rating = {4}/>
            </div>

            <div className='home__row'>
            <Product 
            id = {3456}
            title="Polk Audio CS1 Series II Center Channel Speaker | Unique Design | Stand Alone or a Complement to Monitor 40, 60, and 70 Speakers | Detachable Grille | Black"
            price={90}
            image="https://m.media-amazon.com/images/I/8161F51VyOL._AC_SX679_.jpg"
            rating = {3}/>
            </div>
        </div>
    </div>
  )
}

export default Home