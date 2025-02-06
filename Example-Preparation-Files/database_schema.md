# Database Schema

Link: https://dbdiagram.io/d/Nomnow-67577b48e9daa85aca2de6c4

## Layout
<img width="611" alt="image" src="https://github.com/user-attachments/assets/48257556-aaf7-44f5-975f-15c1776ada46" />


## Tables 

### Users
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| firstName | varchar | |
| lastName | varchar | |
| phoneNumber | varchar | |
| restarauntOwner | boolean | |
| address | varchar | |
| city | varchar | |
| state | varchar | |
| country | varchar | |
| zip | int | |
| lat | decimal | |
| lng | decimal | |
| paymentMethod | varchar | |
| walletBalance | decimal | |
| hashedPassword | varchar | |
| email | varchar | |
| createdAt | timestamp | |
| updatedAt | timestamp | |

### Restaraunts
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| ownerId | int | |
| address | varchar | |
| city | varchar | |
| state | varchar | |
| country | varchar | |
| zip | int | |
| lat | decimal | |
| lng | decimal | |
| name | varchar | |
| cuisineType | varchar | |
| deliveryFee | decimal | |
| BusinessHours | varchar | |
| Servicing | boolean | |
| storeImage | url | |
| description | text | |
| avgRating | decimal | |
| DeliveryTime | int | |
| createdAt | timestamp | |
| updatedAt | timestamp | |

### Reviews
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

### MenuItems
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| restarauntId | int | |
| name | varchar | |
| description | text | |
| price | decimal | |
| foodImage | url | |
| createdAt | timestamp | |
| updatedAt | timestamp | |

### ShoppingCart
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| userId | int | |
| itemId | int | |
| paymentMethod | varchar | |
| walletBalance | decimal | |
| quantity | int | |
| promo | varchar | |
| createdAt | timestamp | |
| updatedAt | timestamp | |

### Transactions
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| userId | int | |
| totalAmount | decimal | |
| status | ENUM | ('Pending', 'Completed', 'Canceled', 'Failed', 'Refunded') |
| createdAt | timestamp | |

### TransactionItems
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| userId | int | |
| itemId | int | |
| restarauntId | int | |
| price | decimal | |
| createdAt | timestamp | |

### Foreign Key References
```
Users.id < Reviews.userId
Users.id < ShoppingCart.userId
Users.id < TransactionItems.userId
Users.id < Restaraunts.ownerId
Users.id < Transactions.userId
Restaraunts.id < MenuItems.restarauntId
Restaraunts.id < Reviews.restarauntId
Restaraunts.id < TransactionItems.restarauntId
Users.paymentMethod < ShoppingCart.paymentMethod
Users.walletBalance < ShoppingCart.walletBalance
MenuItems.id < TransactionItems.itemId
MenuItems.id < ShoppingCart.itemId
```




