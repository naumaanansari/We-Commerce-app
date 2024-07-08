import AdminProductList from "../features/admin/components/AdminProductList";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";

function AdminHomepage() {
    return ( 
        <div >
                <Navbar>
                <AdminProductList/>
                </Navbar>
                <Footer></Footer>
         </div> );
}

export default AdminHomepage;