/** ATTENTION, ISSUES, NOTES--------- 
 * 
 * 
 * 
 * 
 * 
*/

import { useEffect, useState } from "react";
import api from "./api";
// import "./style.css;

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("nilus_token") || ""
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [section, setSection] = useState("overview"); // //Selects the visible dashboard section????? why "overview" written????????
  const [customers, setCustomers] = useState([]);
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  // ???????????? why catagory not here???? 


// // loadDashboard(): retrieving data from the backend
  async function loadDashboard() { 
    try {
      const [customerResponse, foodResponse, orderResponse] =
        await Promise.all([ // ????????? why customers, foods, orders needs to be inside 1 single Promise? why not separate???????????
          api.get("/customers"),
          api.get("/foods"),
          api.get("/orders")
        ]);

      setCustomers(customerResponse.data);
      setFoods(foodResponse.data);
      setOrders(orderResponse.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Could not load dashboard" // // more deep dive???????
      );
    }
  }

  // // useEffect() : automatically loading the dashboard
  useEffect(() => {
    if (token) {
      loadDashboard(); // // Check NOTES, ATTENTION
    }
  }, [token]);


// connecting the login form to the API : handleLogin():
// // "event" is a browser form-submission event, passed by React to the handler.
// // // Normally, submitting a browser form can trigger a page navigation or reload. preventDefault() stops that default action, allowing React to handle the submission and send an Axios request without intentionally reloading the page.
// // // The shorter { email, password } syntax is called object property shorthand. When a property name matches the variable name, you can write it once (it's the second argument is a JavaScript object: {email: email,password: password})
  async function handleLogin(event) { 
    event.preventDefault(); 
    setMessage(""); // ///............ removes the previous success or error message before attempting the next login. 

    try {
      const response = await api.post("/auth/login", { // // Sending the login request
        email,
        password
      });

  // Saving the returned token
      // // // localStorage.setItem(...)	Saves the token in browser storage
      // // // setToken(...) : Updates React state so the UI switches to the authenticated view
      // // // setMessage(...) : Displays a success message
      localStorage.setItem("nilus_token", response.data.token);
      setToken(response.data.token);
      setMessage("Welcome to Nilus Kitchen.");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed"
      );
    }
  }

  function logout() {
    localStorage.removeItem("nilus_token");
    setToken("");
    setCustomers([]);
    setFoods([]);
    setOrders([]);
    setMessage("Logged out.");
  }

  // // confirmOrder(): changing an order through the backend 
  async function confirmOrder(orderId) {
    try {
      await api.patch(`/orders/${orderId}/confirm`); // ????? why patch here in saving order?????? // ???? check if "orderId" is the custom or MongoDb?????
      setMessage("Order confirmed.");
      await loadDashboard();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Could not confirm order"
      );
    }
  }


// receiving a PDF from the API
  async function downloadReceipt(orderId) {
    try {
      const response = await api.get(
        `/orders/${orderId}/receipt.pdf`,
        { responseType: "blob" } // // ??? check compatibility with backend for "blob"
      );
// Creating a download link
      const url = URL.createObjectURL(response.data); // // URL.createObjectURL() creates a temporary browser URL pointing to the Blob data. It lets the browser access the downloaded file's contents.
      const link = document.createElement("a"); // // creates an anchor element.

      link.href = url;
      link.download = `${orderId}-receipt.pdf`;
      link.click();

      URL.revokeObjectURL(url); // // CHECK the ATTENTION file of App.jsx FOR UPDATED SAFER OPTION with "timeout" TRY LATER......
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Receipt download failed"
      );
    }
  }

  if (!token) {
    return (
      <main className="login-page">
        <form className="login-card" onSubmit={handleLogin}>
          <h1>Nilus Kitchen</h1>
          <p>Owner dashboard</p>

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button type="submit">Log in</button>
          {message && <p role="status">{message}</p>} // ?? why "status"?????
        </form>
      </main>
    );
  }

  // --------------------------------------

  return (
    <>
       <div className="app-shell">
      <aside className="sidebar">
        <h2>Nilus Kitchen</h2>
        <p className="muted">Owner dashboard</p>

        {["overview", "orders", "customers", "foods"].map((item) => (
          <button
            key={item}
            className={section === item ? "nav-active" : "nav-button"}
            onClick={() => setSection(item)}
          >
            {item[0].toUpperCase() + item.slice(1)}
          </button>
        ))}

        <button className="logout-button" onClick={logout}>
          Log out
        </button>
      </aside>

      <main className="main-content">
        <header className="page-header">
          <div>
            <h1>
              {section[0].toUpperCase() + section.slice(1)}
            </h1>
            <p>Manage your business from one place.</p>
          </div>

          <button className="secondary-button" onClick={loadDashboard}>
            Refresh
          </button>
        </header>

        {message && <p role="status" className="notice">{message}</p>}

        {section === "overview" && (
          <div className="stat-grid">
            <Stat title="Orders" value={orders.length} />
            <Stat title="Customers" value={customers.length} />
            <Stat title="Food items" value={foods.length} />
            <Stat
              title="Confirmed orders"
              value={orders.filter(
                (order) => order.orderStatus === "CONFIRMED"
              ).length}
            />
          </div>
        )}

        {section === "orders" && (
          <section className="panel">
            <h2>Orders</h2>
            {orders.length === 0 ? (
              <p>No orders yet. Create an order using the order API.</p>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.orderId}</td>
                        <td>{order.customerName}</td>
                        <td>৳{order.grandTotal.toFixed(2)}</td>
                        <td>{order.orderStatus}</td>
                        <td className="actions">
                          {order.orderStatus === "DRAFT" && (
                            <button onClick={() => confirmOrder(order._id)}>
                              Confirm
                            </button>
                          )}

                          {order.orderStatus === "CONFIRMED" && (
                            <button
                              onClick={() => downloadReceipt(order._id)}
                            >
                              Download PDF
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {section === "customers" && (
          <section className="panel">
            <h2>Customers</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Customer ID</th><th>Name</th><th>Phone</th></tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer._id}>
                      <td>{customer.customerId}</td>
                      <td>{customer.name}</td>
                      <td>{customer.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {section === "foods" && (
          <section className="panel">
            <h2>Food items</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Food ID</th><th>Name</th><th>Unit</th><th>Price</th></tr>
                </thead>
                <tbody>
                  {foods.map((food) => (
                    <tr key={food._id}>
                      <td>{food.foodId}</td>
                      <td>{food.name}</td>
                      <td>{food.unit}</td>
                      <td>৳{food.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  </>
  )
}
//-------------------------------------------------
function Stat({ title, value }) {
  return (
    <section className="stat-card">
      <p>{title}</p>
      <strong>{value}</strong>
    </section>
  );
}
export default App
