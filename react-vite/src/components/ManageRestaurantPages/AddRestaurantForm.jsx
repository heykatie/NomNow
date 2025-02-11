// src/components/AddRestaurant/AddRestaurant.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRestaurant } from '../../redux/restaurants.js';

const AddRestaurant = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector(state => state.restaurants);

    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        cuisine_type: '',
        price_level: '',
        delivery_fee: '',
        business_hours: '',
        servicing: true,
        description: '',
        delivery_time: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitData = new FormData();

        Object.keys(formData).forEach(key => {
            submitData.append(key, formData[key]);
        });

        try {
            await dispatch(createRestaurant(submitData));
            navigate('/restaurants/manage');
        } catch (err) {
            console.error('Failed to create restaurant:', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'file') {
            const file = e.target.files[0];
            if (file) {
                setImagePreview(URL.createObjectURL(file));
                submitData.append('store_image', file);
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    return (
        <div>
            <h1>Add Your Restaurant</h1>
            {error && <div>{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Restaurant Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>ZIP Code</label>
                    <input
                        type="number"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>Cuisine Type</label>
                    <select
                        name="cuisine_type"
                        value={formData.cuisine_type}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Cuisine Type</option>
                        <option value="AMERICAN">American</option>
                        <option value="CHINESE">Chinese</option>
                        <option value="ITALIAN">Italian</option>
                        <option value="JAPANESE">Japanese</option>
                        <option value="MEXICAN">Mexican</option>
                        <option value="INDIAN">Indian</option>
                        <option value="THAI">Thai</option>
                        <option value="MEDITERRANEAN">Mediterranean</option>
                        <option value="KOREAN">Korean</option>
                        <option value="VIETNAMESE">Vietnamese</option>
                        <option value="GREEK">Greek</option>
                        <option value="SPANISH">Spanish</option>
                        <option value="SEAFOOD">Seafood</option>
                        <option value="PIZZA">Pizza</option>
                        <option value="VEGETARIAN">Vegetarian</option>
                        <option value="VEGAN">Vegan</option>
                        <option value="BREAKFAST">Breakfast</option>
                        <option value="FAST_FOOD">Fast Food</option>
                        <option value="CARIBBEAN">Caribbean</option>
                        <option value="SOUL_FOOD">Soul Food</option>
                    </select>
                </div>

                <div>
                    <label>Price Level</label>
                    <select
                        name="price_level"
                        value={formData.price_level}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Price Level</option>
                        <option value="INEXPENSIVE">$</option>
                        <option value="MODERATE">$$</option>
                        <option value="EXPENSIVE">$$$</option>
                        <option value="VERY_EXPENSIVE">$$$$</option>
                    </select>
                </div>

                <div>
                    <label>Delivery Fee</label>
                    <input
                        type="number"
                        name="delivery_fee"
                        value={formData.delivery_fee}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                    />
                </div>

                <div>
                    <label>Delivery Time (minutes)</label>
                    <input
                        type="number"
                        name="delivery_time"
                        value={formData.delivery_time}
                        onChange={handleInputChange}
                        min="1"
                    />
                </div>

                <div>
                    <label>Business Hours</label>
                    <input
                        type="text"
                        name="business_hours"
                        value={formData.business_hours}
                        onChange={handleInputChange}
                        placeholder="e.g., Mon-Fri: 9 AM - 10 PM"
                        required
                    />
                </div>

                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label>Restaurant Image</label>
                    <input
                        type="file"
                        name="store_image"
                        onChange={handleInputChange}
                        accept=".jpg,.jpeg,.png"
                    />
                    {imagePreview && (
                        <div>
                            <img src={imagePreview} alt="Preview" />
                        </div>
                    )}
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="servicing"
                            checked={formData.servicing}
                            onChange={handleInputChange}
                        />
                        Currently Servicing
                    </label>
                </div>

                <div>
                    <button type="submit">Add Restaurant</button>
                    <button type="button" onClick={() => navigate('/restaurants/manage')}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRestaurant;