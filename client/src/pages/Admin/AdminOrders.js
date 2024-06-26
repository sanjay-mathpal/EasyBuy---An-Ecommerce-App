import React, { useState, useEffect } from "react";
import axios from "axios";
// import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  // eslint-disable-next-line
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  // eslint-disable-next-line
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      // eslint-disable-next-line
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard mt-5 p-5 container-fluid">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-9 col-12 d-flex flex-column align-items-center m-0 m-sm-5">
                <h1 className="text-center">All Orders</h1>
                {orders?.map((o, i) => {
                  return (
                    <div className="border shadow mb-4 w-100" key={i}>
                      <div className="table-responsive">
                        <table className="table text-center">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Status</th>
                              <th scope="col">Buyer</th>
                              <th scope="col">Date</th>
                              <th scope="col">Payment</th>
                              <th scope="col">Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{i + 1}</td>
                              <td>
                                <Select
                                  bordered={false}
                                  onChange={(value) => handleChange(o._id, value)}
                                  defaultValue={o?.status}
                                >
                                  {status.map((s, i) => (
                                    <option key={i} value={s}>
                                      {s}
                                    </option>
                                  ))}
                                </Select>
                              </td>
                              <td>{o?.buyer?.name}</td>
                              <td>{moment(o?.createAt).fromNow()}</td>
                              <td>{o?.payment.success ? "Success" : "Failed"}</td>
                              <td>{o?.products?.length}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="container">
                        {o?.products?.map((p, i) => (
                          <div className="row mb-2 p-3 card flex-row" key={p._id}>
                            <div className="col-md-4 col-12 d-flex justify-content-center align-items-center">
                              <img
                                src={`/api/v1/product/product-photo/${p._id}`}
                                className="card-img-top"
                                alt={p.name}
                                style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }}
                              />
                            </div>
                            <div className="col-md-8 col-12">
                              <p>{p.name}</p>
                              <p>{p.description.substring(0, 30)}</p>
                              <p>Price: {p.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
