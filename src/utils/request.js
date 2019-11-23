export default async function request(url, options = {}, headers = {}, method = 'GET', body = {}) {
  const res = await fetch(url, {
    mode: 'cors',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    method,
    body: method === 'GET' || method === 'HEAD' ? null : JSON.stringify(body),
  });

  return res.ok ? res.json() : res.text();
}
