# Database Schema

# Layout
<img width="848" alt="image" src="https://github.com/user-attachments/assets/93682c52-f826-4efe-8fd5-9067050d7d9d" />


## Users Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| first_name | varchar | NOT NULL |
| last_name | varchar | NOT NULL |
| phone_number | varchar | UNIQUE | NOT NULL |
| restarauntOwner | boolean | |
| address | varchar | NOT NULL |
| city | varchar | NOT NULL |
| state | varchar | NOT NULL |
| zip | int | NOT NULL |
| wallet | decimal | |
| hashed_password | varchar | NOT NULL |
| email | varchar | NOT NULL |
| created_at | timestamp | |
| updated_at | timestamp | |

## Restaraunts Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| owner_id | int | |
| address | varchar | NOT NULL |
| city | varchar | NOT NULL |
| state | varchar | NOT NULL |
| zip | int | NOT NULL |
| name | varchar | UNIQUE, NOT NULL |
| cuisine_type | varchar | |
| delivery_fee | decimal | |
| business_hours | varchar | NOT NULL |
| servicing | boolean | |
| store_image | url | |
| description | text | |
| price_level | int | |
| delivery_time | int | |
| created_at | timestamp | |
| updated_at | timestamp | |

## Reviews Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| restarauntId | int | |
| user_id | int | |
| order_id | int | |
| review | text | |
| order_rating | int | |
| restarauntRating | int | |
| created_at | timestamp | |
| updated_at | timestamp | |

## MenuItems Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| restarauntId | int | |
| name | varchar | |
| foodtype | ENUM | ('Appetizers', 'Entrees', 'Desserts', 'Drinks') |
| description | text | |
| price | decimal | |
| food_image | url | |
| created_at | timestamp | |
| updated_at | timestamp | |

## PastOrders Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | int | PRIMARY KEY |
| user_id | int | |
| itemId | int | |
| quantity | int | |
| promo | varchar | |
| created_at | timestamp | |
| updated_at | timestamp | |

## Foreign Key References
```
Users.id < Reviews.user_id
Users.id < PastOrders.user_id
Users.id < Restaraunts.owner_id
Restaraunts.id < MenuItems.restarauntId
Restaraunts.id < Reviews.restarauntId
MenuItems.id < PastOrders.itemId
```
