# NomNow Redux State

```javascript
{
  users: {
    1:{
      id: 1,
      firstName: 'Demo',
      lastName: 'AA',
      email: "demo@aa.io",
    },
    2: {
      id: 2,
      firstName: 'Demo',
      lastName: 'AA',
      email: "demo@aa.io",
    }
  },
  cart: {
    userId: 2,
    storeId: 2124,
    storeName: 'FireWings', // optional
    storeAddress: 'etc', // optional
    items: {
      1: {
        itemId: 321,
        quantity: 3,
        name: 'Chicken Wings',
        price: 3.20,
      },
      2: {
        itemId: 4343,
        quantity: 1,
        name: 'Chicken Wings',
        price: 3.20,
      },
      3: {
        itemId: 23,
        quantity: 2,
        name: 'Chicken Wings',
        price: 3.20,
      }
    },
    total: 55,
    tax: 0.04,
    deliveryFee: 5,
  },
  session: {
    user: {
      id: 23,
      firstName: 'Bob',
      lastName: 'Bobber',
      email: 'BobBobber@aa.io',
      phone: '14125232345',
      wallet: 100,
      restaurantOwner: true,
      address: '22 Forever Drive',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90210',
    },
    pastOrders: {
      1: {
        orderId: 123,
        order: {
            userId: 2,
            storeId: 2124,
            storeName: 'FireWings', // optional
            storeAddress: 'etc', // optional
            items: {
              1: {
                itemId: 321,
                quantity: 3,
                name: 'Chicken Wings',
                price: 3.20,
              },
              2: {
                itemId: 4343,
                quantity: 1,
                name: 'Chicken Wings',
                price: 3.20,
              },
              3: {
                itemId: 23,
                quantity: 2,
                name: 'Chicken Wings',
                price: 3.20,
              }
            },
            total: 55,
            tax: 0.04,
            deliveryFee: 5,
          },
        },
      2: {
        orderId: 332,
        order: {
          userId: 2,
          storeId: 2124,
          storeName: 'FireWings', // optional
          storeAddress: 'etc', // optional
          items: {
            1: {
              itemId: 321,
              quantity: 3,
              name: 'Chicken Wings',
              price: 3.20,
            },
            2: {
              itemId: 4343,
              quantity: 1,
              name: 'Chicken Wings',
              price: 3.20,
            },
            3: {
              itemId: 23,
              quantity: 2,
              name: 'Chicken Wings',
              price: 3.20,
            }
          },
          total: 55,
          tax: 0.04,
          deliveryFee: 5,
        },
      },
    },
  },
  restaurants: {
    1: {
      id: 23,
      name: 'FireWings',
      ownerId: 3,
      priceLevel: 2,
      address: '464 8th Street',
      city: 'Oakland',
      state: 'CA',
      zip: '94607',
      cuisineType: 'Asian',
      deliveryFee: 3.20,
      businessHours: ,
      servicing: true,
      storeImage: 'banner.img',
      description: 'blah blah',
      deliveryTime: 30
      menu: {
        1: {
          id: 2,
          name: 'Wings',
          foodType: 'Entree',
          description: 'crispy',
          price: 3.99,
          foodImage: 'wings.url',
        },
        2: {
          id: 43,
          name: 'Wings',
          foodType: 'Entree',
          description: 'crispy',
          price: 3.99,
          foodImage: 'wings.url',
        },
        3: {
          id: 14,
          name: 'Wings',
          foodType: 'Entree',
          description: 'crispy',
          price: 3.99,
          foodImage: 'wings.url',
        }
      },
      reviews: {
        1: {
          id: 23,
          restaurantId: 2,
          userId: 4,
          orderId: 42,
          review: 'great',
          orderRating: 5,
          restaurantRating: 4
        },
        2: {
          id: 233,
          restaurantId: 32,
          userId: 14,
          orderId: 42,
          review: 'great',
          orderRating: 5,
          restaurantRating: 4
        },
        3: {
          id: 123,
          restaurantId: 22,
          userId: 4,
          orderId: 42,
          review: 'great',
          orderRating: 5,
          restaurantRating: 4
        }
      },
    },
    2: {
      id: 123,
      name: 'FireWings2',
      ownerId: 3,
      priceLevel: 2,
      address: '464 8th Street',
      city: 'Oakland',
      state: 'CA',
      zip: '94607',
      cuisineType: 'Asian',
      deliveryFee: 3.20,
      businessHours: ,
      servicing: true,
      storeImage: 'banner.img',
      description: 'blah blah',
      deliveryTime: 30,
      menu: {
        1: {
          id: 2,
          name: 'Wings',
          foodType: 'Entree',
          description: 'crispy',
          price: 3.99,
          foodImage: 'wings.url',
        },
        2: {
          id: 43,
          name: 'Wings',
          foodType: 'Entree',
          description: 'crispy',
          price: 3.99,
          foodImage: 'wings.url',
        },
        3: {
          id: 14,
          name: 'Wings',
          foodType: 'Entree',
          description: 'crispy',
          price: 3.99,
          foodImage: 'wings.url',
        }
      },
      reviews: {
        1: {
          id: 23,
          restaurantId: 2,
          userId: 4,
          orderId: 42,
          review: 'great',
          orderRating: 5,
          restaurantRating: 4
        },
        2: {
          id: 233,
          restaurantId: 32,
          userId: 14,
          orderId: 42,
          review: 'great',
          orderRating: 5,
          restaurantRating: 4
        },
        3: {
          id: 123,
          restaurantId: 22,
          userId: 4,
          orderId: 42,
          review: 'great',
          orderRating: 5,
          restaurantRating: 4
        }
      },
    }
  },
  errors: [
    "Unauthorized",
    "Incorrect username/password combination",
    "Title cannot exceed 20 characters in length"
  ]
}
```
