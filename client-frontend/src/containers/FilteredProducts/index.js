import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '../../componants/input/input';
import { renderFilteredProducts } from '../../componants/RenderProducts';
import { TbArrowsSort, TbBrandProducthunt } from 'react-icons/tb'
import { HiColorSwatch } from 'react-icons/hi'
import { MdOutlinePriceChange } from 'react-icons/md'
import './style11.css'

const FilteredProducts = ({ products, catName }) => {

    const prods = useSelector(state => state.initData.products)
    const category = useSelector(state => state.category)
    const curCat = category.curCat.slug
    const categories = category.categories

    const brands = []
    for (let product of prods) {
        if (product.brand.toLowerCase() in brands) {
            brands.push(product.brand)
        }
    }
    // filters is an array of objects
    // each object is a separate filter type with data
    // this filter data is entered by the user
    // then that data is used to filter products
    // renderFilteredproducts function uses a switch to filter products per each filter
    const [brand, setBrand] = useState('');
    const [color, setColor] = useState('');
    const [low, setLow] = useState('');
    const [high, setHigh] = useState('');
    const [order, setOrder] = useState('asc');

    const filterArray = [
        {
            type: 'brand',
            data: brand
        },
        {
            type: 'color',
            data: color
        },
        {
            type: 'price',
            low: low,
            high: high
        },
    ]

    let childCats = []
    const findChildren = (slug, catTree) => {

        for (let cat of catTree) {
            if (slug === cat.slug) {
                childCats = cat.children
                break
            }
            else {
                findChildren(slug, cat.children)
            }
        }
    }

    findChildren(curCat, categories)
    return (

        <div style={{ margin: "auto 2%", marginTop: "1%", marginBottom: "2em" }}>
            <div className='filterSection'>
                <div className='verticalFilters'>
                    <h4>Filters</h4>
                    <div style={{ marginTop: '10%' }}>
                        <h6>Order By <TbArrowsSort /> </h6>
                        <select
                            className='form-control'
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                        >
                            <option value='asc' >Price Low to High</option>
                            <option value='desc'>Price High to Low</option>
                        </select>
                    </div>
                    <div style={{ marginTop: '10%' }}>
                        <h6>Brand <TbBrandProducthunt /></h6>
                        <Input
                            type='text'
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            placeholder='Enter Brand'
                        >

                        </Input>
                    </div>

                    <div>
                        <h6>Color <HiColorSwatch /></h6>
                        <Input
                            type='text'
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            placeholder='Enter Color'
                        >

                        </Input>
                    </div>
                    <div>
                        <h6>Price LKR <MdOutlinePriceChange /></h6>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <input
                                className='form-control'
                                style={{ width: '45%' }}
                                type='text'
                                value={low}
                                onChange={(e) => setLow(e.target.value)}
                                placeholder='Above'
                            >
                            </input>
                            <input
                                className='form-control'
                                style={{ width: '45%' }}
                                type='text'
                                value={high}
                                onChange={(e) => setHigh(e.target.value)}
                                placeholder='Below'
                            >
                            </input>
                        </div>

                    </div>
                </div>
                <div>
                    {
                        renderFilteredProducts(false, filterArray, products, catName, category, order, childCats)
                    }
                </div>
            </div>

        </div>
    );
}

export default FilteredProducts;
