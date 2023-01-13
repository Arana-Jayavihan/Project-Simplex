import React from "react";
import { Header } from "../header";
import { Footer } from "../footer";
import { CategoryHeader } from "../CategoryHeader";
import Fab from "../../componants/FloatingChatButton/Button";
import Chat_Bot from "../ChatBot/ChatBot";
import { useState } from "react";

/**
 * @author
 * @function Layout
 **/

export const Layout = (props) => {
	const [showCB, setShowCB] = useState(false);
	const handleCB = () => {
		if(showCB){
			setShowCB(false)
		}
		else{
			setShowCB(true)
		}
	}
	return (
		<>
			<Header />
			<div style={{ marginTop: '125px' }}>
				<a onClick={handleCB}>
					<Fab />
				</a>
				{
					showCB === true ? <Chat_Bot /> : null
				}
				{props.children}
			</div>

		</>
	);
};
