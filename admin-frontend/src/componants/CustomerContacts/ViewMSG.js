import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import AddReply from "../CustomerContacts/AddReply";
import { Button } from "react-bootstrap";

function CrudList() {
  const [cruds, setCruds] = useState([]);
  const [appear, setAppear] = useState(false);

  useEffect(function() {
    async function getAllCruds() {
      try {
        const response = await axios.get("http://localhost:8082/api/Contacts");
        setCruds(response.data);
      } catch (error) {
        console.log("error", error);
      }
    }
    getAllCruds();
  }, []);

  function deleteMSG(id) {
    try {
      axios.delete(`http://localhost:8082/api/Contacts/${id}`);
      alert("Deleted");
    } catch (error) {
      console.error(error);
    }
  }

  const handleAppear = () => {
    setAppear((current) => !current);
  };

  return (
    <>
      <div className="container" style={{ marginLeft: "20%" }}>
        <h5
          className="header"
          style={{ color: "#625D5D", marginBottom: "2%", marginTop: "5%" }}
        >
          MESSAGES
          <hr />
        </h5>

        <div>{appear && <AddReply />}</div>
        {cruds.map((crud) => {
          return (
            <>
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
                        {crud.Message}
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <strong> Name :&nbsp;{crud.name}</strong>

                        <br />

                        <br />
                        <strong>{crud.Reply}</strong>
                        <br />
                        <div className="d-flex">
                          <Button
                            // to={`/cus`}
                            className="btn btn-dark"
                            onClick={() => {
                              handleAppear();
                            }}
                            style={{
                              fontSize: "10px",
                              padding: "6px",
                              marginRight: "1%",
                              marginTop: "2%",
                            }}
                          >
                            <i className="fa fa-cogs"></i>Reply
                          </Button>

                          <button
                            o
                            className="btn btn-danger"
                            onClick={() => deleteMSG(crud._id)}
                            style={{
                              fontSize: "10px",
                              padding: "6px",
                              marginTop: "2%",
                            }}
                          >
                            <i className="fas fa-trash-alt"></i>Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default CrudList;
