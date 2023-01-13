import React from "react";
import MockData from "./MOCK_DATA.json";
import { useState } from "react";
import { Layout } from "../layout";
const Messages = () => {
  const [searchterm, setsearchterm] = useState("");

  return (
    <Layout>
      <div className="container">
        <h5
          className="title"
          style={{ marginTop: "3%", borderRadius: "10px" }}
        >
          All FAQs
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
              <th>ID</th>
              <th>Question</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {MockData.filter((val) => {
              if (searchterm === "") {
                return val;
              } else if (
                val.question.toLowerCase().includes(searchterm.toLowerCase())
              ) {
                return val;
              }
            }).map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.question}</td>
                <td>{m.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};
export default Messages;
