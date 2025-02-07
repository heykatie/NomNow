from app.models.db import db, environment, SCHEMA
from app.models.menu_items import MenuItem
from sqlalchemy.sql import text
import datetime

menu_items = [{
        "id": 1,
        "restaurantId": 1,
        "name": "Guacamole Dip",
        "foodType": "appetizer",
        "description": "Fresh and made in house",
        "price": 9,
        "foodImage": "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/04/Guacamole-3-2.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 2,
        "restaurantId": 1,
        "name": "Empanada",
        "foodType": "appetizer",
        "description": "Chicken or Beef Serve with mole sauce",
        "price": 10,
        "foodImage": "https://stordfkenticomedia.blob.core.windows.net/df-us/rms/media/recipesmedia/recipes/foodservice/desktop%20images/2019/dec/2020_veggie-empanadas_900x600_1.jpg?ext=.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 3,
        "restaurantId": 1,
        "name": "Chimichanga",
        "foodType": "entree",
        "description": "Deep fried burrito",
        "price": 17,
        "foodImage": "https://keviniscooking.com/wp-content/uploads/2023/02/Shredded-Beef-Chimichangas-square-1000x1000.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 4,
        "restaurantId": 1,
        "name": "Pollo Tapatio",
        "foodType": "entree",
        "description": "Grilled chicken breast topped with bacon, mushrooms and cheese sauce.",
        "price": 18,
        "foodImage": "https://media-cdn.tripadvisor.com/media/photo-s/12/68/07/df/pollo-tapatio.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 5,
        "restaurantId": 1,
        "name": "Flan",
        "foodType": "dessert",
        "description": "Baked custard dessert with a layer of caramel on to",
        "price": 8,
        "foodImage": "https://www.simplyrecipes.com/thmb/cIyHV1HhyP4vRozjfEeK3PgsOpk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Flan-LEAD-5-86780bc5cb654e77b9b3d5e6f2392fc9.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 6,
        "restaurantId": 1,
        "name": "Churro",
        "foodType": "dessert",
        "description": "Fried dough pastry comes with dark chocolate sauce",
        "price": 6,
        "foodImage": "https://www.justataste.com/wp-content/uploads/2013/03/easy-churros-chocolate-580x875.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 7,
        "restaurantId": 1,
        "name": "Paloma",
        "foodType": "beverage",
        "description": "tequila, fresh lime juice, and grapefruit soda",
        "price": 13,
        "foodImage": "https://cdn.prod.website-files.com/60d29c6296068b90f732decd/6111c8d66f9214e023957cd4_Blood%20Orange%20Paloma%204.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 8,
        "restaurantId": 1,
        "name": "Margarita",
        "foodType": "beverage",
        "description": "Tequila, strawberry puree, triple sec, fresh lime juice, and agave",
        "price": 12,
        "foodImage": "https://carriecarvalho.com/wp-content/uploads/2022/07/strawberry-tequila-fizz_4505-683x1024.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 9,
        "restaurantId": 2,
        "name": "Mexican Corn",
        "foodType": "appetizer",
        "description": "Deep fried and topped with house made lime mayo, chili powder, and cilantro",
        "price": 9,
        "foodImage": "https://www.averiecooks.com/wp-content/uploads/2018/07/elote-6.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 10,
        "restaurantId": 2,
        "name": "French Fries and Cheese",
        "foodType": "appetizer",
        "description": "Delicious French fries served with crispy bacon dip cheese and mozzarella cheese",
        "price": 6,
        "foodImage": "https://images.timesfoodie.com/photo/msid-110538663,thumbsize-415048/110538663.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 11,
        "restaurantId": 2,
        "name": "Tacos Shrimp",
        "foodType": "entree",
        "description": "Deep fried beer battered shrimp over a chipotle coleslaw. Finished with, mango sauce, avocado mousse, and pickled red onions.",
        "price": 14,
        "foodImage": "https://thecozyapron.com/wp-content/uploads/2017/07/tequila-lime-shrimp-tacos_thecozyapron_1.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 12,
        "restaurantId": 2,
        "name": "Carne Asada",
        "foodType": "entree",
        "description": "2.5 oz of grilled angus steak, cooked medium well, with fresh onions, fresh chopped cilantro, and avocado mousse.",
        "price": 14,
        "foodImage": "https://littlespicejar.com/wp-content/uploads/2021/08/Carne-Asada-5-710x1065.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 13,
        "restaurantId": 2,
        "name": "Tres Leches",
        "foodType": "dessert",
        "description": "An ultra light cake soaked in a sweet milk mixture and topped with fresh whipped cream and cinnamon",
        "price": 7,
        "foodImage": "https://www.allrecipes.com/thmb/wN1JHZ98qJBDo1mkSv1EymSutIA=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7399-tres-leches-milk-cake-ddmfs-beauty-4x3-BG-25699-342a9c33649b439884f0edab17fdacf2.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 14,
        "restaurantId": 2,
        "name": "Carlota",
        "foodType": "dessert",
        "description": "Mexican lime icebox cake",
        "price": 7,
        "foodImage": "https://www.isabeleats.com/wp-content/uploads/2024/08/carlota-de-limon-small-6.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 15,
        "restaurantId": 2,
        "name": "Water",
        "foodType": "beverage",
        "description": "Bottled water",
        "price": 2,
        "foodImage": "https://seabrafoods.com/cdn/shop/products/deer-park-water-seabra-foods-online_1200x1200.jpg?v=1706323816",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 16,
        "restaurantId": 2,
        "name": "Diet Soda",
        "foodType": "beverage",
        "description": "Soft drink assortments",
        "price": 3,
        "foodImage": "https://www.grocery.com/store/image/cache/catalog/soft-drink-assortment/assortment-of-diet-soda-diet-coke-diet-pepsi-diet--B07WRDWD2V-500x500w.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 17,
        "restaurantId": 3,
        "name": "Hummus",
        "foodType": "appetizer",
        "description": "Mashed chickpeas, tahini, lemon juice, and garlic",
        "price": 7,
        "foodImage": "https://cookingwithcoit.com/wp-content/uploads/2021/04/HERO_Hummus.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 18,
        "restaurantId": 3,
        "name": "Falafel",
        "foodType": "appetizer",
        "description": "Serve with tzaziki sauce and pita",
        "price": 8,
        "foodImage": "https://images.food52.com/UjHB-o1S5T3JW52dJk_lUIb_oVE=/1008x672/filters:format(webp)/823c5ac6-846d-4e7c-a039-62ecca3bfe83--2017_0425_world-s-easiest-falafel_bobbi-lin_23796.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 19,
        "restaurantId": 3,
        "name": "Chicken Kebab",
        "foodType": "entree",
        "description": "Tender chunks of marinated chicken breast cooked on a skewer with onions and bell peppers.",
        "price": 14,
        "foodImage": "https://turkishstylecooking.com/wp-content/uploads/2012/05/tavuk_sis1.jpg?_gl=1*2ye5qc*_ga*YW1wLTAwQW1TQTJKQmh3bHV6SjVZZHVuNkE.*_ga_DN8KS8EWSB*MTczODk1NzU3OS4xLjEuMTczODk1NzU3OS4wLjAuMA..",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 20,
        "restaurantId": 3,
        "name": "Gyro",
        "foodType": "entree",
        "description": "Rotisserie cut and grilled slices of seasoned ground lamb and beef.",
        "price": 13,
        "foodImage": "https://www.mygreekdish.com/wp-content/uploads/2023/05/Souvlaki-with-Beef-Gyro-recipe.jpeg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 21,
        "restaurantId": 3,
        "name": "Baklava",
        "foodType": "dessert",
        "description": "Baked, flaky layers of phyllo dough filled with ground walnuts and topped with a honey syrup. One order comes with three pieces of baklava.",
        "price": 6,
        "foodImage": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Baklava%281%29.png",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 22,
        "restaurantId": 3,
        "name": "Rice Pudding",
        "foodType": "dessert",
        "description": "Rice cooked with milk and sugar",
        "price": 7,
        "foodImage": "https://spicysouthernkitchen.com/wp-content/uploads/Rice-Pudding-2.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 23,
        "restaurantId": 3,
        "name": "Ayran",
        "foodType": "beverage",
        "description": "Yogurt mix water and salt",
        "price": 3,
        "foodImage": "https://mommyandkitchen.com/wp-content/uploads/2022/09/Website-6.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 24,
        "restaurantId": 3,
        "name": "Soda",
        "foodType": "beverage",
        "description": "Soft drink assortments",
        "price": 3,
        "foodImage": "https://www.grocery.com/store/image/cache/catalog/soft-drink-assortment/assortment-of-diet-soda-diet-coke-diet-pepsi-diet--B07WRDWD2V-500x500w.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 25,
        "restaurantId": 4,
        "name": "Tabbouleh",
        "foodType": "appetizer",
        "description": "Fresh salad with bulgur, parsley, and mint",
        "price": 8,
        "foodImage": "https://www.culinaryhill.com/wp-content/uploads/2022/03/Easy-Bulgur-Tabbouleh-Recipe-Culinary-Hill-HR-07.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 26,
        "restaurantId": 4,
        "name": "Cheese borek",
        "foodType": "appetizer",
        "description": "Puff pastry with VT aged cheddar cheese",
        "price": 6,
        "foodImage": "https://toriavey.com/images/2012/02/Cheese-Bourekas-Main1-900x675.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 27,
        "restaurantId": 4,
        "name": "Roasted Chicken",
        "foodType": "entree",
        "description": "Flavorful house marinated chicken, full of turkish herbs and spices, oven roasted and julienne cut, served on homemade bun or fresh lavash wrap with lettuce, tomato, onion, pickled red cabbage, served with side of yogurt sauce",
        "price": 18,
        "foodImage": "https://nomadette.com/wp-content/uploads/2022/05/Roasted-Chicken-Rice.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 28,
        "restaurantId": 4,
        "name": "Moussaka",
        "foodType": "entree",
        "description": "Layers of tomatoes seasoned ground lamb and beef, eggplant, and potato with a creamy bechamel on top.",
        "price": 22,
        "foodImage": "https://www.themediterraneandish.com/wp-content/uploads/2024/04/Egyptian-Moussaka-Edited-1.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 29,
        "restaurantId": 4,
        "name": "Ice Cream",
        "foodType": "dessert",
        "description": "Home made vanilla ice cream comes with cherry",
        "price": 6,
        "foodImage": "https://www.davidlebovitz.com/wp-content/uploads/2009/02/Vanilla-ice-cream-recipe-cherry-compote-5-640x879.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 30,
        "restaurantId": 4,
        "name": "Tulumba",
        "foodType": "dessert",
        "description": "Turkish style churros with sherbet",
        "price": 7,
        "foodImage": "https://www.mygreekdish.com/wp-content/uploads/2014/07/Extra-syrupy-Tulumba-recipe-Fried-dough-pastries-750x526.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 31,
        "restaurantId": 4,
        "name": "Turkish tea",
        "foodType": "beverage",
        "description": "Freshly brewed black tea",
        "price": 3,
        "foodImage": "https://img.ehowcdn.com/630x/photos.demandstudios.com/getty/article/94/58/178280916.jpg?type=webp",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 32,
        "restaurantId": 4,
        "name": "Turkish coffee",
        "foodType": "beverage",
        "description": "Turkish style espresso",
        "price": 4,
        "foodImage": "https://sakiproducts.com/cdn/shop/articles/What-is-Turkish-Coffee-Thumbnail_1920x1080.jpg?v=1733322022",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 33,
        "restaurantId": 5,
        "name": "Som Tum",
        "foodType": "appetizer",
        "description": "Green papaya salad with peanuts, lime, chili, and fish sauce",
        "price": 9,
        "foodImage": "https://www.seriouseats.com/thmb/xLyXSR0-tsP-KfLe-g9pa8HY3pY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/20210928-Som-Tam-Thai-green-papaya-salad-vicky-wasik-24-f0d666fc609f49a0b9f34897bd2c6303.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    },
    {
        "id": 34,
        "restaurantId": 5,
        "name": "Chicken Satay",
        "foodType": "appetizer",
        "description": "Grilled marinated chicken skewers served with peanut sauce",
        "price": 8,
        "foodImage": "https://dishedbykate.com/wp-content/uploads/2023/10/Chicken-satay.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    },
    {
        "id": 35,
        "restaurantId": 5,
        "name": "Pad Thai",
        "foodType": "entree",
        "description": "Stir-fried rice noodles with shrimp, tofu, egg, peanuts, and tamarind sauce",
        "price": 16,
        "foodImage": "https://aaronandclaire.com/wp-content/uploads/2022/08/PADTHAI-768x432.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    },
    {
        "id": 36,
        "restaurantId": 5,
        "name": "Massaman Curry",
        "foodType": "entree",
        "description": "Slow-cooked beef curry with coconut milk, potatoes, and peanuts",
        "price": 18,
        "foodImage": "https://simplehomeedit.com/wp-content/uploads/2021/06/Massaman-Beef-Slow-Cooker-Recipe.webp",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    },
    {
        "id": 37,
        "restaurantId": 5,
        "name": "Mango Sticky Rice",
        "foodType": "dessert",
        "description": "Sweet sticky rice with ripe mango and coconut milk",
        "price": 7,
        "foodImage": "https://www.allrecipes.com/thmb/fGE4wbHw7T-bQa328gAPTbebRm0=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-150313-thai-sweet-sticky-rice-with-mango-khao-neeo-mamuang-ddmfs-4x3-hero-0da7a9b26cce4d07aea44f2f2b6abd95.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    },
    {
        "id": 38,
        "restaurantId": 5,
        "name": "Thai Tea Ice Cream",
        "foodType": "dessert",
        "description": "Homemade Thai tea-flavored ice cream",
        "price": 6,
        "foodImage": "https://www.loveandoliveoil.com/wp-content/uploads/2017/05/thai-tea-ice-cream1-600x900.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    },
    {
        "id": 39,
        "restaurantId": 5,
        "name": "Thai Iced Tea",
        "foodType": "beverage",
        "description": "Sweet Thai tea with condensed milk and ice",
        "price": 4,
        "foodImage": "https://www.foxandbriar.com/wp-content/uploads/2022/07/thai-iced-tea-6-of-9-1.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    },
    {
        "id": 40,
        "restaurantId": 5,
        "name": "Thai Coffee",
        "foodType": "beverage",
        "description": "Traditional strong Thai-style coffee with condensed milk",
        "price": 4,
        "foodImage": "https://omuraproducts.com/cdn/shop/files/Coffee-Rtd-Thai-Natural-9-5-Fl-Oz_5c67c04f-338c-4d4b-b394-632f9f7e2045.75ff1ce7991eb3e0299a669a57050125.jpg?v=1733344982",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }, {
        "id": 41,
        "restaurantId": 6,
        "name": "Tom Yum Soup",
        "foodType": "appetizer",
        "description": "Spicy and sour shrimp soup with lemongrass, lime leaves, and chili",
        "price": 10,
        "foodImage": "https://carveyourcraving.com/wp-content/uploads/2020/12/Spicy-tom-yum-soup.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    },
    {
        "id": 42,
        "restaurantId": 6,
        "name": "Larb Gai",
        "foodType": "appetizer",
        "description": "Minced chicken salad with mint, chili, lime, and toasted rice powder",
        "price": 9,
        "foodImage": "https://images.getrecipekit.com/20221011220021-larb-gai_1024x.webp?aspect_ratio=16:9&quality=90&",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    },
    {
        "id": 43,
        "restaurantId": 6,
        "name": "Pad See Ew",
        "foodType": "entree",
        "description": "Stir-fried wide rice noodles with chicken, egg, and Chinese broccoli in a savory sauce",
        "price": 15,
        "foodImage": "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_728,h_546/k%2FPhoto%2FRecipes%2F2024-05-pad-see-ew%2Fpad-see-ew-357",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    },
    {
        "id": 44,
        "restaurantId": 6,
        "name": "Panang Curry",
        "foodType": "entree",
        "description": "Rich and creamy Thai curry with beef, coconut milk, and kaffir lime leaves",
        "price": 17,
        "foodImage": "https://i0.wp.com/www.wholesomm.com/wp-content/uploads/2020/05/vegetable-panang-curry-tofu.jpg?resize=1024%2C1024&ssl=1",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    },
    {
        "id": 45,
        "restaurantId": 6,
        "name": "Taro Custard",
        "foodType": "dessert",
        "description": "Thai-style baked taro and coconut milk custard",
        "price": 7,
        "foodImage": "https://media.istockphoto.com/id/2174561107/photo/mor-kaeng-is-a-taste-of-history-thai-custard-with-mung-beans.jpg?s=2048x2048&w=is&k=20&c=YSEGSGmn9CIPXUCFMH5FlWFVdxL_H8Jc7cj3UVHgGKw=",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    },
    {
        "id": 46,
        "restaurantId": 6,
        "name": "Coconut Ice Cream",
        "foodType": "dessert",
        "description": "Creamy coconut milk ice cream served with roasted peanuts",
        "price": 6,
        "foodImage": "https://houseofnasheats.com/wp-content/uploads/2023/09/Coconut-Ice-Cream-Recipe-14.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    },
    {
        "id": 47,
        "restaurantId": 6,
        "name": "Butterfly Pea Lemonade",
        "foodType": "beverage",
        "description": "Refreshing lemonade infused with butterfly pea flower, turning it vibrant purple",
        "price": 5,
        "foodImage": "https://www.cookingwithnart.com/wp-content/uploads/2024/07/Butterfly-Pea-Lemonade.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    },
    {
        "id": 48,
        "restaurantId": 6,
        "name": "Roselle Juice",
        "foodType": "beverage",
        "description": "Sweet and tangy hibiscus flower drink, served chilled",
        "price": 4,
        "foodImage": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3Zv9wP0xfKO2fEx148k4HTxR1R34Oiq1P3SXt15lcaphuDjux1hL7r9B67-Na3nd8pqlVFVZsLTVZadUW1seHReGkUd0n8vTgq1XUYw1zdJ0XxFTTR5jpqbBEbE9rwxl0jmHf7XYA_dN8/s1600/Roselle+juice++3.jpg",
        "createdA": datetime.datetime.now(),
        "updatedAt": datetime.datetime.now()
    }
   
     ]




def seed_menu_items():

    for menu_item in menu_items:
        new_menu_item = MenuItem(
            restaurantId = menu_item["restaurantId"],
            name = menu_item["name"],
            foodType = menu_item["foodType"],
            description=menu_item["description"],
            price = menu_item["price"],
            foodImage=menu_item["foodImage"],
            createdAt=menu_item["createdAt"],
            updatedAt=menu_item["updatedAt"]
        )
        db.session.add(new_menu_item)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the menu_items table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_menu_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.menu_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menu_items"))

    db.session.commit()