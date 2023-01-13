import React, { useState } from "react";
import { post } from "axios";
import { useNavigate } from "react-router-dom";

function CrudAdd(props) {
  let navigate = useNavigate();
  const initialState = {
    Qid: "",
    Question: "",
    Answer: "",
  };
  const [crud, setCrud] = useState(initialState);

  function handleSubmit(event) {
    event.preventDefault();
    //if (!crud.companyName || !crud.email) return;
    async function postCrud() {
      try {
        const response = await post("http://localhost:8082/api/FAQs", crud);
        alert("Your FAQ Receive Successfully");
        //history.push(`/FAQs/${response.data._id}`);
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

  function handleCancel() {
    navigate("/customerticket");
  }

  return (
    <div className="container" style={{ maxWidth: "850px", paddingTop: "2%" }}>
      <h5 className="header" style={{ color: "#625D5D", marginBottom: "5%" }}>
        FAQs from
        <hr />
      </h5>
      <form onSubmit={handleSubmit}>
        <div class="form-group mb-3">
          <label>Qid</label>
          <input
            name="Qid"
            type="text"
            required
            value={crud.Qid}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div class="form-group mb-3">
          <label>Question</label>
          <input
            name="Question"
            type="text"
            required
            value={crud.Question}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div class="form-group mb-3">
          <label>Answer</label>
          <input
            name="Answer"
            type="text"
            value={crud.Answer}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div
          className="btn-group"
          style={{ width: "25%", marginTop: "2%", marginBottom: "15%" }}
        >
          <input type="submit" value="Submit" className="btn btn-primary" />
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrudAdd;
