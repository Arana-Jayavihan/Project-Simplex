import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInitdata } from '../../actions'
import { CatWidget } from '../../componants/catWidget'
import Slider from '../../componants/ImageSlider/slider'
import { Layout } from '../../componants/layout'
import { homeProducts } from '../../componants/RenderProducts'
import SyncLoader from 'react-spinners/SyncLoader'
import { useRef } from 'react'
import { useState } from 'react'

/**
* @author
* @function HomePage
**/

export const HomePage = (props) => {

	const end = useRef()
	const dispatch = useDispatch()
	// useEffect(() => {
	// 	dispatch(getInitdata())
	// }, []);

	const loading = useSelector(state => state.initData.loading)
	const initData = useSelector(state => state.initData)

	const featuredArray = initData.products.filter(product => product.featured === true)
	const newArray = initData.products.filter(product => product.new === true)
	const saleArray = initData.products.filter(product => product.discount > 0)

	return (
		<div>
			<Layout>
				<Slider />
				<CatWidget />
				{
					loading ?
						<div>
							<h4 style={{ textAlign: 'center' }}>Loading, please wait...</h4>
							<div style={{ display: "flex", justifyContent: "center" }} ref={end}>

								<SyncLoader
									color="#000000"
									speedMultiplier={1}
									style={{ margin: '3%', position: 'relative' }}
								/>
							</div>
						</div>
						:
						<>
							<div style={{ margin: "auto 2%", marginTop: "1%", marginBottom: "2em" }}>
								{
									homeProducts(saleArray.slice(0, 10), "Sale Items")
								}
							</div>
							<div style={{ margin: "auto 2%", marginTop: "1%", marginBottom: "2em" }}>
								{
									homeProducts(newArray.slice(0, 10), "New Arraivals")
								}
							</div>
							<div style={{ margin: "auto 2%", marginTop: "1%", marginBottom: "2em" }}>
								{
									homeProducts(featuredArray.slice(0, 10), "Featured Items")
								}
							</div>
						</>
				}
			</Layout>
		</div>
	)

}