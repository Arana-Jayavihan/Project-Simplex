import React, { useState, useEffect } from "react";
import { get, patch } from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ComplaintEdit(props) {
  const initialState = {
    Qid: "",
    Question: "",
    Answer: "",
  };
  const [crud, setCrud] = useState(initialState);

  const { _id } = useParams();
  let navigate = useNavigate();

  useEffect(
    function () {
      async function updateComplaint() {
        try {
          const response = await get(`http://localhost:8082/api/FAQs/${_id}`);
          setCrud(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      updateComplaint();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props]
  );

  function handleSubmit(event) {
    event.preventDefault();
    async function updateComplaint() {
      try {
        await patch(`http://localhost:8082/api/FAQs/${crud._id}`, crud);
        alert("Updated");
      } catch (error) {
        console.log(error);
      }
    }
    updateComplaint();
  }

  function handleChange(event) {
    setCrud({ ...crud, [event.target.name]: event.target.value });
  }

  function handleCancel() {
    navigate("/viewFAQs");
  }

  return (
    <div className='container' style={{ maxWidth: "850px", paddingTop: "2%" }}>
      <h5 className='header' style={{ color: "#625D5D", marginBottom: "5%" }}>
        FAQs from
        <hr />
      </h5>
      <form onSubmit={handleSubmit}>
        <div class='form-group mb-3'>
          <label>Qid</label>
          <input
            name='Qid'
            type='text'
            required
            value={crud.Qid}
            onChange={handleChange}
            className='form-control'
          />
        </div>
        <div class='form-group mb-3'>
          <label>Question</label>
          <input
            name='Question'
            type='text'
            required
            value={crud.Question}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div class='form-group mb-3'>
          <label>Answer</label>
          <input
            name='Answer'
            type='text'
            value={crud.Answer}
            onChange={handleChange}
            className='form-control'
          />
        </div>

        <div
          className='btn-group'
          style={{ width: "25%", marginTop: "2%", marginBottom: "15%" }}
        >
          <input type='submit' value='Submit' className='btn btn-primary' />
          <button
            type='button'
            onClick={handleCancel}
            className='btn btn-secondary'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ComplaintEdit;
