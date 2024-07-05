import { Link } from "react-router-dom";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";

function Homepage() {
    return ( 
        <div >
                <Navbar>
                
                <ProductList/>
                </Navbar>
                
         </div> );
}

export default Homepage;