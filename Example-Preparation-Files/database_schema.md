# Database Schema

# Layout 
<img width="848" alt="image" src="https://github.com/user-attachments/assets/93682c52-f826-4efe-8fd5-9067050d7d9d" />


## Users Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| firstName | varchar | NOT NULL |
| lastName | varchar | NOT NULL |
| phoneNumber | varchar | UNIQUE, NOT NULL |
| restarauntOwner | boolean | |
| address | varchar | NOT NULL |
| city | varchar | |
| state | varchar | |
| zip | int | |
| wallet | decimal | |
| hashedPassword | varchar | |
| email | varchar | NOT NULL |
| createdAt | timestamp | |
| updatedAt | timestamp | |

## Restaraunts Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| ownerId | int | |
| address | varchar | NOT NULL |
| city | varchar | NOT NULL |
| state | varchar | NOT NULL |
| zip | int | NOT NULL |
| name | varchar | UNIQUE, NOT NULL |
| cuisineType | varchar | |
| deliveryFee | decimal | |
| businessHours | varchar | NOT NULL |
| Servicing | boolean | |
| storeImage | url | |
| description | text | |
| priceLevel | int | |
| deliveryTime | int | |
| createdAt | timestamp | |
| updatedAt | timestamp | |

## Reviews Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| restarauntId | int | |
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
| restarauntId | int | |
| name | varchar | |
| foodtype | ENUM | ('Appetizers', 'Entrees', 'Desserts', 'Drinks') |
| description | text | |
| price | decimal | |
| foodImage | url | |
| createdAt | timestamp | |
| updatedAt | timestamp | |

## PastOrders Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| userId | int | |
| itemId | int | |
| quantity | int | |
| promo | varchar | |
| createdAt | timestamp | |
| updatedAt | timestamp | |

## Foreign Key References
```
Users.id < Reviews.userId
Users.id < PastOrders.userId
Users.id < Restaraunts.ownerId
Restaraunts.id < MenuItems.restarauntId
Restaraunts.id < Reviews.restarauntId
MenuItems.id < PastOrders.itemId
```
