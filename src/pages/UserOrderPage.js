import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

function UserOrdersPage() {
    return ( <div className="">
        <Navbar>
            <h1 className="text-3xl font-bold mx-auto">My Orders</h1>
            <UserOrders></UserOrders>
        </Navbar>
    </div> );
}

export default UserOrdersPage;