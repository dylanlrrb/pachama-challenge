export function capitalize(str) {
  return `${str[0].toUpperCase()}${str.substring(1)}`
}

export function searchStringToParamObject() {
  const urlSearchParams = (new URLSearchParams(window.location.search)).entries()
  return Object.fromEntries([...urlSearchParams]);
}

export function paramObjectToSearchString(searchParams) {
  const urlSearchParams = new URLSearchParams();
  for (let key in searchParams) {
    if (searchParams[key] !== undefined) {
      urlSearchParams.set(key, searchParams[key]);
    }
  }
  return `?${urlSearchParams.toString()}`
}