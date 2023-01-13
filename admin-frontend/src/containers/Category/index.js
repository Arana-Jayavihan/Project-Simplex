import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addNewCat, deleteCategories, getAllCategories, updateCategories, updateCatImg } from '../../actions'
import { Layout } from '../../componants/layout'
import { NewModel } from '../../componants/Modal'
import { Input } from '../../componants/UI/input/input'
import CheckboxTree from 'react-checkbox-tree'
import { IoCheckbox, IoCaretForward, IoCaretDown } from "react-icons/io5";

import { IoMdAdd } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCategory, MdDelete, MdEdit, MdClearAll, MdOutlineImage } from 'react-icons/md'
import { BiCategory } from 'react-icons/bi'



import 'react-checkbox-tree/lib/react-checkbox-tree.css'
/**
* @author
* @function Category
**/

export const Category = (props) => {
	const [show, setShow] = useState(false);
	const [checked, setChecked] = useState([])
	const [expanded, setExpanded] = useState([])
	const [checkedArray, setCheckedArray] = useState([])
	const [expandedArray, setExpandedArray] = useState([])
	const [updateCategoryModal, setUpdateCategoryModal] = useState(false)
	const [categoryName, setCatName] = useState('')
	const [parentCatId, setParentCatId] = useState('')
	const [catImg, setCatImg] = useState('')
	const [delCatModal, setDelCatModal] = useState(false)
	const [catId, setCatId] = useState('');
	const [iShow, setIShow] = useState(false);
	const handleShow = () => setShow(true);

	const dispatch = useDispatch()
	const category = useSelector(state => state.category)

	//add category form 
	const handleClose = () => { 
		const form = new FormData()

		form.append('name', categoryName)
		form.append('parentId', parentCatId)  
		form.append('catImg', catImg)
		dispatch(addNewCat(form))
		setCatName('')
		setCatImg('')
		setParentCatId('')

		setShow(false)
	};
	//

	const close = () => {
		setCatName('')
		setCatImg('')
		setParentCatId('')
		setShow(false)
	}

	const closeUpdate = () => {
		setUpdateCategoryModal(false)
	}

	const displayNestedCategories = (categories) => {
		let catArray = []
		for (let category of categories) {
			catArray.push(
				{
					label: category.name,
					value: category._id,
					children: category.children.length > 0 && displayNestedCategories(category.children)
				}
			)
		}
		return catArray
	}

	const createCatOptions = (categories, options = []) => {
		for (let category of categories) {
			options.push({ value: category._id, name: category.name, parentId: category.parentId })
			if (category.children.length > 0) {
				createCatOptions(category.children, options)
			}
		}
		return options
	}

	const handleCatImg = (e) => {
		setCatImg(e.target.files[0])
	}

	const updateCategory = () => {
		setUpdateCategoryModal(true)
		updateChkExpCats()
	}

	const updateChkExpCats = () => {
		const categories = createCatOptions(category.categories)
		const checkedArray = []
		const expandedArray = []

		checked.length > 0 && checked.forEach((categoryId, index) => {
			const category = categories.find((category, _index) => categoryId === category.value)
			category && checkedArray.push(category)
		})

		expanded.length > 0 && expanded.forEach((categoryId, index) => {
			const category = categories.find((category, _index) => categoryId === category.value)
			category && expandedArray.push(category)
		})

		setCheckedArray(checkedArray)
		setExpandedArray(expandedArray)

	}

	const updateCategorySave = () => {
		const form = new FormData()
		expandedArray.forEach((item, index) => {
			form.append('_id', item.value)
			form.append('name', item.name)
			form.append('parentId', item.parentId ? item.parentId : '')
			form.append('type', item.type)
		})

		checkedArray.forEach((item, index) => {
			form.append('_id', item.value)
			form.append('name', item.name)
			form.append('parentId', item.parentId ? item.parentId : '')
			form.append('type', item.type)
		})

		dispatch(updateCategories(form))
			.then(result => {
				if (result) {
					dispatch(getAllCategories())
				}
			})
		setUpdateCategoryModal(false)
	}

	const handleCaInput = (key, value, index, type) => {
		if (type === "checked") {
			const updatedChechedArray = checkedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item)
			setCheckedArray(updatedChechedArray)
		}
		else if (type === "expanded") {
			const updatedExpandedArray = expandedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item)
			setExpandedArray(updatedExpandedArray)
		}
	}
//reset
	const reset = () => {
		setCheckedArray([])
		setExpandedArray([])
		setChecked([])
		setExpanded([])
	}
//
	const renderCatExpanded = () => {
		if (expandedArray.length > 0) {
			return (
				<Row>
					<Col>
						<h6>Expanded</h6>
					</Col>
				</Row>
			)
		}
	}

	const renderCatChecked = () => {
		if (checkedArray.length > 0) {
			return (
				<Row>
					<Col>
						<h6>Checked</h6>
					</Col>
				</Row>
			)
		}
	}

	const emptyArrays = () => {
		if (checkedArray.length === 0 && expandedArray.length === 0) {
			return (
				<Row>
					<Col>
						<h2 style={{ textAlign: 'center' }}>Please select categories</h2>
					</Col>
				</Row>
			)
		}
	}
     
	//Edit categories
	const renderUpdateCatModal = () => {
		if (checkedArray.length > 0 || expandedArray.length > 0) {
			return (
				<NewModel
					show={updateCategoryModal}
					close={closeUpdate}
					handleClose={updateCategorySave}
					ModalTitle="Update Categories"
					size='lg'
					buttons={[
						{
							label: 'Close',
							color: 'secondary',
							onClick: closeUpdate
						},
						{
							label: 'Save Changes',
							color: 'primary',
							onClick: updateCategorySave
						}
					]}
				>

					{emptyArrays()}
					{renderCatExpanded()}

					{
						expandedArray.length > 0 &&
						expandedArray.map((item, index) =>

							<Row key={index}>
								<Col>
									<Input
										value={item.name}
										placeholder={'Category Name'}
										onChange={(e) => handleCaInput('name', e.target.value, index, 'expanded')}
									/>
								</Col>
								<Col>
									<select
										className='form-control'
										value={item.parentId}
										onChange={(e) => handleCaInput('parentId', e.target.value, index, 'expanded')} >
										<option>Select Parent Category</option>
										{
											createCatOptions(category.categories).map(option =>
												<option key={option.value} value={option.value} >{option.name}</option>)
										}
									</select><br></br>
								</Col>
								
							</Row>
						)
					}
					{renderCatChecked()}
					{
						checkedArray.length > 0 &&
						checkedArray.map((item, index) =>
							<Row key={index}>
								<Col>
									<Input
										value={item.name}
										placeholder={'Category Name'}
										onChange={(e) => handleCaInput('name', e.target.value, index, 'checked')}
									/>
								</Col>
								<Col>
									<select
										className='form-control'
										value={item.parentId}
										onChange={(e) => handleCaInput('parentId', e.target.value, index, 'checked')} >
										<option>Select Parent Category</option>
										{
											createCatOptions(category.categories).map(option =>
												<option key={option.value} value={option.value} >{option.name}</option>)
										}
									</select><br></br>
								</Col>
								
							</Row>
						)
					}

				</NewModel>
			)
		}

		else {
			return (
				<NewModel
					ModalTitle='Update Categories'
					show={updateCategoryModal}
					handleClose={updateCategorySave}
					close={closeUpdate}
					buttons={[
						{
							label: 'Close',
							color: 'primary',
							onClick: closeUpdate
						},
					]}
				>
					<h4 style={{ textAlign: 'center' }}>Please select categories to update !!!</h4>

				</NewModel>
			)
		}

	}
	// add category form 1
	const renderAddCatModal = () => {
		return (
			<NewModel
				show={show}
				close={close}
				handleClose={handleClose}
				ModalTitle="Add New Category">

				<Input
					value={categoryName}
					placeholder={'Category Name'}                       // category input 
					onChange={(e) => setCatName(e.target.value)}
				/>
				
				{/* category parentId */}
				<select className='form-control' value={parentCatId} onChange={(e) => setParentCatId(e.target.value)} >
					<option>Select Parent Category</option>         
					{
						createCatOptions(category.categories).map(option =>
							<option key={option.value} value={option.value} >{option.name}</option>)
					}
				</select><br></br>
				{/* categories image 	 */}
				<input className='form-control' type='file' name='catImg' onChange={(e) => handleCatImg(e)} />  

			</NewModel>
		)
	}

	// delete catagory
	const renderDelCatModal = () => {
		if (checkedArray.length > 0) {
			return (
				<NewModel
					ModalTitle='Delete Categories'
					show={delCatModal}
					handleClose={deleteCategory}
					close={delClose}
					buttons={[
						{
							label: 'No',								//Show selected categories to
							color: 'primary',
							onClick: delClose
						},
						{
							label: 'Yes',
							color: 'danger',
							onClick: deleteCategory
						}
					]}
				>
					<h4>Are you sure you want to delete selected categories</h4>
					{checkedArray.map((item, index) => <div style={{ margin: '3px 3px', fontWeight: '500' }} key={index}> {item.name} </div>)}
				</NewModel>
			)
		}
		else {
			return (
				<NewModel
					ModalTitle='Delete Categories'
					show={delCatModal}
					handleClose={deleteCategory}
					close={delClose}
					buttons={[
						{
							label: 'Close',					//if no categories selected to delete
							color: 'primary',
							onClick: delClose
						},
					]}
				>
					<h4 style={{ textAlign: 'center' }}>Please select categories to delete !!!</h4>

				</NewModel>
			)
		}

	}

	const delCat = () => {
		updateChkExpCats()
		setDelCatModal(true)
	}

	const delClose = () => {
		setDelCatModal(false)
	}

	const deleteCategory = () => {
		const chkDelArry = checkedArray.map((item, index) => ({ _id: item.value }))
		const idArry = chkDelArry

		dispatch(deleteCategories(idArry))
			.then(result => {
				if (result) {
					dispatch(getAllCategories())
					reset()
				}
			})
		setDelCatModal(false)
		alert("Category Deleted")
	}

	const iClose = () => {
		setIShow(false)
		setCatId('')
		setCatImg('')
	}

	const imgClose = () => {
		const form = new FormData()
		form.append('catId', catId)
		form.append('catImg', catImg)
		dispatch(updateCatImg(form))
			.then(result => {
				if (result) {
					dispatch(getAllCategories())
				}
			})
		setIShow(false)
		setCatId('')
		setCatImg('')
	}

	const renderUpdateCatImgModal = () => {
		return (
			<NewModel
				show={iShow}
				close={iClose}
				handleClose={imgClose}
				ModalTitle="Update Category Image">
				
				<select className='form-control' value={catId} onChange={(e) => setCatId(e.target.value)} >
					<option>Select Category</option>         
					{
						createCatOptions(category.categories).map(option =>
							<option key={option.value} value={option.value} >{option.name}</option>)
					}
				</select><br></br>
				<label style={{ margin: '0 1% 1% 1%' }}>Select Category Image</label>
				<input className='form-control' type='file' name='catImg' onChange={(e) => handleCatImg(e)} />  

			</NewModel>
		)
	}

	return (
		<Layout sidebar>
			<Container>
				<Row>
					<Col md={12}>
						<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '20px' }} >
							<h3>Categories</h3>
							<div style={{ display: "inline-flex" }}>
								<button className='form-control' style={{ width: '105px', margin: '0px 10px' }} onClick={handleShow}><IoMdAdd style={{ fontSize: '28px' }} /> Add</button>
								<button className='form-control' style={{ width: '105px', margin: '0px 10px' }} onClick={delCat}><MdDelete style={{ fontSize: '28px' }} /> Delete</button>
								<button className='form-control' style={{ width: '105px', margin: '0px 10px' }} onClick={updateCategory}><MdEdit style={{ fontSize: '28px' }} /> Edit</button>
								<button className='form-control' style={{ width: '105px', margin: '0px 10px' }} onClick={(e) => {setIShow(true)}}><MdOutlineImage style={{ fontSize: '28px' }} /> Image</button>
								<button className='form-control' style={{ width: '105px', margin: '0px 10px' }} onClick={reset}><MdClearAll style={{ fontSize: '28px' }} /> Reset</button>
							</div>

						</div>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<CheckboxTree
							nodes={displayNestedCategories(category.categories)}
							checked={checked}
							expanded={expanded}
							onCheck={checked => setChecked(checked)}
							onExpand={expanded => setExpanded(expanded)}
							icons={{
								check: <IoCheckbox />,
								uncheck: <MdOutlineCheckBoxOutlineBlank />,
								halfCheck: <MdOutlineCheckBoxOutlineBlank />,
								expandClose: <IoCaretForward />,
								expandOpen: <IoCaretDown />,
								parentClose: <BiCategory />,
								parentOpen: <BiCategory />,
								leaf: <MdOutlineCategory />,
							}}
						/>
					</Col>
				</Row>
			</Container>

			{renderAddCatModal()}
			{renderDelCatModal()}
			{renderUpdateCatModal()}
			{renderUpdateCatImgModal()}
		</Layout>
	)

}