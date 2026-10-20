import { useState, useEf } from 'react'

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("nilus_token") || ""
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [section, setSection] = useState("overview");
  const [customers, setCustomers] = useState([]);
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  async function loadDashboard() {
    try {
      const [customerResponse, foodResponse, orderResponse] =
        await Promise.all([
          api.get("/customers"),
          api.get("/foods"),
          api.get("/orders")
        ]);

      setCustomers(customerResponse.data);
      setFoods(foodResponse.data);
      setOrders(orderResponse.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Could not load dashboard"
      );
    }
  }

  useEffect(() => {
    if (token) {
      loadDashboard();
    }
  }, [token]);

  async function handleLogin(event) {
    event.preventDefault();
    setMessage("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password
      });

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

  async function confirmOrder(orderId) {
    try {
      await api.patch(`/orders/${orderId}/confirm`);
      setMessage("Order confirmed.");
      await loadDashboard();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Could not confirm order"
      );
    }
  }

  async function downloadReceipt(orderId) {
    try {
      const response = await api.get(
        `/orders/${orderId}/receipt.pdf`,
        { responseType: "blob" }
      );

      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${orderId}-receipt.pdf`;
      link.click();

      URL.revokeObjectURL(url);
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
          {message && <p role="status">{message}</p>}
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
