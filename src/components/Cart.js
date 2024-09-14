import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { clearCart, removeItem } from "../utils/cartSlice";
import { useCallback } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveItem = useCallback(
    (item) => {
      dispatch(removeItem(item));
    },
    [dispatch]
  );

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const price =
          item.card.info.price / 100 || item.card.info.defaultPrice / 100;
        const quantity = item.card.info.quantity || 1;
        return total + price * quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="text-center m-4 p-4">
      <div className="w-6/12 m-auto">
        {cartItems.length === 0 ? (
          <div className="text-center">
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
              alt="Empty Cart"
              className="w-48 h-48 mx-auto mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-4">
              You can go to the home page to view more restaurants
            </p>
            <Link to="/">
              <button className="bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-500 transition duration-300">
                See Restaurants Near You
              </button>
            </Link>
          </div>
        ) : (
          <div>
            {cartItems.map((item) => {
              const price =
                item.card.info.price / 100 || item.card.info.defaultPrice / 100;
              const quantity = item.card.info.quantity || 1;
              const totalPrice = price * quantity;

              return (
                <div
                  key={item.card.info.id}
                  className="bg-white shadow-lg rounded-lg flex p-4 max-w-2xl mx-auto mb-6"
                >
                  <div className="w-3/12 pr-4">
                    <img
                      src={CDN_URL + item.card.info.imageId}
                      className="rounded-xl w-full object-cover h-32"
                      alt={item.card.info.name}
                    />
                  </div>
                  <div className="w-9/12 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg mb-2">
                        {item.card.info.name}
                      </h3>
                      <div className="text-green-700 text-xl">
                        ₹ {price.toFixed(2)}
                      </div>
                      <div className="text-gray-500 text-sm mb-4">
                        Quantity: {quantity} x ₹ {price.toFixed(2)} = ₹{" "}
                        {totalPrice.toFixed(2)}
                      </div>
                    </div>
                    <button
                      className="bg-red-500 text-white py-1 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                      onClick={() => handleRemoveItem(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-4">
              <h2 className="text-lg font-bold mb-2">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Item Total:</span>
                <span>₹ {getTotalPrice()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Fee:</span>
                <span>₹ 47</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Discount:</span>
                <span>- ₹ 25</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Platform Fee:</span>
                <span>₹ 7.01</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>GST and Restaurant Charges:</span>
                <span>₹ 49.03</span>
              </div>
              <div className="flex justify-between font-bold mt-4">
                <span>Total Amount:</span>
                <span>
                  ₹ {parseFloat(getTotalPrice()) + 47 - 25 + 7.01 + 49.03}
                </span>
              </div>
              <button
                className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-500 transition duration-300 mt-4"
                onClick={() => alert('Proceeding to payment...')}
              >
                Pay
              </button>
            </div>
            <button
              className="bg-red-500 text-white py-1 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300 mb-4 mt-4"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
