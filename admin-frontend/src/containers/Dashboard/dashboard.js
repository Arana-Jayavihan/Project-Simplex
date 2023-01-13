import React from "react";
import { Layout } from "../../componants/layout";
import SalesStatistics from "./SalesStatistics";
import ProductStatistics from "../Dashboard/ProductStatistics";

import RecentPurchases from "./RecentPurchases";
import TopTotal from "./TopTotal";
import { jsPDF } from "jspdf";

/**
 * @author
 * @function Home
 **/

export const Home = (props) => {
  const generatePDF = () => {
    console.log("PDf genarate");
    var doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector("#c"), {
      callback: function (pdf) {
        pdf.save("dashboard report.pdf");
      },
    });
  };

  return (
    <>
      <Layout sidebar></Layout>
      <section className="content-main" style={{ marginLeft: 300 }}>
        <div className="content header">
          <h2
            className="content title"
            style={{ marginTop: 0, marginBottom: 10 }}
          >
            Dashboard
          </h2>
        </div>
        <TopTotal />
        {/* <TopTotal orders={orders} products={products} /> */}
        {/* <div>
          <button onClick={generatePDF}>get report</button>
        </div> */}
        <div className="row" id="c">
          {/* <a href="./newproductdetails.pdf" download={"report"}>
            <button>Downloadreport</button>
          </a> */}
          {/* STATICS */}
          <SalesStatistics />
          <ProductStatistics />
        </div>
        <div className="row">
          {/* STATICS */}
          <RecentPurchases />
        </div>

        {/* LATEST ORDER */}
        {/* <div className="card mb-4 shadow-sm"></div> */}
      </section>
    </>
  );
};
