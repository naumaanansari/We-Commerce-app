// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //TODO: On server It will return only some specific information (excluding: Password)
    resolve({ data });
  });
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    //TODO: We will not Hardcode The server URL Here
    const response = await fetch("http://localhost:8080/cart?user=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //TODO: On server It will return only some specific information (excluding: Password)
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //TODO: On server It will return only some specific information (excluding: Password)
    resolve({ data: { id: itemId } });
  });
}

export async function resetCart(userId) {
  //get all the items and then delete
  return new Promise(async (resolve) => {

    const response = await fetchItemsByUserId(userId);
    const items = response.data;

    for (const item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({status: "success"})
  });
}
