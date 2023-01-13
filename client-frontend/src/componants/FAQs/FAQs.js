import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FAQs.css";
import { Layout } from "../layout";
// import Button from "react-bootstrap/Button";

function FAQ() {
  const [cruds, setCruds] = useState([]);

  useEffect(function () {
    async function getAllCruds() {
      try {
        const response = await axios.get("http://localhost:8082/api/FAQs");
        setCruds(response.data);
      } catch (error) {
        console.log("error", error);
      }
    }
    getAllCruds();
  }, []);

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'row', maxWidth: '100%' }}>
        <div
          style={{ marginLeft: "3%", marginRight: "5%", maxWidth: '60%' }}
        >
          <h5
            className="title"
            style={{ color: "#625D5D", marginBottom: "2%", marginTop: "5%" }}
          >
            FAQ Configs
            <hr />
          </h5>

          <div>
            <a 
              href="/viewallfaq"
              class='btn btn-primary'
              style={{ marginBottom: '1.5%' }}
            >
              More FAQs
            </a>
          </div>

          {cruds.map((crud) => {
            return (
              <div style={{ marginBottom: "3%" }}>
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        {crud.Question}
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <strong> QID :&nbsp;{crud.Qid}</strong>

                        <br />

                        <br />
                        <strong>{crud.Answer}</strong>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ minWidth: '200px', marginTop: '5%' }}>
          <div >
            <div class="card">
              <div class="card-body">
                <h6 class="card-title">
                  <b>Still have any questions?</b>
                </h6>
                <h6 class="card-title">Contact us to get your answer!</h6>

                <a href="/cus" class="btn btn-primary">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FAQ;
