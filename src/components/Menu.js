import { useSelector } from 'react-redux';
import MenuItemList from './MenuItemList';

const Menu = () => {
    const menuItems = useSelector((store) => store.menu.items); // Fetch menu items from store
    const isLoading = useSelector((store) => store.menu.isLoading); // Fetch loading state from store

    console.log(menuItems)

    return (
        <div className="text-center m-4 p-4">
            <h1 className="text-2xl font-bold">Menu</h1>
            <div className="w-6/12 m-auto">
                <MenuItemList items={menuItems} isCartPage={false} isLoading={isLoading}/>
            </div>
        </div>
    );
};

export default Menu;