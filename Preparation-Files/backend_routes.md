## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication
All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "errors": ["Unauthorized"]
    }
    ```


### Get current user

Authenticates current user and returns their information as a dictionary

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/auth
  * Body: none
* Successful response when there is a logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
     "id": 1,
     "firstName": "Demo",
     "lastName": "Lition",
     "phoneNumber": "123-456-7890",
     "email": "demo@user.io",
     "address": "123 Main St",
     "city": "Los Angeles",
     "state": "CA",
     "zip": 90001,
     "wallet": 818947.57,
     "restarauntOwner": true,
     "created_at": "2023-09-03T00:00:00Z",
     "updated_at": "2023-09-03T00:00:00Z"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "errors": [
      "Unauthorized"
     ]
  }
  ```


### Log in a user

Logs in a current user with valid credentials and returns the current user's information

* Require Authentication
* Request
  * Method: POST
  * URL: /api/auth/login
  * Body:

  ```json
  {
    "email": "demo@user.io",
    "password": "password"
  }
  ```

* Successful response
  * Status Code: 200
  * Headers
    * Content-Type: application/json
  * Body:

  ```json
    {
       "id": 1,
       "firstName": "Demo",
       "lastName": "Lition",
       "phoneNumber": "123-456-7890",
       "email": "demo@user.io",
       "address": "123 Main St",
       "city": "Los Angeles",
       "state": "CA",
       "zip": 90001,
       "wallet": 818947.57,
       "restarauntOwner": true,
       "created_at": "2023-09-03T00:00:00Z",
       "updated_at": "2023-09-03T00:00:00Z"
    }
  ```

* Error response: Body validation errors
  * Status Code: 401
  * Headers
    * Content-Type: application/json
  * Body:

  ```json
  {
    "errors": [
      "Invalid email or password"
    ]
  }
  ```

### Log out a user

Logs out current user

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/auth/login
  * Headers:
    * Content-Type: application/json
  * Body: None

  * Successful response:

    ```json
    {
      "message": {
        "User logged out"
      }
    }
    ```

### Sign up a user

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/auth/signup
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "email": "test@gmail.com",
      "password": "password",
      "firstName": "Testo",
      "lastName": "Test",
      "phoneNumber": "123-456-7890",
      "address": "1 E South Street",
      "city": "Los Angeles",
      "state": "CA",
      "zip": "90001"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 9,
      "firstName": "Testo",
      "lastName": "Test",
      "phoneNumber": "123-456-7890",
      "email": "test@gmail.com",
      "address": "1 E South Street",
      "city": "Los Angeles",
      "state": "CA",
      "zip": 90001,
      "wallet": 0.00,
      "restarauntOwner": false,
      "created_at": "2023-09-04T00:00:00Z",
      "updated_at": "2023-09-04T00:00:00Z"
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "errors": [
        "email : Email address is already in use."
      ]
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "errors": [
        "email: Please provide a valid email address."
        "password: This field is required."
        "firstName: This field is required."
        "lastName: This field is required."
        "phoneNumber: This field is required."
        "address: This field is required."
        "city: This field is required."
        "state: This field is required."
        "zip: This field is required."
      ]
    }
    ```


## RESTAURANTS

### Get all restaurants with at least one menu item

Returns all restaurants that have at least one menu item

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/restaurants
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "restaurants": [
      {
        "id": 1,
        "name": "Gusanoz",
        "owner_id": 1,
        "price_level": 1,
        "cuisine_type": "Mexican",
        "store_image": "https://main-image.jpg",
        "address": "59 Main St",
        "city": "Vancouver",
        "state": "BC",
        "zip": "V5K 0A1",
        "delivery_fee": 5.00,
        "business_hours": "9:00 AM - 9:00 PM",
        "servicing": true,
        "description": "Authentic Mexican cuisine with fresh ingredients.",
        "avgRating": 4.5,
        "delivery_time": 30,
        "created_at": "2023-09-03T00:00:00Z",
        "updated_at": "2023-09-03T00:00:00Z"
      }
    ]
  }


### Get all restaurants by category

Returns all restaurants of a particular category

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/restaurants/category/:category
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "restaurants": [
      {
        "id": 8,
        "name": "Mike's Grill",
        "owner_id": 6,
        "price_level": 4,
        "cuisine_type": "Fast_Food",
        "store_image": "https://shes.jpg",
        "address": "876 Oak Rd",
        "city": "Grilleville",
        "state": "NY",
        "zip": "12345",
        "delivery_fee": 5.00,
        "business_hours": "10:00 AM - 10:00 PM",
        "servicing": true,
        "description": "Delicious fast food with high-quality ingredients.",
        "avgRating": 4.2,
        "delivery_time": 25,
        "created_at": "2023-09-03T00:00:00Z",
        "updated_at": "2023-09-03T00:00:00Z"
      }
    ]
  }
  ```


### Get all restauratns by current user

Returns all restaurants owned and managed by current user

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/restaurants/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "restaurants": [
      {
        "id": 1,
        "name": "Gusanoz",
        "owner_id": 1,
        "address": "59 Main St",
        "city": "Vancouver",
        "state": "BC",
        "zip": 12345,
        "cuisine_type": "Mexican",
        "delivery_fee": 5.99,
        "business_hours": "9:00 AM - 9:00 PM",
        "servicing": true,
        "store_image": "https://main-image.jpg",
        "description": "Authentic Mexican food",
        "price_level": 2,
        "delivery_time": 30,
        "created_at": "2023-09-03T00:00:00Z",
        "updated_at": "2023-09-03T00:00:00Z"
      },
   ]
  }
  ```


### Get details of one restaurant

Returns details of a restaurant specified by id

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/restaurants/:restaurant_id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "restaurant": {
      "id": 1,
      "name": "Gusanoz",
      "owner_id": 1,
      "address": "59 Main St",
      "city": "Vancouver",
      "state": "BC",
      "zip": 12345,
      "cuisine_type": "Mexican",
      "delivery_fee": 5.99,
      "business_hours": "9:00 AM - 9:00 PM",
      "servicing": true,
      "store_image": "https://image.jpg",
      "description": "Authentic Mexican food",
      "price_level": 2,
      "delivery_time": 30,
      "created_at": "2023-09-03T00:00:00Z",
      "updated_at": "2023-09-03T00:00:00Z"
    }
  }
  ```


### Create a restaurant

Creates and returns a restaurant

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/restaurants/new
  * Body:

  ```json
  {
    "name": "The Local lol",
    "address": "824 Hinton Ave",
    "city": "Vancouver",
    "state": "BC",
    "zip": 12345,
    "cuisine_type": "Fast Food",
    "delivery_fee": 3.99,
    "business_hours": "9:00 AM - 9:00 PM",
    "servicing": true,
    "store_image": "https://No_image_available.svg",
    "description": "Casual fast food restaurant",
    "price_level": 3,
    "delivery_time": 20
  }
  ```
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "restaurant": {
      "id": 12,
      "name": "The Local lol",
      "owner_id": 1,
      "address": "824 Hinton Ave",
      "city": "Vancouver",
      "state": "BC",
      "zip": 12345,
      "cuisine_type": "Fast Food",
      "delivery_fee": 3.99,
      "business_hours": "9:00 AM - 9:00 PM",
      "servicing": true,
      "store_image": "https://No_image_available.svg",
      "description": "Casual fast food restaurant",
      "price_level": 3,
      "delivery_time": 20,
      "created_at": "2023-09-04T00:00:00Z",
      "updated_at": "2023-09-04T00:00:00Z"
    }
  }
  ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "errors": [
      "name : This field is required.",
      "address: This field is required.",
      "city: This field is required.",
      "state: This field is required.",
      "zip: This field is required.",
      "cuisine_type: This field is required.",
      "delivery_fee: This field is required.",
      "business_hours: This field is required.",
      "servicing: This field is required.",
      "store_image: This field is required.",
      "description: This field is required.",
      "price_level: This field is required.",
      "price_level: Number must be between 1 and 4.",
      "delivery_time: This field is required."
    ]
  }
  ```


### Update a restaurant

Updates and returns a restaurant by id

* Require Authentication: true
* Request
  * Method: PUT
  * URL: /api/restaurants/:restaurant_id/update
  * Body:

  ```json
  {
    "name": "The Local - Update",
    "address": "824 Hinton Ave",
    "city": "Vancouver",
    "state": "BC",
    "zip": 12345,
    "cuisine_type": "Fast Food",
    "delivery_fee": 3.99,
    "business_hours": "9:00 AM - 9:00 PM",
    "servicing": true,
    "store_image": "https://No_image_available.svg",
    "description": "Updated casual fast food restaurant",
    "price_level": 3,
    "delivery_time": 20
  }
  ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "restaurant": {
      "id": 12,
      "name": "The Local - update",
      "owner_id": 1,
      "address": "824 Hinton Ave",
      "city": "Vancouver",
      "state": "BC",
      "zip": 12345,
      "cuisine_type": "Fast Food",
      "delivery_fee": 3.99,
      "business_hours": "9:00 AM - 9:00 PM",
      "servicing": true,
      "store_image": "https://No_image_available.svg",
      "description": "Updated casual fast food restaurant",
      "price_level": 3,
      "delivery_time": 20,
      "created_at": "2023-09-04T00:00:00Z",
      "updated_at": "2023-09-04T00:00:00Z"
    }
  }
  ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "errors": [
      "name: This field is required.",
      "name: Field must be between 1 and 255 characters long.",
      "address: This field is required.",
      "address: Field must be between 5 and 255 characters long.",
      "city: This field is required.",
      "state: This field is required.",
      "zip: This field is required.",
      "cuisine_type: This field is required.",
      "delivery_fee: This field is required.",
      "business_hours: This field is required.",
      "servicing: This field is required.",
      "store_image: This field is required.",
      "description: This field is required.",
      "price_level: This field is required.",
      "price_level: Number must be between 1 and 4.",
      "delivery_time: This field is required."
    ]
  }
  ```


### Delete a Restaurant

Delete a restaurant and return a successful message

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/restaurants/:restaurant_id/delete
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "id": 13,
    "message": "Successfully deleted restaurant"
  }
  ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "message": "Unable to delete"
  }
  ```


## MENU ITEMS

### Get all menu items for a restaurant

Returns all menu items for a restaurant determined by id

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/restaurants/:restaurant_id/menu
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "menu_items": [
      {
        "id": 1,
        "name": "Chips and Guac",
        "description": "fresh and made in house",
        "food_image": "https://id1.jpg",
        "price": 11.0,
        "restaurant_id": 1,
        "food_type": "Appetizers",
        "created_at": "2023-09-03T00:00:00Z",
        "updated_at": "2023-09-03T00:00:00Z"
      },
    ]
  }
  ```

### Create menu item

Creates and returns a new menu item for a restaurant determined by id

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/restaurants/:resaurantId/menu/new
  * Body:

  ```json
  {
    "name": "testo",
    "food_type": "Entrees",
    "price": 20.00,
    "description": "no",
    "food_image": "https://imagesite.com"
  }
  ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "id": 111,
    "name": "testo",
    "description": "no",
    "food_image": "https://imagesite.com",
    "price": 20.0,
    "restaurant_id": 1,
    "food_type": "Entrees",
    "created_at": "2023-09-04T00:00:00Z",
    "updated_at": "2023-09-04T00:00:00Z"
  }
  ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "errors": {
        "image_url": [
            "This field is required."
            "Invalid URL."
        ],
        "name": [
            "This field is required."
        ],
        "price": [
            "This field is required."
        ],
        "type": [
            "This field is required."
        ]
    }
  }
  ```


### Update a menu item

Updates and returns updated menu item for a restaurant

* Require Authentication: true
* Request
  * Method: PUT
  * URL: /api/menu-items/:menuItemId/update
  * Body:

  ```json
  {
    "name": "testo - update",
    "food_type": "Entrees",
    "price": 20.00,
    "description": "no",
    "food_image": "https://imagesite.com"
  }
  ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "id": 112,
    "name": "testo - update",
    "description": "no",
    "food_image": "https://imagesite.com",
    "price": 20.0,
    "restaurant_id": 1,
    "food_type": "Entrees",
    "created_at": "2023-09-04T00:00:00Z",
    "updated_at": "2023-09-04T00:00:00Z"
  }
  ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "errors": {
        "image_url": [
            "This field is required."
            "Invalid URL."
        ],
        "name": [
            "This field is required."
        ],
        "price": [
            "This field is required."
        ],
        "type": [
            "This field is required."
        ]
    }
  }
  ```

### Delete a menu item

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/menu-items/:menuItemId/delete
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "id": 13,
    "message": "Successfully deleted menu item"
  }
  ```

* Error Response: None



## REVIEWS

### Get reviews for a restaurant

Returns all reviews for a restaurant determined by id

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/restaurants/:resaurantId/reviews
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "reviews": [
      {
        "id": 1,
        "restaurant_id": 1,
        "order_id": 123,
        "review": "Delicious food and a great ambiance! I would recommend the al pastor tacos, they're great and are served with very generous portions of sides.",
        "order_rating": 5,
        "restaurant_rating": 5,
        "user_id": 2,
        "user": {
          "id": 2,
          "firstName": "Jane",
          "lastName": "Doe",
          "phoneNumber": "123-456-7890",
          "email": "jane@gmail.com",
          "address": "45 Oak Ave",
          "city": "Sample City",
          "state": "Sample State",
          "zip": 12345,
          "wallet": "143850.87",
          "created_at": "Sun, 03 Sep 2023 00:00:00 GMT",
          "updated_at": "Sun, 03 Sep 2023 00:00:00 GMT"
        },
        "created_at": "Sun, 03 Sep 2023 00:00:00 GMT",
        "updated_at": "Sun, 03 Sep 2023 00:00:00 GMT"
      },
    ]
  }
  ```

### Create a review for a restaurant

Creates and returns a review for a restaurant determined by id

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/restaurants/:resaurantId/reviews
  * Body:

  ```json
  {
    "review": "testo",
    "order_rating": 5,
    "restaurant_rating": 5
  }
  ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "id": 31,
    "restaurant_id": 1,
    "review": "testo",
    "order_rating": 5,
    "restaurant_rating": 5,
    "user_id": 1,
    "user": {
      "id": 1,
      "firstName": "Demo",
      "lastName": "Lition",
      "phoneNumber": "123-456-7890",
      "lastName": "Lition",
      "email": "user@demo.io",
      "address": "123 Main St",
      "city": "Sample City",
      "state": "Sample State",
      "zip": 12345,
      "wallet": "818947.57",
      "created_at": "Sun, 03 Sep 2023 00:00:00 GMT",
      "updated_at": "Sun, 03 Sep 2023 00:00:00 GMT"
    },
   "created_at": "Mon, 04 Sep 2023 00:00:00 GMT",
    "updated_at": "Mon, 04 Sep 2023 00:00:00 GMT"
  }
  ```

* Error response: User already submitted a review for a specific restaurant
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "message": "You can only submit one review for a restaurant"
  }
  ```

* Error response: User tried submitting a review for a restaurant for which they do not have a past order
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "You must have ordered from a restaurant to create a review"
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "errors": [
      "review : This field is required",
      "review : Field must be between 5 and 800 characters long.",
      "order_rating : This field is required",
      "order_rating : Number must be between 1 and 5",
      "restaurant_rating : This field is required",
      "restaurant_rating : Number must be between 1 and 5"
    ]
  }
  ```


### Delete a review

Deletes a review and returns a success message

* Require Authentication: true
* Require proper authorization: User must have been the one to create the review
* Request
  * Method: DELETE
  * URL: /api/reviews/:reviewId/delete
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "message": "success"
  }
  ```

* Error Response: Review could not be deleted for any reason
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "message": "Review couldn't be found"
  }
  ```


## Order Routes

### Get past orders

Returns all past orders for a user determined by Id

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/orders/:order_id
  * Body: None

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "past_orders": [
      {
        "id": 1,
        "restaurant_id": 23,
        "user_id": 1,
        "totalCost": 11.0,
        "status": "Active",
        "promo": "SUMMER20",
        "orderItems": [
          {
            "id": 1,
            "name": "Chips and Guac",
            "restaurant_id": 1,
            "food_type": "Appetizers",
            "description": "Fresh and made in-house",
            "food_image": "https://id1.jpg",
            "price": 11.0,
            "created_at": "Sun, 03 Sep 2023 00:00:00 GMT",
            "updated_at": "Sun, 03 Sep 2023 00:00:00 GMT"
          },
        ],
        "created_at": "Sun, 03 Sep 2023 00:00:00 GMT",
        "updated_at": "Sun, 03 Sep 2023 00:00:00 GMT"
      },
    ]
  }
  ```

### Create a past order

Creates and returns a past order

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/orders
  * Body:

  ```json
  {
    // "menu_items": "1,13,85", // if you wanted to order multiple items
    "items": {"menu_item_id": 12, "quantity": 3},
    "promo": "SUMMER20",
    "restaurant_id": 1
  }
  ```
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "id": 1,
    "restaurant_id": 23,
    "user_id": 1,
    "totalCost": 11.0,
    "status": "Active",
    "promo": "SUMMER20",
    "orderItems": [
      {
        "id": 1,
        "name": "Chips and Guac",
        "restaurant_id": 1,
        "food_type": "Appetizers",
        "description": "Fresh and made in-house",
        "food_image": "https://id1.jpg",
        "price": 11.0,
        "created_at": "Sun, 03 Sep 2023 00:00:00 GMT",
        "updated_at": "Sun, 03 Sep 2023 00:00:00 GMT"
      },
    ],
    "created_at": "Sun, 03 Sep 2023 00:00:00 GMT",
    "updated_at": "Sun, 03 Sep 2023 00:00:00 GMT"
  },
  ```

* Error Response: Body validation error
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

  ```json
  {
    "errors": {
      "items": [
        "This field is required",
      ],
      "restaurant_id": [
        "This field is required"
      ]
    }
  }
  ```