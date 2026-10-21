## App.jsx : overview ???
    ** const [section, setSection] = useState("overview"); // //Selects the visible dashboard section????? why "overview" written????????

    ** // ???????????? why catagory not here???? 



## ????????? why customers, foods, orders needs to be inside 1 single Promise? why not separate???????????
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
        error.response?.data?.message || "Could not load dashboard"
      );
    }
  }


        
## error.response?.data?.message || "Could not load dashboard" // // more deep dive???????

    6.5 Reading the error safely
setMessage(
  error.response?.data?.message || "Could not load dashboard"
);


This expression uses two JavaScript features:
- ?. is optional chaining. It avoids trying to access a nested property when the preceding value is null or undefined.
- || is logical OR. If the left-hand expression is falsy, the fallback message is used.

## This is an illustrative example of the shape the current JSX expects, not a claim that your backend currently returns exactly these fields. ???????????????? what does it mean?
    5.4 Customer, food and order arrays
        const [customers, setCustomers] = useState([]);
        const [foods, setFoods] = useState([]);
        const [orders, setOrders] = useState([]);


        Each starts as an empty array.

        Later, the API responses replace those empty arrays with arrays of records.

        For example, orders might hold objects like this:
        [
        {
            _id: "generated-mongodb-object-id",
            orderId: "NK-001",
            customerName: "Ayesha",
            grandTotal: 650,
            orderStatus: "DRAFT"
        }
        ]

