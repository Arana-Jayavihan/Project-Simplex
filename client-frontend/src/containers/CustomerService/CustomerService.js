import React, { useState } from "react";
import { post } from "axios";
// import { useNavigate } from "react-router-dom";
import "./CustomerService.css";
import { Layout } from "../../componants/layout";

function CustomerService(props) {
  // let navigate = useNavigate();
  const initialState = {
    name: "",
    email: "",
    phoneNumber: "",
    Message: "",
  };
  const [crud, setCrud] = useState(initialState);

  function handleSubmit(event) {
    event.preventDefault();
    async function postCrud() {
      try {
        const response = await post("http://localhost:8082/api/Contacts", crud);
        alert("Your message receive successfully");
      } catch (error) {
        alert("error");
        console.log("error", error);
      }
    }
    postCrud();
  }

  function handleChange(event) {
    setCrud({ ...crud, [event.target.name]: event.target.value });
  }

  // function handleCancel(){
  //   navigate()
  // }

  return (
    <Layout >
      <div className="split">
      <div class="left">
          <div class="centered">
            <div class="mapouter">
              <div class="gmap_canvas">
                <iframe
                  title="map"
                  class="gmap_iframe"
                  height="650"
                  width="750"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                  src="https://maps.google.com/maps?width=658&amp;height=400&amp;hl=en&amp;q=Simplex, Matara road, Kamburupitiya&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="centered">
            <div>
              <div class="contact_info">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-10 offset-lg-1">
                      <div class="contact_info_container d-flex flex-lg-row flex-column justify-content-between align-items-between">
                        <div class="contact_info_item d-flex flex-row align-items-center justify-content-start">
                          <div class="contact_info_image">
                            <img
                              src="https://img.icons8.com/office/24/000000/iphone.png"
                              alt=""
                            />
                          </div>
                          <div class="contact_info_content">
                            <div class="contact_info_title">Phone</div>
                            <div class="contact_info_text">+94 77 3170000</div>
                          </div>
                        </div>

                        <div class="contact_info_item d-flex flex-row align-items-center justify-content-start">
                          <div class="contact_info_image">
                            <img
                              src="https://img.icons8.com/ultraviolet/24/000000/filled-message.png"
                              alt=""
                            />
                          </div>
                          <div class="contact_info_content">
                            <div class="contact_info_title">Email</div>
                            <div class="contact_info_text">simplex@gmail.com</div>
                          </div>
                        </div>

                        <div class="contact_info_item d-flex flex-row align-items-center justify-content-start">
                          <div class="contact_info_image">
                            <img
                              src="https://img.icons8.com/ultraviolet/24/000000/map-marker.png"
                              alt=""
                            />
                          </div>
                          <div class="contact_info_content">
                            <div class="contact_info_title">Address</div>
                            <div class="contact_info_text">
                              SIMPLEX, Kamburupitiya road, Matara
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="container"
                style={{ maxWidth: "850px", paddingTop: "20%" }}
              >
                <form onSubmit={handleSubmit}>
                  <div class="form-group mb-3">
                    <label>Name</label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={crud.name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div class="form-group mb-3">
                    <label>E-mail</label>
                    <input
                      name="email"
                      type="text"
                      required
                      value={crud.email}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div class="form-group mb-3">
                    <label>Phone-Number</label>
                    <input
                      name="phoneNumber"
                      type="text"
                      value={crud.phoneNumber}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div class="form-group mb-3">
                    <label>Message</label>
                    <input
                      name="Message"
                      type="text"
                      value={crud.Message}
                      onChange={handleChange}
                      className="form-control"
                      style={{
                        height: "150px",
                      }}
                    />
                  </div>

                  <div
                    className="btn-group"
                    style={{ width: "25%", marginTop: "2%", marginBottom: "15%" }}
                  >
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-primary"
                    />
                    {/* <button
                    type="button"
                    // onClick={handleCancel}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CustomerService;
