import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

function UserProfilePage() {
    return ( <div className="">
        <Navbar>
            <h1 className="text-3xl font-bold mx-24 sm:mx-auto">
                <span className="text-sky-500">MY </span>
                <span className="text-gray-600">PROFILE</span>
                 </h1>
            <UserProfile></UserProfile>
        </Navbar>
    </div> );
}

export default UserProfilePage;