import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRestaurant } from '../../redux/restaurants';
import { getMenuItems } from '../../redux/menuItems'; // Import the menu items action
//import { getReviewsForRestThunk } from '../../redux/reviews';
import './RestaurantDetail.css'
function RestaurantDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { currentRestaurant, error } = useSelector(state => state.restaurants);
    const [deliveryMethod, setDeliveryMethod] = useState('delivery');
    const { menuItems } = useSelector(state => state.menuItems); // Get menu items from Redux store
   // const { reviews } = useSelector(state => state.reviews);
    useEffect(() => {
        if (id) {
            dispatch(getRestaurant(id));
            dispatch(getMenuItems()); // Fetch all menu items
            //dispatch(getReviewsForRestThunk(id));
        }
    }, [dispatch, id]);

    // Debug logs
    //console.log("Current Restaurant Data:", currentRestaurant);
    console.log("Menu Items:", menuItems);
    console.log("Error State:", error);

    if (error) return <div>Error: {error}</div>;
    if (!currentRestaurant?.restaurant) return <div>Loading...</div>;

    // nested restaurant data 
    const restaurant = currentRestaurant.restaurant;
    
    // Filter menu items for this restaurant
    const restaurantMenuItems = menuItems.filter(item => item.restaurantId === parseInt(id));


    //const reviews = reviews.
    return (
        <div className="restaurant-detail">
            {/* Header Image */}
            <div className="restaurant-hero">
                <img src={restaurant.storeImage} alt={restaurant.name} />
            </div>
    
            {/* Restaurant Name and Search Section */}
            <div className="restaurant-info-section">
                <div className="restaurant-main-info">
                    <h1>{restaurant.name}</h1>
                    <div className="restaurant-details">
                        <span>{restaurant.deliveryTime} min</span>
                        <span>{restaurant.priceLevel}</span>
                        <span className="tag">{restaurant.cuisineType}</span>
                    </div>
                    <p>{restaurant.address}, {restaurant.city}, {restaurant.state} {restaurant.zip}</p>
                </div>
                
                <div className="search-section">
                    <input 
                        type="search" 
                        className="search-input"
                        placeholder={`Search in ${restaurant.name || 'restaurant'}`}
                    />
                </div>
            </div>
    
            {/* Delivery Options */}
            <div className="delivery-header">
                <div className="delivery-toggle" data-active={deliveryMethod}>
                    <button 
                        className={deliveryMethod === 'delivery' ? 'active' : ''} 
                        onClick={() => setDeliveryMethod('delivery')}
                    >
                        Delivery
                    </button>
                    <button 
                        className={deliveryMethod === 'pickup' ? 'active' : ''} 
                        onClick={() => setDeliveryMethod('pickup')}
                    >
                        Pickup
                    </button>
                    <div className="slider"></div>
                </div>

                <button className="group-order-btn">
                    <span className="icon">👥</span>
                    Group order
                </button>

                <div className="delivery-info">
                    <div className="info-item">
                        <span className="delivery-fee">${restaurant.deliveryFee ? `${restaurant.deliveryFee} Delivery Fee on $15+` : '$0 Delivery Fee on $15+'}</span>
                        <span className="info-label">Pricing & fees</span>
                    </div>

                    <div className="info-item">
                        <span className="arrival-time">{restaurant.deliveryTime} min</span>
                        <span className="info-label">Earliest arrival</span>
                    </div>
                </div>
            </div>
    
            {/* Menu Section */}
            <div className="menu-section">
                <h2>Menu</h2>
                {restaurantMenuItems.length > 0 ? (
                    <div className="menu-grid">
                        {restaurantMenuItems.map(item => (
                            <div key={item.id} className="menu-item">
                                <img src={item.food_image} alt={item.name} />
                                <div className="menu-item-info">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p className="price">${item.price}</p>
                                    <p className="tag">{item.food_type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No menu items available</p>
                )}
            </div>
    
            {/* Business Hours */}
            <div className="business-hours">
                <p>{restaurant.businessHours}</p>
            </div>
        </div>
    );
}

export default RestaurantDetail;