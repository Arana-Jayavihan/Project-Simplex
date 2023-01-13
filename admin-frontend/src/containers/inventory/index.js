import { Layout } from '../../componants/layout'
import React, { useEffect, useState } from 'react'
import { Input } from '../../componants/UI/input/input'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, getInitdata } from '../../actions'
import { NewModel } from '../../componants/Modal'
import '../Products/style.css'


/**
* @author
* @function Inventory
**/

export const Inventory = (props) => {
    const [name, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [productPics, setPics] = useState([])
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()
    const product = useSelector(state => state.product)
    const cat = useSelector(state => state.category)

    useEffect(() => {
        dispatch(getInitdata())
    }, [])

    const handleClose = () => {
        const form = new FormData()
        form.append('name', name)
        form.append('price', price)
        form.append('stock', stock)
        form.append('category', category)
        form.append('description', description)
        for (let pic of productPics) {
            form.append('productPic', pic)
        }
        dispatch(addProduct(form))
        .then(result => {
			if(result){
				dispatch(getInitdata())
			}
		})
        setProductName('')
        setPrice('')
        setStock('')
        setDescription('')
        setCategory('')
        setPics([])
        setShow(false)
    };

    const close = () => {
        setProductName('')
        setPrice('')
        setStock('')
        setDescription('')
        setCategory('')
        setPics([])
        setShow(false)
    }
    const handleShow = () => setShow(true);

    const createCatOptions = (categories, options = []) => {
		for (let category of categories) {
			if (category.children.length === 0) {options.push({ value: category._id, name: category.name, parentId: category.parentId })}
			else if (category.children.length > 0) {
				createCatOptions(category.children, options)
			}
		}
		return options
	}

    const handleProductPic = (e) => {
        setPics([
            ...productPics,
            e.target.files[0]
        ])
    }

    const renderProductTable = () => {
        return (
            <Table style={{ fontSize: 14, alignItems: '' }} responsive="sm">
                <thead>
                    <tr>
                        <th style={{ verticalAlign: 'baseline' }}>#</th>
                        <th style={{ verticalAlign: 'baseline' }}>Product Name</th>
                        <th style={{ verticalAlign: 'baseline' }}>Unit Price</th>
                        <th style={{ verticalAlign: 'baseline' }}>Inventory Stock</th>
                        <th style={{ verticalAlign: 'baseline' }}>Category</th>
                        <th style={{ verticalAlign: 'baseline' }}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map((product, index)=>
                                <tr key={product._id}>
                                    <td>{index+1}</td>
                                    <td>{product.name}</td>
                                    <td>LKR {product.price}.00</td>
                                    <td>{product.stock}</td>
                                    <td>{product.category.name}</td>
                                    <td>{product.description}</td>
                                </tr>

                            )
                            : null
                    }

                </tbody>
            </Table>
        )
    }

    const renderAddProduct = () => {
        return (
            <NewModel
                show={show}
                close={close}
                handleClose={handleClose}
                ModalTitle="Add New Product">
                <Input
                    label="Product Name"
                    value={name}
                    placeholder={'Product Name'}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <Input
                    label="Product Price"
                    value={price}
                    placeholder={'Product Price'}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    label="Product Stock"
                    value={stock}
                    placeholder={'Product Stock'}
                    onChange={(e) => setStock(e.target.value)}
                />
                <Input
                    label="Product Description"
                    value={description}
                    placeholder={'Product Description'}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    label="Select Category"
                    className='form-control'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    <option>Select Product Category</option>
                    {
                        createCatOptions(cat.categories).map(option =>
                            <option key={option.value} value={option.value} >{option.name}</option>)
                    }
                </select><br></br>
                {
                    productPics.length > 0 ?
                        productPics.map((pic, index) => <div key={index}>{pic.name}</div>) :
                        null
                }

                <input type='file' className='form-control' name='productPic' onChange={handleProductPic} />
            </NewModel>
        )
    }

    // const productDetailHandleClose = () => {
    //     setProDetailModal(false)
    // }

    // const showProDeteModel = (product) => {
    //     setPrdDetes(product)
    //     setProDetailModal(true)
    // }

    // const closeProDeteModel = () => {
    //     setProDetailModal(false)
    // }

    // const productDetails = () => {
    //     if (!proDetes) {
    //         return null
    //     }
    //     return (
    //         <NewModel
    //             show={productDetailModal}
    //             handleClose={productDetailHandleClose}
    //             close={closeProDeteModel}
    //             size='lg'
    //             ModalTitle='Product Details'>

    //             <Row>
    //                 <Col md={6}>
    //                     <label className='key' >Name</label>
    //                     <p className='value'> {proDetes.name} </p>
    //                 </Col>
    //                 <Col md={6}>
    //                     <label className='key' >Price</label>
    //                     <p className='value'> LKR {proDetes.price} </p>
    //                 </Col>
    //                 <Col md={6}>
    //                     <label className='key' >Stock</label>
    //                     <p className='value'> {proDetes.stock} </p>
    //                 </Col>
    //                 <Col md={6}>
    //                     <label className='key' >Category</label>
    //                     <p className='value'>{proDetes.category.name}</p>
    //                 </Col>
    //                 <Col md={12}>
    //                     <label className='key' >Description</label>
    //                     <p className='value'> {proDetes.description} </p>
    //                 </Col>
    //                 <Col >
    //                     <label className='key'>Product Pictures</label>
    //                     <div style={{ display: 'flex' }}>
    //                         {proDetes.productPics.map(pic =>
    //                             <div key={pic._id} className='proImg'>
    //                                 <img src={pic.img} />
    //                             </div>
    //                         )}
    //                     </div>
    //                 </Col>
    //             </Row>

    //         </NewModel>
    //     )
    // }


    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '50px' }} >
                            <h3>Inventory</h3>
                            <button className='form-control' style={{ width: 'auto', margin: '0 10px' }} onClick={handleShow}>Add New Product</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderProductTable()}
                    </Col>
                </Row>
            </Container>

            {renderAddProduct()}
            {/* {productDetails()} */}
        </Layout>
    )
}