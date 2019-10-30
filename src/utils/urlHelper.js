export function buildUrl(baseUrl, endpointUrl, queryParams) {
  return `${baseUrl}${endpointUrl}?${new URLSearchParams(queryParams).toString()}`;
}
