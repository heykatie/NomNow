# Database Schema

## Users
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| firsName | varchar | |
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

## Restaraunts
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
| imgUrl | url | |
| description | text | |
| avgRating | decimal | |
| DeliveryTime | int | |
| createdAt | timestamp | |
| updatedAt | timestamp | |

## Reviews
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

## menuItems
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| restarauntId | int | |
| name | varchar | |
| description | text | |
| price | decimal | |
| imgUrl | url | |
| createdAt | timestamp | |
| updatedAt | timestamp | |

## shoppingCart Table
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

## Transactions Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| userId | int | |
| totalAmount | decimal | |
| status | ENUM | ('Pending', 'Completed', 'Canceled', 'Failed', 'Refunded') |
| createdAt | timestamp | |

## TransactionItems Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| userId | int | |
| itemId | int | |
| restarauntId | int | |
| price | decimal | |
| createdAt | timestamp | |

## Foreign Key References
```
Users.id < Reviews.userId
Users.id < shoppingCart.userId
Users.id < TransactionItems.userId
Users.id < Restaraunts.ownerId
Users.id < Transactions.userId
Restaraunts.id < menuItems.restarauntId
Restaraunts.id < Reviews.restarauntId
Restaraunts.id < TransactionItems.restarauntId
Users.paymentMethod < shoppingCart.paymentMethod
Users.walletBalance < shoppingCart.walletBalance
menuItems.id < TransactionItems.itemId
menuItems.id < shoppingCart.itemId
```
