import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCatBySlug, getCatPath, getInitdata, getProductBySlug } from '../../actions'
import { Layout } from '../../componants/layout'
import './style10.css'
import SyncLoader from 'react-spinners/SyncLoader'
import Slider from '../../componants/ImageSlider/slider'
import FilteredProducts from '../FilteredProducts'


/**
* @author
* @function ProductList
**/

export const ProductList = (props) => {
    let { slug } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCatPath(slug))
        dispatch(getProductBySlug(slug))
        dispatch(getCatBySlug(slug))
    }, [])

    const product = useSelector(state => state.product)
    let category = useSelector(state => state.category)
    let loading = useSelector(state => state.product.loading)

    const end = useRef(null);

    const scrollToProducts = (page) => {
        window.scrollTo({
            top: page,
            behavior: 'smooth'
        })
    }

    const parentCats = category.parentcats
    const pCats = []
    let j = parentCats.length - 1
    for (let i = 0; i < parentCats.length; i++) {
        pCats[j] = parentCats[i]
        j--
    }

    return (
        <Layout>
            {loading ?
                <div>
                    <Slider />

                    <section className='productCards'>
                        <h4 style={{ textAlign: 'center' }}>Loading, please wait...</h4>
                        <div style={{ display: "flex", justifyContent: "center" }} ref={end}>

                            <SyncLoader
                                color="#000000"
                                speedMultiplier={1}
                                style={{ margin: '3%', position: 'relative' }}
                            />
                            {scrollToProducts(500)}
                        </div>
                    </section>

                </div> :
                <div>
                    <Slider />
                    <FilteredProducts products={product.products} catName={category.curCat.name} />
                    {scrollToProducts(500)}
                </div>
            }
        </Layout>
    )

}
