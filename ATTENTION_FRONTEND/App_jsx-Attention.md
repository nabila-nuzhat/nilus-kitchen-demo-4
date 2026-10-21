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


## ##  ???? why "status"????? <button type="submit">Log in</button> 
          {message && <p role="status">{message}</p>} // 



## Important distinction: this implementation performs a client-side logout by removing the token. It does not call a backend logout endpoint. With stateless JWT authentication, a token already issued may remain usable until it expires unless the backend implements a revocation mechanism or other invalidation strategy. The backend must still verify every protected request.
    logout(): clearing the frontend login state
    function logout() {
    localStorage.removeItem("nilus_token");
    setToken("");
    setCustomers([]);
    setFoods([]);
    setOrders([]);
    setMessage("Logged out.");
    }


    This function resets the frontend when the owner clicks Log out.
    - localStorage.removeItem(...) deletes the saved token key.
    - setToken("") causes React to render the login screen.
    - The three set...([]) calls clear the displayed data arrays.
    - setMessage("Logged out.") updates the feedback message.
    The empty arrays mean the data is cleared from this component's state, not deleted from MongoDB.

## Why responseType: "blob"?
## ??? check compatibility with backend for "blob"
{ responseType: "blob" }
 const response = await api.get(
        `/orders/${orderId}/receipt.pdf`,
        { responseType: "blob" } // // 
      );

A Blob is a browser object that represents raw data, such as the bytes of a PDF file.

Without this option, Axios typically interprets a response as JSON or text based on the response and configuration. The blob response type is appropriate when the endpoint returns PDF bytes.


## Creating a download link ***
## URL.revokeObjectURL(url); // // CHECK the ATTENTION file of App.jsx FOR UPDATED SAFER OPTION with "timeout" TRY LATER...... ***
const link = document.createElement("a");

link.href = url;
link.download = `${orderId}-receipt.pdf`;
link.click();


- document.createElement("a") creates an anchor element.
- link.href sets the temporary file URL.
- link.download suggests a filename.
- link.click() programmatically activates the link.
The filename uses a template literal with ${orderId} interpolation. The filename is based on the ID passed to the function; it does not necessarily use a generated receipt number.
12.4 Releasing the temporary URL
URL.revokeObjectURL(url);


__* This releases the browser's reference to the temporary object URL. However, calling it immediately after click() can be too early in some browser situations. A safer pattern is to append the link, click it, remove it, and revoke the URL shortly afterward.__

For example:
`document.body.appendChild(link);`
`link.click();`
`link.remove();`

`setTimeout(() => URL.revokeObjectURL(url), 1000);`


The timeout is used here only to delay URL cleanup; it is not part of the API request itself.