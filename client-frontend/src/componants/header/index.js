import { useState, useEffect, useRef } from "react";
import "../header/style3.css";
import logo from "../images/logo.png";
import { useSelector } from "react-redux";

import { IoIosArrowDown, IoIosCart, IoIosSearch, IoIosClose, IoIosCall, IoIosHelpCircleOutline } from "react-icons/io";
import {
	Modal,
	MaterialInput,
	MaterialButton,
	DropdownMenu,
} from "../MetiraialUI";

import { useDispatch } from 'react-redux';
import { CategoryHeader } from "../CategoryHeader";
import SearchResults from "../SearchResults";
import {
	login,
	signout,
	getCartItems,
	signup as _signup,
} from "../../actions/auth.actions";

export const Header = (props) => {
	const [loginModal, setLoginModal] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const [searchResults, setSearchResults] = useState([]);
	const [searchText, setSearchText] = useState(undefined);
	const auth = useSelector((state) => state.auth);
	const initData = useSelector((state) => state.initData);

	const ref = useRef()
	const logout = () => {
		dispatch(signout());
	};

	const renderdLoggedMenu = () => {
		return (
			<DropdownMenu
				menu={<a className="firstName">{auth.user.firstName}</a>}
				menus={[
					{ label: "My Profile", href: "", icon: null },
					{ label: "Golden Zone", href: "", icon: null },
					{ label: "Orders", href: "", icon: null },
					{ label: "Rewards", href: "", icon: null },
					{ label: "WishList", href: "", icon: null },
					{ label: "Notification", href: "", icon: null },
					{ label: "Logout", href: "", icon: null, onClick: logout },
				]}
				firstMenu={
					<div className="firstmenu">
						<span>New Customer?</span>
						<a style={{ color: "#2874f0" }}>Sign Up</a>
					</div>
				}
			/>
		);
	};

	const renderdNonLoggedInMenu = () => {
		return (
			<DropdownMenu
				menu={
					<a className="loginButton" onClick={() => setLoginModal(true)}>
						Login
					</a>
				}
				menus={[
					{ label: "None logged menu ", href: "", icon: null },
					{ label: "None logged menu", href: "", icon: null },
					{ label: "None logged menu", href: "", icon: null },
					{ label: "None logged menu", href: "", icon: null },
					{ label: "None logged menu", href: "", icon: null },
					{ label: "None logged menu", href: "", icon: null },
				]}
				firstMenu={
					<div className="firstmenu">
						<span>New Customer?</span>
						<a style={{ color: "#2874f0" }}>Sign Up</a>
					</div>
				}
			/>
		);
	};

	const userLogin = () => {
		dispatch(login({ email, password }))
			.then(result => {
				if (result) {
					setLoginModal(false)
					setEmail('')
					setPassword('')
				}
				else {
					alert("Incorrect Username or Password")
				}
			})
	};

	useEffect(() => {
	}, [auth.authenticacte]);

    // when loading, client application will fetch all produuct data
	// when search text is etred by the user those products will be
	// filtered if the earch text is inclued in the name, color, brand or category
	const handleSearchChange = (e) => {
		if (e.target.value != '') {
			setSearchText(e.target.value.toLowerCase())
			const resultsArray = initData.products.filter(product =>
				product.name.toLowerCase().includes(searchText) ||
				product.color.toLowerCase().includes(searchText) ||
				product.brand.toLowerCase().includes(searchText) ||
				product.category.name.toLowerCase().includes(searchText))

			setSearchResults(resultsArray.slice(0, 9))
		}
		if (e.target.value === '') {
			setSearchResults([])
			setSearchText(undefined)
		}

	}

	const handleClose = () => {
		ref.current.value = ''
		setSearchResults([])
		setSearchText(undefined)
	}

	return (
		<div className="comHeader">
			<div className="header">
				<Modal visible={loginModal} onClose={() => setLoginModal(false)}>
					<div className="authContainer">
						<div className="row">
							<div className="leftspace">
								<h2>Login</h2>
								<p>Get access to your Orders, Wishlist and Recommendations</p>
							</div>
							<div className="rightspace">
								<MaterialInput
									type="text"
									label="Enter Email/Enter Mobile Number"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>

								<MaterialInput
									type="password"
									label="Enter Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								//  rightElement={<a href="#">Forgot?</a>}
								/>
								<MaterialButton
									title="Login"
									bgColor="#fb641b"
									textColor="#ffffff"
									style={{ margin: "40px 0" }}
									onClick={userLogin}
								/>
							</div>
						</div>
					</div>
				</Modal>
				<div className="subHeader">
					<div className="logo">
						<a href="/">
							<img src={logo} className="logoimage" alt="" />
						</a>
						<a style={{ marginTop: "-10px" }}>
							<span className="exploreText">Explore</span>
							<span className="plusText">Plus</span>
							<img src={logo} className="goldenStar" alt="" />
						</a>
					</div>{" "}
					<div
						style={{
							padding: "0 10px",
						}}
					>
						<div className="searchInputContainer">
							<input
								className="searchInput"
								placeholder={"search for products, brands and more"}
								id="searchTxt"
								ref={ref}
								onChange={handleSearchChange}
							/>
							{
								searchText !== undefined ?
									<div className="searchIconContainer">
										<IoIosClose
											style={{
												color: "#2874f0",
											}}
											onClick={handleClose}

										/>
									</div>
									:
									<div className="searchIconContainer">
										<IoIosSearch
											style={{
												color: "#2874f0",
											}}
										/>
									</div>
							}

						</div>
					</div>
					<div className="rightMenu"
						style={{
							position: "relative", zIndex: "2"
						}}
					>
						{auth.authenticated ? renderdLoggedMenu() : renderdNonLoggedInMenu()}
						<div>
							<a href="/cart" className="cart">
								<IoIosCart />
								<span style={{ margin: "0 10px" }}>Cart</span>
							</a>
						</div>
						<div>
							<a href="cus" className="cart">
								<IoIosCall />
								<span style={{ margin: "0 10px" }}>Help</span>
							</a>
						</div>
						<div>
							<a href="/faq" className="cart">
								<IoIosHelpCircleOutline />
								<span style={{ margin: "0 10px" }}>FAQ</span>
							</a>
						</div>
					</div>
				</div>
			</div>
			<CategoryHeader />
			{
				searchResults.length > 0 && searchText != undefined ?
					<div className="searchResults">
						<SearchResults searchResults={searchResults} searchText={`Search Results For " ${searchText} "`} />
					</div>
					:
					searchResults.length === 0 && searchText != undefined ?
						<div className="searchResults">
							<SearchResults searchResults={searchResults} searchText={`Search Results For " ${searchText} "`} />
						</div>
						:
						null
			}
		</div>


	);
};
