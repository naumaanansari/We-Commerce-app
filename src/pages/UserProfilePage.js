import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

function UserProfilePage() {
    return ( <div className="">
        <Navbar>
            <h1 className="text-3xl font-bold mx-auto">My Orders</h1>
            <UserProfile></UserProfile>
        </Navbar>
    </div> );
}

export default UserProfilePage;