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

export async function fetchForestDetails(forest_name) {
  const response = await fetch(`${host}/api/details?id=${forest_name}`);
  return response.json();
}

export async function fetchCarbonDetails(forest_name, from) {
  const response = await fetch(`${host}/api/carbon_details?id=${forest_name}&from=${from}`);
  return response.json();
}