/** ATTENTION, ISSUES, NOTES--------- 
 * 
 * 
 * 
 * 
 * 
*/

/** INITIAL APP.JSX ========================================================================================= BEFORE CORRECTION : MISSING CATEGORY SECTION */
// import { useEffect, useState } from "react";
// import api from "./api";
// // import "./style.css;

// function App() {
//   const [token, setToken] = useState(
//     localStorage.getItem("nilus_token") || ""
//   );
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [section, setSection] = useState("overview"); // //Selects the visible dashboard section????? why "overview" written????????
//   const [customers, setCustomers] = useState([]);
//   const [foods, setFoods] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [message, setMessage] = useState("");
//   // ???????????? why catagory not here???? 


// // // loadDashboard(): retrieving data from the backend
//   async function loadDashboard() { 
//     try {
//       const [customerResponse, foodResponse, orderResponse] =
//         await Promise.all([ // ????????? why customers, foods, orders needs to be inside 1 single Promise? why not separate???????????
//           api.get("/customers"),
//           api.get("/foods"),
//           api.get("/orders")
//         ]);

//       setCustomers(customerResponse.data);
//       setFoods(foodResponse.data);
//       setOrders(orderResponse.data);
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message || "Could not load dashboard" // // more deep dive???????
//       );
//     }
//   }

//   // // useEffect() : automatically loading the dashboard
//   useEffect(() => {
//     if (token) {
//       loadDashboard(); // // Check NOTES, ATTENTION
//     }
//   }, [token]);


// // connecting the login form to the API : handleLogin():
// // // "event" is a browser form-submission event, passed by React to the handler.
// // // // Normally, submitting a browser form can trigger a page navigation or reload. preventDefault() stops that default action, allowing React to handle the submission and send an Axios request without intentionally reloading the page.
// // // // The shorter { email, password } syntax is called object property shorthand. When a property name matches the variable name, you can write it once (it's the second argument is a JavaScript object: {email: email,password: password})
//   async function handleLogin(event) { 
//     event.preventDefault(); 
//     setMessage(""); // ///............ removes the previous success or error message before attempting the next login. 

//     try {
//       const response = await api.post("/auth/login", { // // Sending the login request
//         email,
//         password
//       });

//   // Saving the returned token
//       // // // localStorage.setItem(...)	Saves the token in browser storage
//       // // // setToken(...) : Updates React state so the UI switches to the authenticated view
//       // // // setMessage(...) : Displays a success message
//       localStorage.setItem("nilus_token", response.data.token);
//       setToken(response.data.token);
//       setMessage("Welcome to Nilus Kitchen.");
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message || "Login failed"
//       );
//     }
//   }

//   function logout() {
//     localStorage.removeItem("nilus_token");
//     setToken("");
//     setCustomers([]);
//     setFoods([]);
//     setOrders([]);
//     setMessage("Logged out.");
//   }

//   // // confirmOrder(): changing an order through the backend 
//   async function confirmOrder(orderId) {
//     try {
//       await api.patch(`/orders/${orderId}/confirm`); // ????? why patch here in saving order?????? // ???? check if "orderId" is the custom or MongoDb?????
//       setMessage("Order confirmed.");
//       await loadDashboard();
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message || "Could not confirm order"
//       );
//     }
//   }


// // receiving a PDF from the API
//   async function downloadReceipt(orderId) {
//     try {
//       const response = await api.get(
//         `/orders/${orderId}/receipt.pdf`,
//         { responseType: "blob" } // // ??? check compatibility with backend for "blob"
//       );
// // Creating a download link
//       const url = URL.createObjectURL(response.data); // // URL.createObjectURL() creates a temporary browser URL pointing to the Blob data. It lets the browser access the downloaded file's contents.
//       const link = document.createElement("a"); // // creates an anchor element.

//       link.href = url;
//       link.download = `${orderId}-receipt.pdf`;
//       link.click();

//       URL.revokeObjectURL(url); // // CHECK the ATTENTION file of App.jsx FOR UPDATED SAFER OPTION with "timeout" TRY LATER......
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message || "Receipt download failed"
//       );
//     }
//   }

//   if (!token) {
//     return (
//       <main className="login-page">
//         <form className="login-card" onSubmit={handleLogin}>
//           <h1>Nilus Kitchen</h1>
//           <p>Owner dashboard</p>

//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(event) => setEmail(event.target.value)}
//             required
//           />

//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//             required
//           />

//           <button type="submit">Log in</button>
//           {message && <p role="status">{message}</p>} // ?? why "status"?????
//         </form>
//       </main>
//     );
//   }

//   // main dashboard JSX --------------------------------------
// // // The second return in App is reached only when the if (!token) condition is false.
//   return (
//     <>
//        <div className="app-shell">
//         <aside className="sidebar"> {/*<aside> represents supporting content, used here for navigation.*/}
//         <h2>Nilus Kitchen</h2>
//         <p className="muted">Owner dashboard</p>

//         {["overview", "orders", "customers", "foods"].map((item) => (
//           <button
//             key={item}
//             className={section === item ? "nav-active" : "nav-button"}
//             onClick={() => setSection(item)}
//           >
//             {item[0].toUpperCase() + item.slice(1)}
//           </button>
//         ))}

//         <button className="logout-button" onClick={logout}>
//           Log out
//         </button>
//       </aside>

//       <main className="main-content"> {/*<main> represents the primary content of the page.*/}
//         <header className="page-header"> {/*<header> groups introductory information and actions.*/}
//           <div>
//             {/* page title*/}
//             <h1>
//               {section[0].toUpperCase() + section.slice(1)} {/*.slice(1) returns the rest of the string starting at index 1.*/}
//             </h1>
//             <p>Manage your business from one place.</p>
//           </div>

//           <button className="secondary-button" onClick={loadDashboard}> {/*The button calls loadDashboard when clicked.*/}
//             Refresh
//           </button>
//         </header>

//         {message && <p role="status" className="notice">{message}</p>}

// {/* Conditional rendering: choosing which section to show */}
//         {section === "overview" && ( // // ????? deeper dive to overview ...................
//           <div className="stat-grid">
//             <Stat title="Orders" value={orders.length} />
//             <Stat title="Customers" value={customers.length} />
//             <Stat title="Food items" value={foods.length} />
//             <Stat
//               title="Confirmed orders"
//               value={orders.filter(
//                 (order) => order.orderStatus === "CONFIRMED"
//               ).length}
//             />
//           </div>
//         )}

//         {section === "orders" && (
//           <section className="panel">
//             <h2>Orders</h2>
//             {orders.length === 0 ? (
//               <p>No orders yet. Create an order using the order API.</p>
//             ) : (
//               <div className="table-wrap">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Order ID</th>
//                       <th>Customer</th>
//                       <th>Total</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {orders.map((order) => (
//                       <tr key={order._id}>
//                         <td>{order.orderId}</td>
//                         <td>{order.customerName}</td>
//                         <td>৳{order.grandTotal.toFixed(2)}</td>
//                         <td>{order.orderStatus}</td>
//                         <td className="actions">
//                           {order.orderStatus === "DRAFT" && (
//                             <button onClick={() => confirmOrder(order._id)}>
//                               Confirm
//                             </button>
//                           )}

//                           {order.orderStatus === "CONFIRMED" && (
//                             <button
//                               onClick={() => downloadReceipt(order._id)}
//                             >
//                               Download PDF
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </section>
//         )}

//         {section === "customers" && (
//           <section className="panel">
//             <h2>Customers</h2>
//             <div className="table-wrap">
//               <table>
//                 <thead>
//                   <tr><th>Customer ID</th><th>Name</th><th>Phone</th></tr>
//                 </thead>
//                 <tbody>
//                   {customers.map((customer) => (
//                     <tr key={customer._id}>
//                       <td>{customer.customerId}</td>
//                       <td>{customer.name}</td>
//                       <td>{customer.phone}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </section>
//         )}

//         {section === "foods" && (
//           <section className="panel">
//             <h2>Food items</h2>
//             <div className="table-wrap">
//               <table>
//                 <thead>
//                   <tr><th>Food ID</th><th>Name</th><th>Unit</th><th>Price</th></tr>
//                 </thead>
//                 <tbody>
//                   {foods.map((food) => (
//                     <tr key={food._id}>
//                       <td>{food.foodId}</td>
//                       <td>{food.name}</td>
//                       <td>{food.unit}</td>
//                       <td>৳{food.price.toFixed(2)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </section>
//         )}
//       </main>
//     </div>
//   </>
//   )
// }
// // CHECK STAT + REACT FRAGMENT + APP_SHELL TOGETHER>>>>>>>>>>>>>>>>>>> CHECK ATTENTION App.jsx-------------------------------------------------
// function Stat({ title, value }) {
//   return (
//     <section className="stat-card">
//       <p>{title}</p>
//       <strong>{value}</strong>
//     </section>
//   );
// }
// export default App



/** CORRECTED APP.JSX ========================================================================================= AFTER CORRECTION ===== ADDING MISSING CATEGORY */


import { useEffect, useState } from "react";
import api from "./api";
import "./style.css";

export default function App() {
  // Authentication
  const [token, setToken] = useState(
    localStorage.getItem("nilus_token") || ""
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Dashboard navigation
  const [section, setSection] = useState("overview");

  // Data received from the backend
  const [customers, setCustomers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);

  // Category form
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  // User feedback
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Load dashboard data from the backend
  async function loadDashboard() {
    setLoading(true);

    try {
      const [
        customerResponse,
        categoryResponse,
        foodResponse,
        orderResponse
      ] = await Promise.all([
        api.get("/customers"),
        api.get("/categories"),
        api.get("/foods"),
        api.get("/orders")
      ]);

      setCustomers(customerResponse.data);
      setCategories(categoryResponse.data);
      setFoods(foodResponse.data);
      setOrders(orderResponse.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Could not load dashboard data. Please check the backend."
      );
    } finally {
      setLoading(false);
    }
  }

  // Load data after a token is available
  useEffect(() => {
    if (token) {
      loadDashboard();
    }
  }, [token]);

  // Log in the owner
  async function handleLogin(event) {
    event.preventDefault();
    setMessage("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password
      });

      const receivedToken = response.data.token;

      localStorage.setItem("nilus_token", receivedToken);
      setToken(receivedToken);
      setPassword("");
      setMessage("Welcome to Nilus Kitchen.");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed."
      );
    }
  }

  // Log out the owner
  function logout() {
    localStorage.removeItem("nilus_token");

    setToken("");
    setCustomers([]);
    setCategories([]);
    setFoods([]);
    setOrders([]);
    setPassword("");
    setMessage("Logged out.");
    setSection("overview");
  }

  // Create a new category
  async function createCategory(event) {
    event.preventDefault();
    setMessage("");

    try {
      await api.post("/categories", {
        name: categoryName.trim(),
        description: categoryDescription.trim()
      });

      setCategoryName("");
      setCategoryDescription("");
      setMessage("Category created successfully.");

      await loadDashboard();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Could not create category."
      );
    }
  }

  // Confirm a draft order
  async function confirmOrder(orderId) {
    setMessage("");

    try {
      await api.patch(`/orders/${orderId}/confirm`);

      setMessage("Order confirmed.");
      await loadDashboard();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Could not confirm order."
      );
    }
  }

  // Download a confirmed order's PDF receipt
  async function downloadReceipt(orderId) {
    setMessage("");

    try {
      const response = await api.get(
        `/orders/${orderId}/receipt.pdf`,
        { responseType: "blob" }
      );

      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${orderId}-receipt.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Receipt download failed."
      );
    }
  }

  // Find the category name for a food item.
  // Supports populated category data or a categoryId reference.
  function getCategoryName(food) {
    if (food.category?.name) {
      return food.category.name;
    }

    if (food.categoryName) {
      return food.categoryName;
    }

    const matchingCategory = categories.find(
      (category) =>
        category._id === food.categoryId ||
        category.categoryId === food.categoryId
    );

    return matchingCategory?.name || "Not available";
  }

  // Login screen
  if (!token) {
    return (
      <>
        <main className="login-page">
          <form className="login-card" onSubmit={handleLogin}>
            <div className="brand-mark">NK</div>

            <h1>Nilus Kitchen</h1>
            <p className="muted">Owner dashboard</p>

            <label htmlFor="loginEmail">Email</label>
            <input
              id="loginEmail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              autoComplete="username"
              required
            />

            <label htmlFor="loginPassword">Password</label>
            <input
              id="loginPassword"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            <button type="submit" className="primary-button">
              Log in
            </button>

            {message && (
              <p className="notice" role="status">
                {message}
              </p>
            )}
          </form>
        </main>
      </>
    );
  }

  // Authenticated dashboard
  return (
    <>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div className="brand-mark">NK</div>

            <div>
              <h2>Nilus Kitchen</h2>
              <p className="muted">Owner dashboard</p>
            </div>
          </div>

          <nav className="navigation" aria-label="Main navigation">
            {[
              "overview",
              "orders",
              "customers",
              "categories",
              "foods"
            ].map((item) => (
              <button
                key={item}
                type="button"
                className={
                  section === item ? "nav-active" : "nav-button"
                }
                onClick={() => setSection(item)}
              >
                {item[0].toUpperCase() + item.slice(1)}
              </button>
            ))}
          </nav>

          <button
            type="button"
            className="logout-button"
            onClick={logout}
          >
            Log out
          </button>
        </aside>

        <main className="main-content">
          <header className="page-header">
            <div>
              <p className="eyebrow">NILUS KITCHEN</p>

              <h1>
                {section[0].toUpperCase() + section.slice(1)}
              </h1>

              <p className="muted">
                Manage your business from one place.
              </p>
            </div>

            <button
              type="button"
              className="secondary-button"
              onClick={loadDashboard}
              disabled={loading}
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </header>

          {message && (
            <p className="notice" role="status">
              {message}
            </p>
          )}

          {/* OVERVIEW */}
          {section === "overview" && (
            <section className="dashboard-section">
              <div className="welcome-panel">
                <h2>Welcome back!</h2>
                <p>
                  Manage orders, customers, food items and categories
                  from this dashboard.
                </p>
              </div>

              <div className="stat-grid">
                <Stat title="Orders" value={orders.length} />

                <Stat
                  title="Customers"
                  value={customers.length}
                />

                <Stat
                  title="Categories"
                  value={categories.length}
                />

                <Stat
                  title="Food items"
                  value={foods.length}
                />

                <Stat
                  title="Confirmed orders"
                  value={
                    orders.filter(
                      (order) =>
                        order.orderStatus === "CONFIRMED"
                    ).length
                  }
                />
              </div>

              <section className="panel">
                <h2>Quick overview</h2>
                <p>
                  Use the navigation menu to view your existing
                  records. To create a category, open Categories.
                </p>
              </section>
            </section>
          )}

          {/* ORDERS */}
          {section === "orders" && (
            <section className="panel">
              <div className="section-heading">
                <div>
                  <h2>Orders</h2>
                  <p className="muted">
                    Review orders, confirm drafts and download receipts.
                  </p>
                </div>
              </div>

              {orders.length === 0 ? (
                <EmptyState message="No orders found yet." />
              ) : (
                <div className="record-list">
                  {orders.map((order) => (
                    <article className="record-card" key={order._id}>
                      <div className="record-header">
                        <h3>
                          Order {order.orderId || order._id}
                        </h3>

                        <span
                          className={`status status-${String(
                            order.orderStatus || "unknown"
                          ).toLowerCase()}`}
                        >
                          {order.orderStatus || "Unknown"}
                        </span>
                      </div>

                      <p>
                        <strong>Customer:</strong>{" "}
                        {order.customerName || "Not provided"}
                      </p>

                      <p>
                        <strong>Total:</strong>{" "}
                        ৳{Number(order.grandTotal ?? 0).toFixed(2)}
                      </p>

                      <div className="record-actions">
                        {order.orderStatus === "DRAFT" && (
                          <button
                            type="button"
                            onClick={() => confirmOrder(order._id)}
                          >
                            Confirm order
                          </button>
                        )}

                        {order.orderStatus === "CONFIRMED" && (
                          <button
                            type="button"
                            onClick={() => downloadReceipt(order._id)}
                          >
                            Download PDF receipt
                          </button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* CUSTOMERS */}
          {section === "customers" && (
            <section className="panel">
              <h2>Customers</h2>
              <p className="muted">
                Customer records currently saved in your database.
              </p>

              {customers.length === 0 ? (
                <EmptyState message="No customers found yet." />
              ) : (
                <div className="record-list">
                  {customers.map((customer) => (
                    <article className="record-card" key={customer._id}>
                      <h3>{customer.name}</h3>

                      <p>
                        <strong>Customer ID:</strong>{" "}
                        {customer.customerId || customer._id}
                      </p>

                      <p>
                        <strong>Phone:</strong>{" "}
                        {customer.phone || "Not provided"}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* CATEGORIES */}
          {section === "categories" && (
            <section className="dashboard-section">
              <section className="panel">
                <h2>Add a category</h2>

                <p className="muted">
                  Create a category to organize your food menu.
                </p>

                <form
                  className="data-form"
                  onSubmit={createCategory}
                >
                  <label htmlFor="categoryName">
                    Category name
                  </label>

                  <input
                    id="categoryName"
                    type="text"
                    value={categoryName}
                    onChange={(event) =>
                      setCategoryName(event.target.value)
                    }
                    placeholder="e.g. Rice Meals"
                    minLength={2}
                    maxLength={80}
                    required
                  />

                  <label htmlFor="categoryDescription">
                    Description (optional)
                  </label>

                  <textarea
                    id="categoryDescription"
                    value={categoryDescription}
                    onChange={(event) =>
                      setCategoryDescription(event.target.value)
                    }
                    placeholder="e.g. Rice-based meals"
                    rows={3}
                  />

                  <button
                    type="submit"
                    disabled={!categoryName.trim()}
                  >
                    Add category
                  </button>
                </form>
              </section>

              <section className="panel">
                <h2>Existing categories</h2>

                <p className="muted">
                  Categories returned by your backend API.
                </p>

                {categories.length === 0 ? (
                  <EmptyState message="No categories found. Add your first category above." />
                ) : (
                  <div className="record-list">
                    {categories.map((category) => (
                      <article
                        className="record-card"
                        key={category._id}
                      >
                        <div className="record-header">
                          <h3>{category.name}</h3>

                          <span
                            className={`status ${
                              category.isActive === false
                                ? "status-inactive"
                                : "status-active"
                            }`}
                          >
                            {category.isActive === false
                              ? "Inactive"
                              : "Active"}
                          </span>
                        </div>

                        {category.description && (
                          <p>{category.description}</p>
                        )}

                        <p className="muted record-id">
                          Category ID:{" "}
                          {category.categoryId || category._id}
                        </p>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </section>
          )}

          {/* FOOD ITEMS */}
          {section === "foods" && (
            <section className="panel">
              <h2>Food items</h2>

              <p className="muted">
                Existing menu items and their categories.
              </p>

              {foods.length === 0 ? (
                <EmptyState message="No food items found yet." />
              ) : (
                <div className="record-list">
                  {foods.map((food) => (
                    <article className="record-card" key={food._id}>
                      <h3>{food.name}</h3>

                      <p>
                        <strong>Food ID:</strong>{" "}
                        {food.foodId || food._id}
                      </p>

                      <p>
                        <strong>Category:</strong>{" "}
                        {getCategoryName(food)}
                      </p>

                      <p>
                        <strong>Unit:</strong>{" "}
                        {food.unit || "Not specified"}
                      </p>

                      <p className="food-price">
                        ৳{Number(food.price ?? 0).toFixed(2)}
                      </p>

                      {food.isAvailable === false && (
                        <span className="status status-inactive">
                          Unavailable
                        </span>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </>
  );
}

// Reusable dashboard statistic card
function Stat({ title, value }) {
  return (
    <section className="stat-card">
      <p>{title}</p>
      <strong>{value}</strong>
    </section>
  );
}

// Reusable empty-list message
function EmptyState({ message }) {
  return <p className="empty-state">{message}</p>;
}
