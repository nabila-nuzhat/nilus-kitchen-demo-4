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

    
## Technical note: because loadDashboard is declared inside App, 
    it is a new function on each render. This example uses it from the effect without listing it as a dependency. In a more rigorously linted React project, you should account for the function dependency—often by wrapping it in useCallback, or restructuring the effect. Also, React Strict Mode can cause an extra effect setup cycle in development, so you may see duplicate requests while testing.

    Official documentation: React — useEffect.
    https://react.dev/reference/react/useEffect?utm_source=chatgpt.com