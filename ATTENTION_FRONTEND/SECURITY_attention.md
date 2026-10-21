## storing JWTs in localStorage exposes them to JavaScript running on that origin. If an attacker exploits a cross-site scripting (XSS) vulnerability, a token can be stolen. For a learning project this illustrates the flow, but production authentication needs careful storage and XSS protections.


---------------------------------- App.jsx----------------------
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

