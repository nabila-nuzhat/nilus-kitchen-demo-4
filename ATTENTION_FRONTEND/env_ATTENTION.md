## ???? what other values + variables needed in frontend .env?
## ???? does dotenv needed to be installed separately in Frontend?????



## import.meta.env: “replaced at build time, restart the dev server”

First, the terms:

Environment variable: a named setting (VITE_API_BASE_URL=...) stored outside your code, in a .env file.
Build time: when Vite processes and bundles your source code, before the browser runs it.
Runtime: when the browser actually executes the finished code.

What “replaced at build time” means: the browser can’t read your .env file. Instead, when Vite starts, it reads .env and literally swaps the expression in your code for the value. Your source:

js
baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"

becomes in the bundle sent to the browser:

js
baseURL: "https://my-backend.com/api" || "http://localhost:5000/api"

* Consequences:
__Restart the dev server after editing .env. Vite read the file once at startup, and your edit isn’t seen until it starts again.__
__After deploying, changing the variable in Vercel’s dashboard requires a new build/redeploy. The old bundle still has the old value baked in.__
__The value is visible to anyone who opens the browser DevTools, which is why secrets must never go in VITE_ variables.__