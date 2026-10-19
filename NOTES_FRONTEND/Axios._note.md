## Axios Instance (api file):
* Because every dashboard page needs these same things, create one configured axios instance __(api file)__ and reuse it everywhere, instead of repeating the URL and token logic in every component.


## What does config have?

Definition: the request configuration object, containing every setting for one request. In an interceptor it is typed InternalAxiosRequestConfig. In a response, response.config tells you which settings produced that response.

js
{
  url: "/orders",
  method: "get",              // string, lowercase
  baseURL: "http://localhost:5000/api",
  headers: { ... },           // request headers (this is what you modify)
  params: { status: "paid" }, // becomes ?status=paid in the URL
  data: { ... },              // request body (for POST/PUT/PATCH)
  timeout: 10000,             // number, milliseconds
  responseType: "json",       // "json" | "blob" | "text" | "arraybuffer"
  withCredentials: false,     // boolean, send cookies cross-origin?
  validateStatus: fn,         // decides which status codes count as success
  signal: ...                 // AbortSignal, to cancel a request
}


## Why “a separate axios client”(api) in api.js?

axios (the default import) is one global, shared client. axios.create() makes a new, independent copy with its own settings.

js
`const api = axios.create({ baseURL: "http://localhost:5000/api" });`

Reasons:

Settings are isolated. Your token interceptor only affects api, not other axios use.
Security. If you also call a third-party API (say a weather service) with global axios and put the token interceptor on it, you would leak your login token to a stranger’s server. A separate instance prevents that.
Multiple back-ends. You can have api for your server and paymentApi for another with different base URLs and timeouts.
Cleanliness. One file defines how you talk to your API, and everything else just imports it.


## What does “prepended” mean?

Prepend = attach to the front (the opposite of append, which attaches to the end).

js
`const api = axios.create({ baseURL: "http://localhost:5000/api" });`

`api.get("/orders");`
`// axios builds: "http://localhost:5000/api" + "/orders"`
`//             = "http://localhost:5000/api/orders"`

Rules to know:

__Axios joins them cleanly, so a trailing / on the base or a leading / on the path won’t create a double slash.__
    If the path is a full absolute URL (api.get("https://other.com/x")), axios ignores baseURL.



## "Content-Type": "application/json": Future NOTE:
__Image files, PDFs	binary data (File, Blob)	No, these need FormData__


-------------------------------------------------------------------------------------
## “Promise-based HTTP client library” and the alternatives

Broken into three parts:

* HTTP client: code that sends requests (the server side receives them).
* Library: reusable code you install (npm install axios) instead of writing yourself.
* Promise-based: its methods return a Promise, an object representing a result that will arrive later. You consume it with await or .then().

* Alternatives
Tool	                    What it is	                                Notes
fetch	                    Built into browsers and Node 18+	        Zero install. Manual JSON, no interceptors, 
                                                                        doesn’t throw on 404/500

axios	                    Most popular library	                    Interceptors, instances, auto JSON, 
                                                                        auto-throw on errors

ky	                        Small wrapper around fetch	                Modern, light, has hooks (like interceptors)

got / undici	            Node.js only	                            For back-end to back-end calls, not React

superagent	                Older library	                            Still around, less common in new projects

TanStack Query 
(React Query) / SWR	        Not HTTP clients	                        A data-fetching layer on top of axios or fetch:    
                                                                        caching, loading/error states, auto refetch

* Which is best?
    For  learning stage and MERN dashboard: axios. It’s the most common in tutorials, jobs, and codebases, and interceptors teach you important concepts.
    For small/simple projects: plain fetch is perfectly fine, with no dependency.
    Later, for a bigger dashboard: axios plus TanStack Query is a very popular professional combination. Axios sends the requests, and TanStack Query manages the loading, error, and cached data states in React.