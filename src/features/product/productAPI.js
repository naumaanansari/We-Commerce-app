// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {

    //TODO: We will not Hardcode The server URL Here
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  } );
}

export function fetchProductsByFilters(filter) {
  //filter = {"category": "smartphones"}
  //TODO: on server we'll support multiple values
  let queryString = '';
  for(let key in filter){
    queryString += `${key}=${filter[key]}&`
  }

  return new Promise(async (resolve) => {
    //TODO: We will not Hardcode The server URL Here
    const response = await fetch("http://localhost:8080/products?"+ queryString);
    const data = await response.json();
    resolve({ data });
  } );
}

export function fetchProductsBySort(filter) {
  //filter = {"category": "smartphones"}
  //TODO: on server we'll support multiple values
  console.log(filter)
  let queryString = `_sort=${filter._order}${filter._sort}`;
  console.log(queryString)

  return new Promise(async (resolve) => {
    //TODO: We will not Hardcode The server URL Here
    const response = await fetch("http://localhost:8080/products?"+ queryString);
    const data = await response.json();
    resolve({ data });
  } );
}