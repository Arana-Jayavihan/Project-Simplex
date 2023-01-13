import React from 'react'
import { Header } from "../Header/header";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";
import { NavLink } from "react-router-dom";

/**
 * @author
 * @function Layout
 **/

export const Layout = (props) => {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid className="main">
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink to={"/home"}>Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to={"/products"}>Products</NavLink>
                </li>
                <li>
                  <NavLink to={"/orders"}>Orders</NavLink>
                </li>
                <li>
                  <NavLink to={"/categories"}>Categories</NavLink>
                </li>
                <li>
                  <NavLink to={"/inventory"}>Inventory</NavLink>
                </li>
                <li>
                  <NavLink to={"/hr"}>HR managment</NavLink>
                </li>
                <li>
                  <NavLink to={"/customerticket"}>Customer Tickets</NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto", padding: "60px" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
};