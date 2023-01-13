import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CrudList() {
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

  function deleteFAQ(id) {
    try {
      axios.delete(`http://localhost:8082/api/FAQs/${id}`);
      alert("Deleted");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='container'>
      <h5
        className='header'
        style={{ color: "#625D5D", marginBottom: "2%", marginTop: "5%" }}
      >
        FAQ Configs
        <hr />
      </h5>

      {cruds.map((crud) => {
        return (
          <div style={{ marginBottom: "3%" }}>
            <div class='accordion' id='accordionExample'>
              <div class='accordion-item'>
                <h2 class='accordion-header' id='headingOne'>
                  <button
                    class='accordion-button'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#collapseOne'
                    aria-expanded='true'
                    aria-controls='collapseOne'
                  >
                    {crud.Question}
                  </button>
                </h2>
                <div
                  id='collapseOne'
                  class='accordion-collapse collapse show'
                  aria-labelledby='headingOne'
                  data-bs-parent='#accordionExample'
                >
                  <div class='accordion-body'>
                    <strong> QID :&nbsp;{crud.Qid}</strong>

                    <br />

                    <br />
                    <strong>{crud.Answer}</strong>
                    <br />
                    <div className='d-flex'>
                      <Link
                        to={`/FAQs/${crud._id}/edit`}
                        className='btn btn-dark'
                        style={{
                          fontSize: "10px",
                          padding: "6px",
                          marginRight: "1%",
                          marginTop: "2%",
                        }}
                      >
                        <i className='fa fa-cogs'></i>Edit info
                      </Link>

                      <button
                        o
                        className='btn btn-danger'
                        onClick={() => deleteFAQ(crud._id)}
                        style={{
                          fontSize: "10px",
                          padding: "6px",
                          marginTop: "2%",
                        }}
                      >
                        <i className='fas fa-trash-alt'></i>Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CrudList;
