import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserRestaurants, deleteRestaurant, updateRestaurant, reactivateRestaurant } from '../../redux/restaurants';

function ManageRestaurants() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { restaurants, error } = useSelector(state => state.restaurants);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        dispatch(getUserRestaurants());
    }, [dispatch, user, navigate, location]);

    const handleDelete = async (id) => {
        const choice = window.confirm(
            'How would you like to handle this restaurant?\n\n' +
            '1. Click OK to mark as inactive (Recommended)\n' +
            '2. Click Cancel to see permanent deletion options'
        );
    
        if (choice) {
            // Proceed with soft delete
            try {
                await dispatch(deleteRestaurant(id, 'soft'));
                dispatch(getUserRestaurants());
            } catch (error) {
                alert(error.message || 'Failed to deactivate restaurant');
            }
        } else {
            // Ask about hard delete
            const confirmHard = window.confirm(
                'WARNING: This will permanently delete the restaurant and ALL related data including orders and menu items.\n\n' +
                'This action cannot be undone. Are you sure you want to proceed?'
            );
            
            if (confirmHard) {
                try {
                    const result = await dispatch(deleteRestaurant(id, 'hard'));
                    if (result) {
                        dispatch(getUserRestaurants());
                    }
                } catch (error) {
                    alert(error.message || 'Failed to delete restaurant');
                }
            }
        }
    };

    const handleReactivate = async (restaurant) => {
        try {
            await dispatch(reactivateRestaurant(restaurant.id));
            // Refresh the list after reactivation
            dispatch(getUserRestaurants());
            alert('Restaurant successfully reactivated!');
        } catch (error) {
            alert(error.message || 'Failed to reactivate restaurant');
        }
    };
    const handleUpdate = (id) => {
        navigate(`/restaurants/${id}/update`);
    };

    if (!user) return null;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>My Restaurants</h1>
            {restaurants && restaurants.length > 0 ? (
                restaurants.map(restaurant => (
                    <div key={restaurant.id}>
                        <h2>{restaurant.name}</h2>
                        <p>Status: {restaurant.servicing ? 'Active' : 'Inactive'}</p>
                        {restaurant.servicing ? (
                            <button onClick={() => handleDelete(restaurant.id)}>
                                Deactivate/Delete Restaurant
                            </button>
                        ) : (
                            <button onClick={() => handleReactivate(restaurant)}>
                                Reactivate Restaurant
                            </button>
                        )}
                        <button onClick={() => handleUpdate(restaurant.id)}>
                            Update Info
                        </button>
                        <button onClick={() => navigate(`/restaurants/${restaurant.id}/menu`)}>
                            Update Menu
                        </button>
                    </div>
                ))
            ) : (
                <p>No restaurants found</p>
            )}
        </div>
    );
}

export default ManageRestaurants;