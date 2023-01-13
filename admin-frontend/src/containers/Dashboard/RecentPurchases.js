import React from "react";

function RecentPurchases() {
  return (
    <div className="col-xl-12 col-lg-12">
      <div className="card mb-8 shadow-sm">
        <article className="card-body">
          <h4 className="card-title">New Product Arrivals</h4>
          <div className="table-responsive">
            <table className="table">
              <tbody>
                <iframe
                  style={{
                    background: "#FFFFFF",
                    border: " none",
                    borderRadius: "2px",
                    boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                  }}
                  width="1200"
                  height="560"
                  src="https://charts.mongodb.com/charts-project-0-xmjsp/embed/charts?id=636ab9de-f05b-48ac-8c10-f458ba2196c9&maxDataAge=3600&theme=light&autoRefresh=true"
                ></iframe>
                {/* change according to the database results */}

                {/* {orders.slice(0, 5).map((order) => (
                <tr key={order._id}>
                  <td>
                    <b>{order.user.name}</b>
                  </td>
                  <td>{order.user.email}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <span className="badge rounded-pill alert-success">
                        Paid At {moment(order.paidAt).format("MMM Do YY")}
                      </span>
                    ) : (
                      <span className="badge rounded-pill alert-danger">
                        Not Paid
                      </span>
                    )}
                  </td>
                  <td>{moment(order.createdAt).calendar()}</td>
                  <td className="d-flex justify-content-end align-item-center">
                    <Link to={`/order/${order._id}`} className="text-success">
                      <i className="fas fa-eye"></i>
                    </Link>
                  </td>
                </tr>
              ))} */}
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </div>
  );
}

export default RecentPurchases;
