import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectUserInfo,
  selectUserOrders,
} from "../userSlice";
import { discountedPrice } from "../../../app/constants";

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch, user]);

  return (
    <div>
      {orders.map((order) => (
        <div className="">
          <div className="">
            <div className="bg-white mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 mt-12 ">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 my-5">
                  Order Id: #{order.id}
                </h1>
                <h3 className="text-lg sm:text-xl font-semibold sm:font-bold tracking-tight text-red-900 my-5">
                  Order status: {order.status}
                </h3>
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li
                        key={item.id}
                        className="flex flex-col sm:flex-row py-6"
                      >
                        <div className="w-[60%] mx-auto mb-4 sm:mb-0 h-auto sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-sm sm:text-base font-medium text-gray-900 ">
                              <h3>
                                <a href={item.product.id}>{item.product.title}</a>
                              </h3>
                              <p className="ml-4 text-green-700">${discountedPrice(item.product)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500 flex items-center">
                              <label
                                htmlFor="quantity"
                                className="block text-sm font-medium leading-6 text-sky-500"
                              >
                                Qty:  {item.quantity}
                              </label>
                              {/* <span>Qty</span>  */}
                            </div>

                            <div className="flex"></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base my-2 font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p className="text-green-600">${order.totalAmount}</p>
                </div>
                <div className="flex justify-between text-base my-2 font-medium text-gray-900">
                  <p>Total Items In Cart</p>
                  <p className="text-sky-600">{order.totalItems} Items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping Address:
                </p>

                {/* User Shipping Address */}
                <div className="flex flex-col sm:flex-row justify-between gap-x-6 py-5 px-3 border border-solid border-gray-300 mt-2">
                  <div className="flex min-w-0 gap-x-4 ">
                    <div className="min-w-0 flex-auto ">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.selectedAddress.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        <span>{order.selectedAddress.street},</span>
                        <span>{order.selectedAddress.city},</span>
                      </p>
                      <p className="text-sm leading-5 text-gray-500">
                        <span>{order.selectedAddress.state},</span>
                        <span>{order.selectedAddress.pinCode}</span>
                      </p>
                    </div>
                  </div>
                  <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-5 text-gray-500">
                      {order.selectedAddress.phone}
                    </p>

                    <p className="text-sm leading-5 text-gray-500">
                      {order.selectedAddress.email}
                    </p>
                    {/* <p className="text-sm leading-5 text-gray-500">
                                {order.selectedAddress.state}
                            </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
