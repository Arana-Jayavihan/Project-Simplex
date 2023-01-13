import React from "react";

export default function TopTotal(props) {
  const { orders, products } = props;
  let totalSale = 0;
  if (orders) {
    orders.map((order) =>
      order.isPaid === true ? (totalSale = totalSale + order.totalAmount) : null
    );
  }

  return (
    <div className="row" style={{ marginBottom: 20 }}>
      <div className="col-lg-2">
        <div className="card card-body mb-2 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="text-primary fas fa-usd-circle"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">User Count</h6>{" "}
              <iframe
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  borderRadius: "2px",
                }}
                width="60"
                height="40"
                src="https://charts.mongodb.com/charts-project-0-xmjsp/embed/charts?id=636aad74-f05b-4874-8f4e-f458ba136cc7&maxDataAge=300&theme=light&autoRefresh=true"
              ></iframe>
              {/* <span>Rs.{totalSale.toFixed(0)}</span> */}
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-2" style={{ marginLeft: 20 }}>
        <div className="card card-body mb-2 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-warning">
              <i className="text-warning fas fa-shopping-basket"></i>
            </span>
            <div className="text">
              <h6 className="mb-1"> Staff Count</h6>
              <iframe
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  borderRadius: "2px",
                }}
                width="60"
                height="40"
                src="https://charts.mongodb.com/charts-project-0-xmjsp/embed/charts?id=636b4409-bdee-42d9-87d6-c4a037e4e08b&maxDataAge=3600&theme=light&autoRefresh=true"
              ></iframe>
              {/* {products ? <span>{products.length}</span> : <span>0</span>} */}
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-2" style={{ marginLeft: 20 }}>
        <div className="card card-body mb-2 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-success">
              <i className="text-success fas fa-bags-shopping"></i>
            </span>
            <div className="text">
              <h6 className="mb-1"> Order Count</h6>

              <iframe
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  borderRadius: "2px",
                }}
                width="60"
                height="40"
                src="https://charts.mongodb.com/charts-project-0-xmjsp/embed/charts?id=636a8377-1728-47a1-82db-b6c1c0fa0317&maxDataAge=300&theme=light&autoRefresh=true"
              ></iframe>

              {/* {orders ? <span>{orders.length}</span> : <span>0</span>} */}
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-2" style={{ marginLeft: 20 }}>
        <div className="card card-body mb-2 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-warning">
              <i className="text-warning fas fa-shopping-basket"></i>
            </span>
            <div className="text">
              <h6 className="mb-1"> Product Count</h6>
              <iframe
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  borderRadius: "2px",
                }}
                width="60"
                height="40"
                src="https://charts.mongodb.com/charts-project-0-xmjsp/embed/charts?id=636a83be-bdee-40b6-8d61-c4a03720bfce&maxDataAge=3600&theme=light&autoRefresh=true"
              ></iframe>
              {/* {products ? <span>{products.length}</span> : <span>0</span>} */}
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-2" style={{ marginLeft: 20 }}>
        <div className="card card-body mb-2 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-warning">
              <i className="text-warning fas fa-shopping-basket"></i>
            </span>
            <div className="text">
              <h6 className="mb-1"> Return Item Count</h6>
              <iframe
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  borderRadius: "2px",
                }}
                width="60"
                height="40"
                src="https://charts.mongodb.com/charts-project-0-xmjsp/embed/charts?id=636b4517-07b0-44c4-8ea5-24b94a1b64c1&maxDataAge=3600&theme=light&autoRefresh=true"
              ></iframe>
              {/* {products ? <span>{products.length}</span> : <span>0</span>} */}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
