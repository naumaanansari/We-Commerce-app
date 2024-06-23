// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //TODO: We will not Hardcode The server URL Here
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort) {
  //filter = {"category": "smartphones"}
  //TODO: on server we'll support multiple values
  let queryString = "";

  console.log(sort)
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
    console.log(queryString)
  }

  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
    
    
    
  }console.log(`fetching: http://localhost:8080/products?${queryString}`);

    return new Promise(async (resolve) => {
      //TODO: We will not Hardcode The server URL Here
      const response = await fetch(
        "http://localhost:8080/products?" + queryString
      );
      const data = await response.json();
      resolve({ data });
      
    });
  }


// export function fetchProductsBySort(filter,sort) {
//   //filter = {"category": "smartphones"}
//   //TODO: on server we'll support multiple values
//   console.log(filter)
//   //TODO: SortQuery: http://localhost:8080/products?_sort=price&_order=desc
//   let queryString = ``;

// for(let key in filter){
//   const categoryValues = filter[key];
//   if(categoryValues.length>=1){
//     const lastCategoryValue=  categoryValues[categoryValues.length-1]
//     queryString += `${key}=${filter[key]}&`
//   }

//   }
//   console.log(`fetching:  http://localhost:8080/products?${queryString}`)

//   return new Promise(async (resolve) => {
//     //TODO: We will not Hardcode The server URL Here
//     const response = await fetch("http://localhost:8080/products?"+ queryString);
//     const data = await response.json();
//     resolve({ data });
//   } );
// }
