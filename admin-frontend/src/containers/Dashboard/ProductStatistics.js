import React from "react";

const ProductsStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Products statistics</h5>
          <iframe
            style={{
              background: "#FFFFFF",
              border: " none",
              borderRadius: " 2px",
              boxShadow: " 0 2px 10px 0 rgba(70, 76, 79, .2)",
            }}
            width="550"
            height="480"
            src="https://charts.mongodb.com/charts-project-0-xmjsp/embed/charts?id=636a21a1-93da-40b7-8140-af89c47d0346&maxDataAge=300&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
    </div>
  );
};
export default ProductsStatistics;
