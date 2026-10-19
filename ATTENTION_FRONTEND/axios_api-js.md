## Timeouts: apply timeout
## Axios’s default is 0, which means no timeout. The request can hang forever if the server never answers. When the timeout is hit, axios rejects the Promise with an error whose code is "ECONNABORTED".

Definition: the maximum time in milliseconds (number) axios waits for a response before cancelling the request and throwing an error.

const api = axios.create({ baseURL: "...", timeout: 10000 }); // 10 seconds

__Why needed:__ if the server is slow or down, your dashboard would show a loading spinner forever. A timeout lets you show “Server not responding, try again.” Your current code has no timeout, so adding timeout: 10000 is a good improvement.