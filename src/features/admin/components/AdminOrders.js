import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { discountedPrice, ITEMS_PER_PAGE } from "../../../app/constants";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleShow = (e) => {
    console.log(e);
  };

  //To Update The Order Status
  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  const chooseColors = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ pagination, sort }));
    //TODO: Server Will Filter the the deleted products.
    
  }, [dispatch, page, sort]);

  return (
    <div key="1" className="overflow-x-auto">
      <div className=" flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full ">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal cursor-pointer">
                  <th
                    className="py-3 px-6 text-left hover:text-blue-500"
                    onClick={(e) =>
                      handleSort({
                        sort: "id",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Order ID
                    {sort._sort === "id" &&
                      (sort._order === "asc" ? (
                        
                        <ArrowUpIcon className="w-4 h-4 inline ml-1"></ArrowUpIcon>
                      ) : (
                        
                        <ArrowDownIcon className="w-4 h-4 inline ml-1"></ArrowDownIcon>
                      ))}
                  </th>
                  <th 
                  className="py-3 px-6 text-left hover:text-yellow-500" >
                    Items
                  </th>
                  <th
                    className="py-3 px-6 text-left hover:text-blue-500"
                    onClick={(e) =>
                      handleSort({
                        sort: "totalAmount",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Total Amount
                    {sort._sort === "totalAmount" &&
                      (sort._order === "asc" ? (
                        
                        <ArrowUpIcon className="w-4 h-4 inline ml-1"></ArrowUpIcon>
                      ) : (
                        
                        <ArrowDownIcon className="w-4 h-4 inline ml-1"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-6 text-center hover:text-pink-500">
                    Shipping Address
                  </th>
                  <th className="py-3 px-6 text-center hover:text-cyan-500">
                    Status
                  </th>
                  <th className="py-3 px-6 text-center hover:text-orange-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-bold">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order.items.map((item) => (
                        <div className="flex items-center">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.thumbnail}
                              alt={item.title}
                            />
                          </div>
                          <div className="font-normal">
                            <span className="font-semibold">
                              {item.title} -{" "}
                            </span>
                            <span className="text-blue-600">
                              {" "}
                              #{item.quantity} -
                            </span>
                            <span className="text-green-600">
                              ${discountedPrice(item)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center font-semibold text-green-600">
                        ${order.totalAmount}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="text-left ml-2">
                        <div className="">
                          <strong>{order.selectedAddress.name},</strong>
                        </div>
                        <div className=" w-32">
                          {order.selectedAddress.street},
                        </div>
                        <div className=" w-32">
                          {order.selectedAddress.city},
                        </div>
                        <div className=" w-32">
                          {order.selectedAddress.state},
                        </div>
                        <div className=" w-32 ">
                          {order.selectedAddress.pinCode},
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {order.id === editableOrderId ? (
                        <select
                          name=""
                          id=""
                          onChange={(e) => handleUpdate(e, order)}
                          className="outline-purple-400 border-purple-300 rounded-full font-semibold text-sm "
                        >
                          <option
                            value="choose"
                            className=" text-black bg-gray-100"
                          >
                            --choose status--
                          </option>
                          <option
                            value="pending"
                            className="text-purple-400 font-semibold bg-gray-100"
                          >
                            Pending
                          </option>
                          <option
                            value="dispatched"
                            className="text-yellow-400 font-semibold bg-gray-100"
                          >
                            Dispatched
                          </option>
                          <option
                            value="delivered"
                            className="text-green-400 font-semibold bg-gray-100"
                          >
                            Delivered
                          </option>
                          <option
                            value="cancelled"
                            className="text-red-400 font-semibold bg-gray-100"
                          >
                            Cancelled
                          </option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColors(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <EyeIcon
                          className="w-6 h-6 mx-1 transform hover:text-cyan-500 hover:scale-110"
                          onClick={(e) => handleShow(order)}
                        ></EyeIcon>

                        <PencilIcon
                          className="w-6 h-6 mx-1 mr-2 transform hover:text-green-500 hover:scale-110"
                          onClick={(e) => handleEdit(order)}
                        ></PencilIcon>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        handlePage={handlePage}
        page={page}
        setPage={setPage}
        totalItems={totalOrders}
      ></Pagination>
    </div>
  );
}

export default AdminOrders;
