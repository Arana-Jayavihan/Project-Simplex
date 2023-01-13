import React, { useState } from "react";
import { post } from "axios";
import { useNavigate } from "react-router-dom";

function CrudAdd(props) {
  let navigate = useNavigate();
  const initialState = {
    Reply: "",
  };
  const [crud, setCrud] = useState(initialState);

  function handleSubmit(event) {
    event.preventDefault();
    //if (!crud.companyName || !crud.email) return;
    async function postCrud() {
      try {
        const response = await post("http://localhost:8082/api/Contacts", crud);
        alert("Your reply Receive Successfully");
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
    navigate("/contactus");
  }

  return (
    <div
      className="container"
      style={{
        display: "fixed",
        position: "fixed",
        borderRadius: "15px",
        backgroundColor: "#B7CDFC",
        width: "50%",
        height: "30%",
        marginTop: "2%",
        marginLeft: "10%",
        zIndex: "1",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="exampleInputEmail1">Enter the message</label>
          <input
            style={{ height: "100px" }}
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          style={{ backgroundColor: "#0051FF" }}
        >
          Send
        </button>
        <button
          type="submit"
          class="btn btn-primary"
          onClick={handleCancel}
          style={{ marginLeft: "1%", backgroundColor: "#0051FF" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CrudAdd;
