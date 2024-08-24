import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

const MenuItemList = ({items}) => {
    console.log(items);

    const dispatch = useDispatch();

    const handleAddItem = (item) => {
      //Dispatch an action
      dispatch(addItem(item));
    }

    return (
        <div className="">
            {items.map(item => <div key={item.card.info.id}
            className="flex justify-between p-2 m-2 border-gray-200 border-b-2 text-left">
            {/* <div className="w-9/12">
            <div className="font-bold">
                <div>{item.card.info.name}</div>
                <div> ₹ {item.card.info.price/100 || item.card.info.defaultPrice/100}</div>
            </div>
            <div className="my-2 text-[16px] text-gray-700">{item.card.info.description}</div>
            </div>

            <div className="p-4 w-3/12 relative">
            <img 
                src={CDN_URL + item.card.info.imageId} 
                className="rounded-xl w-full h-auto object-cover"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <button className="rounded-lg p-2 bg-white shadow-lg text-green-700 text-lg">
                Add
                </button>
            </div>
            </div> */}
    <div className="bg-white shadow-lg rounded-lg flex p-4 max-w-xl mx-auto mb-6 transform transition duration-100 hover:scale-105">
    <div className="w-9/12 pr-4">
    <div className="font-bold text-lg mb-2">
      <div>{item.card.info.name}</div>
      <div className="text-green-700">₹ {item.card.info.price/100 || item.card.info.defaultPrice/100}</div>
    </div>
    <div className="text-gray-700 text-[16px] mb-4">{item.card.info.description}</div>
  </div>
  <div className="w-3/12 relative">
    <img src={CDN_URL + item.card.info.imageId} className="rounded-xl w-full object-cover" />
    <button className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-1 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
            onClick={() => handleAddItem(item)}
    >
      Add
    </button>
  </div>
</div>






            </div>

            )}
        </div>
    )
}

export default MenuItemList;