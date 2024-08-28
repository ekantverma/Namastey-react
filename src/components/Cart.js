// import { useDispatch, useSelector } from "react-redux";
// import MenuItemList from "./MenuItemList";
// import { clearCart } from "../utils/cartSlice";

// const Cart = () => {

//     // Fetch cart data from API or local storage
//     const cartItems = useSelector((store) => store.cart.items);

//     const dispatch = useDispatch();

//     const handleClearCart = () => {
//         dispatch(clearCart());
//     }

//     return (
//         <div className="text-center m-4 p-4 ">
//             <h1 className="text-2xl font-bold">Cart</h1>
//             <div className="w-6/12 m-auto">
//                 <button className="p-2 m-2 bg-black text-white rounded-lg" 
//                 onClick={handleClearCart}
//                 >
//                 Clear Cart
//                 </button>
//                 {cartItems.length == 0 && <h1>Your Cart is empty, Add items to your cart</h1>}
//                 <MenuItemList items={cartItems}/>
//             </div>
//         </div>
//     )
// }

// export default Cart;

import { useDispatch, useSelector } from "react-redux";
import MenuItemList from "./MenuItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="text-center m-4 p-4">
            <h1 className="text-2xl font-bold">Cart</h1>
            <div className="w-6/12 m-auto">
                <button className="p-2 m-2 bg-black text-white rounded-lg" onClick={handleClearCart}>
                    Clear Cart
                </button>
                {cartItems.length === 0 ? (
                    <h1>Your Cart is empty, Please add items to your cart</h1>
                ) : (
                    <MenuItemList items={cartItems} isCartPage={true} />
                )}
            </div>
        </div>
    );
};

export default Cart;
