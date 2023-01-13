import React from "react";

function StockoutPurchases() {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h4 className="card-title">Stock Out Purchases </h4>
          <div className="table-responsive">
            <table className="table">
              <tbody>
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

export default StockoutPurchases;
