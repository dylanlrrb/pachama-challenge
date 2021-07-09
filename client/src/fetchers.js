const host = 'http://localhost:5000';

export async function fetchSearchResults() {
  const { search } = window.location;
  const response = await fetch(`${host}/api/search${search}`);
  return response.json();
}

export async function fetchForestTypes() {
  const response = await fetch(`${host}/api/forest_types`);
  return response.json();
}

export async function fetchForestDetails(forestId) {
  const response = await fetch(`${host}/api/details?id=${forestId}`);
  return response.json();
}

export async function fetchCarbonDetails(forestId, from) {
  const response = await fetch(`${host}/api/carbon_details?id=${forestId}&from=${from}`);
  return response.json();
}