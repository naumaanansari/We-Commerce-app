import { json } from "react-router-dom";

// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //TODO: We will not Hardcode The server URL Here
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    //TODO: We will not Hardcode The server URL Here
    const response = await fetch("http://localhost:8080/products/"+ id);
    const data = await response.json();
    resolve({ data });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    //TODO: We will not Hardcode The server URL Here
    const response = await fetch("http://localhost:8080/products/",{
      method: 'POST',
      body: JSON.stringify(product),
      headers:  {'content-type':'application/json'}
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //TODO: On server It will return only some specific information (excluding: Password)
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort,pagination) {
  //filter = {"category": ["smartphones",laptops]}
  //sort = {_sort: "price", _order= "desc"}
  //pagination=  {_page: "1", _limit= 10}
  //TODO: Server Will Filter the the deleted products in case of no-admin login
  //TODO: on server we'll support multiple values
  let queryString = "";

  // console.log(sort)
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
    // console.log(queryString)
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
    // console.log(queryString)
  }

  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
    
    
    
  }
  
  // console.log(`fetching: http://localhost:8080/products?${queryString}`);

    return new Promise(async (resolve) => {
      //TODO: We will not Hardcode The server URL Here
      const response = await fetch(
        "http://localhost:8080/products?" + queryString
      );
      const data = await response.json();
      const totalItems = await response.headers.get('X-Total-Count')
      resolve({ data:{products:data, totalItems} });

      
    });
  }


  //Pagination URL: http://localhost:8080/products?_page=1&_limit=10
  // Sort Url     : http://localhost:8080/products?_sort=price&_order=asc/desc
  // Filter Url   : http://localhost:8080/products?category=furniture&

  export function fetchCategories() {
    return new Promise(async (resolve) => {
      
      const response = await fetch("http://localhost:8080/categories");
      const data = await response.json();
      resolve({ data });
    });
  }
  
  export function fetchBrands() {
    return new Promise(async (resolve) => {
      
      const response = await fetch("http://localhost:8080/brands");
      const data = await response.json();
      resolve({ data });
    });
  }