import React from 'react'
import './style2.css'

/**
* @author
* @function CatWidget
**/

export const CatWidget = (props) => {
    return (
        <div className='catbox'>
            <div className='grid-item1'>
                <div class="categories__text">
                    <h1>Women’s fashion</h1>
                    <p>Sitamet, consectetur adipiscing elit, sed do eiusmod tempor incidid-unt labore
                        edolore magna aliquapendisse ultrices gravida.</p>
                    <a href="Women">Shop now</a>
                </div>
            </div>
            <div className='grid-item2'>
                <div class="categories__text">
                    <h4>Men’s fashion</h4>
                    <p></p>
                    <a href="Men">Shop now</a>
                </div>
            </div>
            <div className='grid-item3'>
                <div class="categories__text">
                    <h4>Kid’s fashion</h4>
                    <p></p>
                    <a href="Kids-AaTJuiYY2">Shop now</a>
                </div>
            </div>
            <div className='grid-item4'>
                <div class="categories__text">
                    <h4>Personal Care</h4>
                    <p></p>
                    <a href="Personal-Care-XWOfwkW1r">Shop now</a>
                </div>
            </div>
            <div className='grid-item5'>
                <div class="categories__text">
                    <h4>Travel Gear</h4>
                    <p></p>
                    <a href="Travel-Gear-JMTdeTZ2y">Shop now</a>
                </div>
            </div>
        </div>
    )

}