Note:
## section is a string. It stores one of these values:
    - "overview"
    - "orders"
    - "customers"
    - "foods"
    The value determines which section is displayed.

    For example, clicking the Orders button runs setSection("orders"). React re-renders the component, and the Orders JSX becomes visible.

## Message state
    const [message, setMessage] = useState("");

    This is a string used for feedback such as "Login failed" or "Order confirmed.".

    When setMessage(...) runs, React updates the displayed message wherever the JSX uses message.

## 6.5 Reading the error safely
setMessage(
  error.response?.data?.message || "Could not load dashboard"
);


This expression uses two JavaScript features:
- ?. is optional chaining. It avoids trying to access a nested property when the preceding value is null or undefined.
- || is logical OR. If the left-hand expression is falsy, the fallback message is used.
An Axios error may have error.response.data.message when the server sends a message. A network failure might not have error.response at all, so optional chaining is useful.

