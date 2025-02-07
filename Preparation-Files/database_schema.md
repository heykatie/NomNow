# Database Schema

# Layout 
<img width="538" alt="image" src="https://github.com/user-attachments/assets/bc1dc9bc-5b2b-422a-b634-1b18ef407cd5" />


## Users Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| firsName | varchar | NOT NULL |
| lastName | varchar | NOT NULL |
| phoneNumber | varchar | UNIQUE, NOT NULL |
| restaurantOwner | boolean | |
| address | varchar | NOT NULL |
| city | varchar | |
| state | varchar | |
| zip | int | |
| wallet | decimal | |
| hashedPassword | varchar | |
| email | varchar | NOT NULL |
| createdAt | timestamp | |
| updatedAt | timestamp | |

## Restaurants Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| ownerId | int | |
| address | varchar | NOT NULL |
| city | varchar | NOT NULL |
| state | varchar | NOT NULL |
| zip | int | NOT NULL |
| name | varchar | UNIQUE, NOT NULL |
| cuisineType | enum | |
| deliveryFee | decimal | |
| businessHours | varchar | NOT NULL |
| Servicing | boolean | |
| storeImage | url | |
| description | text | |
| priceLevel | enum | |
| deliveryTime | int | |
| createdAt | timestamp | |
| updatedAt | timestamp | |

## Reviews Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| restaurantId | int | |
| userId | int | |
| orderId | int | |
| review | text | |
| orderRating | int | |
| restarauntRating | int | |
| createdAt | timestamp | |
| updatedAt | timestamp | |

## MenuItems Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| restaurantId | int | |
| name | varchar | |
| foodtype | ENUM | ('Appetizers', 'Entrees', 'Desserts', 'Drinks') |
| description | text | |
| price | decimal | |
| foodImage | url | |
| createdAt | timestamp | |
| updatedAt | timestamp | |

## Orders Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| restaurantId | int | |
| userId | int | |
| totalCost | decimal | |
| status | enum | ('Completed', 'Canceled', 'Active') |
| promo | varchar | |
| createdAt | timestamp | |
| updatedAt | timestamp | |

## OrderItems Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| orderId | int | |
| menuItemId | int | |
| quantity | int | |
| price | decimal | |

## Foreign Key References
```
Users.id < Reviews.userId
Users.id < Orders.userId
Users.id < Restaurants.ownerId
Restaurants.id < MenuItems.restaurantId
Restaurants.id < Reviews.restaurantId
MenuItems.id < Orders.totalCost
MenuItems.restaurantId < Orders.restaurantId
Orders.id < OrderItems.orderId
MenuItems.id < OrderItems.menuItemId
```
