import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

function UserOrdersPage() {
    return ( <div className="">
        <Navbar>
        <h1 className="text-3xl font-bold mx-28 sm:mx-auto">
                <span className="text-sky-500">MY </span>
                <span className="text-gray-600">Orders</span>
                 </h1>
            <UserOrders></UserOrders>
        </Navbar>
    </div> );
}

export default UserOrdersPage;