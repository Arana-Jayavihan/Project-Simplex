import React, { useEffect, useState } from 'react'
import { Layout } from '../../componants/layout'
import { Input } from '../../componants/UI/input/input'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProducts, getInitdata, publishProduct, updateProduct } from '../../actions'
import { NewModel } from '../../componants/Modal'
import './style.css'
import { Alert, FormControlLabel, FormGroup, Switch } from '@mui/material'
import { MdEdit, MdRemoveRedEye, MdDelete } from 'react-icons/md'


/**
* @author
* @function Products
**/

export const Products = (props) => {
	const [name, setProductName] = useState('')
	const [price, setPrice] = useState('')
	const [stock, setStock] = useState('')
	const [description, setDescription] = useState('')
	const [storeStock, setStoreStock] = useState('')
	const [category, setCategory] = useState('')
	const [id, setId] = useState('')
	const [brand, setBrand] = useState('')
	const [color, setColor] = useState('')
	const [discount, setDiscount] = useState('')
	const [newArrival, setNewArrival] = useState('');
	const [featured, setFeatured] = useState('');
	const [rating, setRating] = useState('');
	const [discountedPrice, setDiscountedPrice] = useState('');
	const [productPics, setPics] = useState([])
	const [updatePics, setUpdatePics] = useState([])
	const [show, setShow] = useState(false)
	const [productDetailModal, setProDetailModal] = useState(false)
	const [proDetes, setPrdDetes] = useState(null)
	const [delProdModal, setDelModal] = useState(false)
	const dispatch = useDispatch()
	const product = useSelector(state => state.product)
	const cat = useSelector(state => state.category)

	useEffect(() => {
		dispatch(getInitdata())
		
	}, [])

	const handleClose = () => {
		if (category === '') {
			<Alert severity="warning">Please Select Categoty...</Alert>
		}
		else {
			console.log(discountedPrice)
			const form = new FormData()
			form.append('name', name)
			form.append('price', price)
			form.append('description', description)
			form.append('storeStock', storeStock)
			form.append('category', category)
			form.append('_id', id)
			form.append('brand', brand)
			form.append('color', color)
			form.append('stock', stock)
			form.append('rating', rating)
			form.append('discount', discount)
			form.append('discountedPrice', discountedPrice)
			form.append('featured', featured)
			form.append('newA', newArrival)
			for (let pic of updatePics) {
				form.append('productPic', pic)
			}

			dispatch(updateProduct(form))
				.then(result => {
					if (result) {
						dispatch(getInitdata())
					}
				})
			setProductName('')
			setPrice('')
			setStock('')
			setDescription('')
			setCategory('')
			setPics([])
			setUpdatePics([])
			setId('')
			setDiscount('')
			setDiscountedPrice('')
			setStoreStock('')
			setBrand('')
			setColor('')
			setRating('')
			setNewArrival('')
			setFeatured('')
			setShow(false)
		}

	};

	const close = () => {
		setProductName('')
		setPrice('')
		setStock('')
		setDescription('')
		setCategory('')
		setPics([])
		setUpdatePics([])
		setId('')
		setBrand('')
		setColor('')
		setRating('')
		setStoreStock('')
		setDiscount('')
		setDiscountedPrice('')
		setNewArrival('')
		setFeatured('')
		setShow(false)
	}

	const handleShow = (product) => {
		console.log(product.discountedPrice)
		setShow(true)
		setProductName(product.name)
		setPrice(product.price)
		setDescription(product.description)
		setStock(product.stock)
		setPics(product.productPics)
		setStoreStock(product.storeStock)
		setId(product._id)
		setBrand(product.brand)
		setColor(product.color)
		setRating(product.rating)
		setDiscount(product.discount)
		setDiscountedPrice(product.discountedPrice)
		setFeatured(product.featured)
		setNewArrival(product.new)
	};

	const createCatOptions = (categories, options = []) => {
		for (let category of categories) {
			if (category.children.length === 0) { options.push({ value: category._id, name: category.name, parentId: category.parentId }) }
			else if (category.children.length > 0) {
				createCatOptions(category.children, options)
			}
		}
		return options
	}

	const handleProductPic = (e) => {
		setUpdatePics([
			...updatePics,
			e.target.files[0]
		])
	}

	const pubProduct = (product) => {
		if (product.published === false) {
			const published = true
			dispatch(publishProduct(product._id, published))
				.then(result => {
					if (result) {
						dispatch(getInitdata())
					}
				})
		}
		else {
			const published = false
			dispatch(publishProduct(product._id, published))
				.then(result => {
					if (result) {
						dispatch(getInitdata())
					}
				})
		}
	}

	const setNew = (cState) => {
		if (cState === false) {
			setNewArrival(true)
		}
		else {
			setNewArrival(false)
		}
	}

	const setFea = (cState) => {
		if (cState === false) {
			setFeatured(true)
		}
		else {
			setFeatured(false)
		}
	}

	const isPublished = (product) => {
		if (product.published === true) {
			return true
		}
		else {
			return false
		}
	}

	const isFeatured = (featured) => {
		if (featured === true) {
			return true
		}
		else {
			return false
		}
	}	

	const isNew = (newArr) => {
		if (newArr === true) {
			return true
		}
		else {
			return false
		}
	}

	const renderProductTable = () => {
		return (
			<Table style={{ fontSize: 14, alignItems: '' }} responsive="sm">
				<thead>
					<tr>
						<th style={{ verticalAlign: 'baseline' }}>#</th>
						<th style={{ verticalAlign: 'baseline' }}>Product Name</th>
						<th style={{ verticalAlign: 'baseline' }}>Unit Price</th>
						<th style={{ verticalAlign: 'baseline' }}>Discount</th>
						<th style={{ verticalAlign: 'baseline' }}>Inventory Stock</th>
						<th style={{ verticalAlign: 'baseline' }}>Store Stock</th>
						<th style={{ verticalAlign: 'baseline' }}>Published</th>
						<th style={{ verticalAlign: 'baseline' }}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{
						product.products.length > 0 ?
							product.products.map((product, index) =>
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{product.name}</td>
									<td>LKR {product.price}.00</td>
									<td>{product.discount} %</td>
									<td>{product.stock}</td>
									<td>{product.storeStock}</td>
									<td>{<FormGroup><FormControlLabel control={<Switch checked={isPublished(product)} onClick={() => pubProduct(product)} />} /> </FormGroup>}</td>
									<td>
										{
											<h4>
												<MdRemoveRedEye className='actionIcon' style={{ margin: '0 5px' }} onClick={() => showProDeteModel(product)} />
												<MdEdit className='actionIcon' style={{ margin: '0 5px' }} onClick={() => handleShow(product)} />
												<MdDelete className='actionIcon' style={{ margin: '0 5px' }} onClick={() => delProdShow(product)} />
											</h4>
										}
									</td>
								</tr>

							)
							: null
					}

				</tbody>
			</Table>
		)
	}

	const renderUpdateProduct = () => {
		return (
			<NewModel
				show={show}
				close={close}
				handleClose={handleClose}
				ModalTitle="Update Product Details"
				size='lg'>

				<Row>
					<Col md={6}>
						<label className='key' >Name</label>
						<Input

							value={name}
							placeholder={'Product Name'}
							onChange={(e) => setProductName(e.target.value)}
						/>
					</Col>
					<Col md={6}>
						<label className='key' >Price</label>
						<Input

							value={price}
							placeholder={'Product Price'}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</Col>
					<Col md={6}>
						<label className='key' >Store Stock - Max {stock}</label>
						<Input
							value={storeStock}
							placeholder={'Product Stock'}
							onChange={(e) => setStoreStock(e.target.value)}
						/>
					</Col>
					<Col md={6}>
						<label className='key' >Category</label>
						<select
							label="Select Category"
							className='form-control'
							value={category}
							onChange={(e) => setCategory(e.target.value)}>
							<option>Select category</option>
							{
								createCatOptions(cat.categories).map(option =>
									<option key={option.value} value={option.value} >{option.name}</option>)
							}
						</select>
					</Col>
					<Col md={6}>
						<label className='key' >Brand</label>
						<Input

							value={brand}
							placeholder={'Product Brand'}
							onChange={(e) => setBrand(e.target.value)}
						/>
					</Col>
					<Col md={6}>
						<label className='key' >Color</label>
						<Input

							value={color}
							placeholder={'Product Color'}
							onChange={(e) => setColor(e.target.value)}
						/>
					</Col>
					<Col md={12}>
						<label className='key' >Description</label>
						<Input

							value={description}
							placeholder={'Product Description'}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Col>
					{/* add discount percentage to automatically calculate the discounted price */}
					<Col md={6}>
						<label className='key' >Discount Percentage</label>
						<Input

							value={discount}
							placeholder={'Product Discount'}
							onChange={(e) => {
								setDiscount(e.target.value)
								setDiscountedPrice(price * (100 - e.target.value)/100)
							}}
						/>
					</Col>
					<Col md={6}>
						<label className='key' >Discounted Price</label>
						<Input
							value={discount===0 ? 0 :(price * (100 - discount)/100)}
							placeholder={'Discounted Price'}
						/>
					</Col>
					<Col md={6}>
						<label className='key' >Set as Featured Product</label>
						<FormGroup>
							<FormControlLabel control={<Switch checked={isFeatured(featured)} onClick={() => setFea(featured)} />} />
						</FormGroup>
					</Col>
					<Col md={6}>
						<label className='key' >Set as New Arraival</label>
						<FormGroup>
							<FormControlLabel control={<Switch checked={isNew(newArrival)} onClick={() => setNew(newArrival)} />} />
						</FormGroup>
					</Col>
					<Col >
						<label className='key'>Product Pictures</label>
						<div style={{ display: 'flex' }}>
							{productPics.map(pic =>
								<div key={pic._id} className='proImg'>
									<img src={pic.img} alt='/' />
								</div>
							)}
						</div>
					</Col>
				</Row>

				<br></br>
				{
					updatePics.length > 0 ?
						updatePics.map((pic, index) => <div key={index}>{pic.name}</div>) :
						null
				}

				<input type='file' className='form-control' name='productPic' onChange={handleProductPic} />
			</NewModel>
		)
	}

	const productDetailHandleClose = () => {
		setProDetailModal(false)
	}

	const showProDeteModel = (product) => {
		setPrdDetes(product)
		setProDetailModal(true)
	}

	const closeProDeteModel = () => {
		setProDetailModal(false)
	}

	const productDetails = () => {
		if (!proDetes) {
			return null
		}
		return (
			<NewModel
				show={productDetailModal}
				handleClose={productDetailHandleClose}
				close={closeProDeteModel}
				size='lg'
				ModalTitle='Product Details'
				buttons={[
					{
						label: 'Close',
						color: 'primary',
						onClick: closeProDeteModel
					}
				]}>

				<Row>
					<Col md={6}>
						<label className='key' >Name</label>
						<p className='value'> {proDetes.name} </p>
					</Col>
					<Col md={6}>
						<label className='key' >Price</label>
						<p className='value'> LKR {proDetes.price} </p>
					</Col>
					<Col md={6}>
						<label className='key' >Stock</label>
						<p className='value'> {proDetes.stock} </p>
					</Col>
					<Col md={6}>
						<label className='key' >Category</label>
						<p className='value'>{proDetes.category.name}</p>
					</Col>
					<Col md={6}>
						<label className='key' >Brand</label>
						<p className='value'>{proDetes.brand}</p>
					</Col>
					<Col md={6}>
						<label className='key' >Color</label>
						<p className='value'>{proDetes.color}</p>
					</Col>
					<Col md={12}>
						<label className='key' >Description</label>
						<p className='value'> {proDetes.description} </p>
					</Col>
					<Col md={6}>
						<label className='key' >Discount Percentage</label>
						<p className='value'>{proDetes.discount}</p>
					</Col>
					<Col md={6}>
						<label className='key' >Discounted Price</label>
						<p className='value'>{proDetes.discountedPrice===0 ? "No Discount": proDetes.discountedPrice}</p>
					</Col>
					<Col md={6}>
						<label className='key' >Product Rating</label>
						<p className='value'>{proDetes.rating}</p>
					</Col>
					<Col md={6}>
						<label className='key' >Review Count</label>
						<p className='value'>{proDetes.reviews.length}</p>
					</Col>
					<Col >
						<label className='key'>Product Pictures</label>
						<div style={{ display: 'flex' }}>
							{proDetes.productPics.map(pic =>
								<div key={pic._id} className='proImg'>
									<img src={pic.img} alt='/' />
								</div>
							)}
						</div>
					</Col>
				</Row>

			</NewModel>
		)
	}

	const deleteProduct = () => {
		dispatch(deleteProducts(proDetes._id))
			.then(result => {
				if (result) {
					dispatch(getInitdata())
				}
			})
		setDelModal(false)
	}

	const delClose = () => {
		setDelModal(false)
	}

	const delProdShow = (product) => {
		setPrdDetes(product)
		setDelModal(true)
	}

	const delProduct = () => {
		if (!proDetes) {
			return null
		}
		return (
			<NewModel ModalTitle='Confirm Action'
				show={delProdModal}
				handleClose={deleteProduct}
				close={delClose}
				buttons={[
					{
						label: 'No',
						color: 'primary',
						onClick: delClose
					},
					{
						label: 'Yes',
						color: 'danger',
						onClick: deleteProduct
					}
				]}
			>
				<h4>Are you sure you want to delete </h4>
				<h6>{proDetes.name}</h6>
			</NewModel>
		)
	}

	return (
		<Layout sidebar>
			{renderUpdateProduct()}
			{productDetails()}
			{delProduct()}
			<Container>
				<Row>
					<Col md={12}>
						<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '50px' }} >
							<h3>Products</h3>

						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						{renderProductTable()}
					</Col>
				</Row>
			</Container>


		</Layout>
	)

}