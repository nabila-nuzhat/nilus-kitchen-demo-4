## if  ever pass own headers inside options, it replaces the whole default headers object (spread is shallow), so it'd lose Content-Type. Fine for now.

## 2. Why is request written this way?

Without the helper, every function would repeat the same setup:

js
export const getTodos = async () => {
  const res = await fetch(`${API_URL}/todos`, { headers: { "Content-Type": "application/json" } });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
};
// ...and the same ~5 lines again for create, update, delete

request holds the shared parts (base URL, header, error check, JSON parsing). Each exported function supplies only the parts that differ: the path, the method, and the body. This follows the DRY principle (Don’t Repeat Yourself).