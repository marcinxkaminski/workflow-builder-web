export function buildUrl(baseUrl, endpointUrl, queryParams = null) {
  return `${baseUrl}${endpointUrl}${queryParams ? `?${new URLSearchParams(queryParams).toString()}` : '/'}`;
}
