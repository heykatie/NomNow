import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getRestaurant } from '../../redux/restaurants';
import { getMenuItems } from '../../redux/menuItems'; // Import the menu items action

function RestaurantDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { currentRestaurant, error } = useSelector(state => state.restaurants);
    const { menuItems } = useSelector(state => state.menuItems); // Get menu items from Redux store

    useEffect(() => {
        if (id) {
            dispatch(getRestaurant(id));
            dispatch(getMenuItems()); // Fetch all menu items
        }
    }, [dispatch, id]);

    // Debug logs
    console.log("Current Restaurant Data:", currentRestaurant);
    console.log("Menu Items:", menuItems);
    console.log("Error State:", error);

    if (error) return <div>Error: {error}</div>;
    if (!currentRestaurant?.restaurant) return <div>Loading...</div>;

    // Access the nested restaurant data
    const restaurant = currentRestaurant.restaurant;
    
    // Filter menu items for this restaurant
    const restaurantMenuItems = menuItems.filter(item => item.restaurantId === parseInt(id));

    return (
        <div>
            {/* Header Image */}
            <div>
                <img 
                    src={restaurant.storeImage} 
                    alt={restaurant.name}
                />
            </div>

            {/* Restaurant Name and Search Section */}
            <div>
                <div>
                    <h1>{restaurant.name}</h1>
                    <div>
                        <span>{restaurant.deliveryTime} min</span>
                        <span>{restaurant.priceLevel}</span>
                        <span>{restaurant.cuisineType}</span>
                    </div>
                    <p>{restaurant.address}, {restaurant.city}, {restaurant.state} {restaurant.zip}</p>
                </div>
                
                <div>
                    <input 
                        type="search" 
                        placeholder={`Search in ${restaurant.name || 'restaurant'}`}
                    />
                </div>
            </div>

            {/* Delivery Options */}
            <div>
                <button>Delivery ${restaurant.deliveryFee}</button>
                <button>Pickup</button>
                <button>Group order</button>
            </div>

            {/* Menu Section */}
            <div>
                <h2>Menu</h2>
                {restaurantMenuItems.length > 0 ? (
                    <div>
                        {restaurantMenuItems.map(item => (
                            <div key={item.id}>
                                <img src={item.food_image} alt={item.name} />
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p>${item.price}</p>
                                    <p>Type: {item.food_type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No menu items available</p>
                )}
            </div>

            {/* Business Hours */}
            <div>
                <p>{restaurant.businessHours}</p>
            </div>
        </div>
    );
}

export default RestaurantDetail;