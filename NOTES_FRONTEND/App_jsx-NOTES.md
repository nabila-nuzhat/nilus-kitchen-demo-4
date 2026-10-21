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

8.5 Saving the returned token
localStorage.setItem("nilus_token", response.data.token);
setToken(response.data.token);
setMessage("Welcome to Nilus Kitchen.");


## Saving the returned token

These lines have three different responsibilities.
Line	Responsibility
localStorage.setItem(...)	Saves the token in browser storage
setToken(...)	Updates React state so the UI switches to the authenticated view
setMessage(...)	Displays a success message
Why save the token in two places?
- localStorage persists the value across page reloads.
- React state lets the current page respond immediately to a login or logout action.
They are not two different tokens; they are two storage mechanisms for the same token string.

Security detail: the frontend should not generate the JWT or decide whether a password is correct. Those tasks belong to the backend. The frontend simply receives the token and sends it on later requests.



## Why save the token in two places?
- localStorage persists the value across page reloads.
- React state lets the current page respond immediately to a login or logout action.
    They are not two different tokens; they are two storage mechanisms for the same token string.

__Security detail:__ the frontend should not generate the JWT or decide whether a password is correct. Those tasks belong to the backend. The frontend simply receives the token and sends it on later requests.