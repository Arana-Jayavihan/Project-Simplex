import React from "react";
import Button from "react-bootstrap/Button";
import "../CustomerTickets/CustomerTicket.css";
import { Layout } from "../../componants/layout";
import ViewMSG from "../../componants/CustomerContacts/ViewMSG";

/**
 * @author
 * @function Home
 **/

export const CustomerTickets = (props) => {
  return (
    <div>
      <Layout sidebar></Layout>

      <div>
        <iframe
          style={{
            border: "2px solid black",
            borderRadius: "12px",
            marginLeft: "18%",
            width: "10%",
            height: "5%",
            marginTop: "-3%",
          }}
          title="msgCount"
          width="640"
          height="480"
          src="https://charts.mongodb.com/charts-project-0-xmjsp/embed/charts?id=636a7c25-2e11-420f-82e4-62bc31583e4f&maxDataAge=3600&theme=light&autoRefresh=true"
        ></iframe>
      </div>

      <div style={{ marginLeft: "30%", marginTop: "-10%" }}>
        <h2>Customer Support and Service Management Unit</h2>
      </div>
      {/* <div class="dropdown">
        <p style={{ marginLeft: "88.6%", marginTop: "2%" }}>FAQ Management</p>
        <Button type="button" class="dropbtn" style={{ marginLeft: "91%" }}>
          FAQ
        </Button>
        <div class="dropdown-content">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
      </div> */}

      <div class="dropdown" style={{ marginLeft: "85%", marginTop: "2%" }}>
        <button class="dropbtn">FAQ Management</button>
        <div class="dropdown-content">
          <a href="/FAQs">Add FAQ</a>
          <a href="/viewFAQs">FAQs</a>
          {/* <a href="#">Link 3</a> */}
        </div>
      </div>
      <ViewMSG />
    </div>
  );
};
