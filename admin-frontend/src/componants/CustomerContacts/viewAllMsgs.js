import React from "react";
import MockData from "./MOCK_DATA.json";
import { useState } from "react";
const Messages = () => {
  const [searchterm, setsearchterm] = useState("");

  return (
    <>
      <div className="container">
        <h5 className="header" style={{ marginTop: "3%", color: "#625D5D" }}>
          Customer Messages
        </h5>
        <hr />

        <input
          class="form-control mr-sm-2"
          style={{ maxWidth: "25%", margin: "2%", marginLeft: "75%" }}
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => {
            setsearchterm(e.target.value);
          }}
        />
      </div>
      <div className="container">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Messages</th>
              <th>FeedBacks</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {MockData.filter((val) => {
              if (searchterm === "") {
                return val;
              } else if (
                val.first_name
                  .toLowerCase()
                  .includes(searchterm.toLowerCase()) ||
                val.email.toLowerCase().includes(searchterm.toLowerCase()) ||
                val.Messages.toLowerCase().includes(searchterm.toLowerCase())
              ) {
                return val;
              }
            }).map((m) => (
              <tr key={m.id}>
                <td>{m.first_name}</td>
                <td>{m.email}</td>
                <td>{m.Messages}</td>
                <td>{m.feedback}</td>
                <td>{m.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Messages;
