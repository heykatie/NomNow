from app.models.db import db, environment, SCHEMA
from app.models.menu_items import MenuItem
from sqlalchemy.sql import text
import datetime

menu_items = [{
        "id": 1,
        "restaurant_id": 1,
        "name": "Guacamole Dip",
        "food_type": "appetizer",
        "description": "Fresh and made in house",
        "price": 9,
        "food_image": "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2019/04/Guacamole-3-2.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 2,
        "restaurant_id": 1,
        "name": "Empanada",
        "food_type": "appetizer",
        "description": "Chicken or Beef Serve with mole sauce",
        "price": 10,
        "food_image": "https://stordfkenticomedia.blob.core.windows.net/df-us/rms/media/recipesmedia/recipes/foodservice/desktop%20images/2019/dec/2020_veggie-empanadas_900x600_1.jpg?ext=.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 3,
        "restaurant_id": 1,
        "name": "Chimichanga",
        "food_type": "entree",
        "description": "Deep fried burrito",
        "price": 17,
        "food_image": "https://keviniscooking.com/wp-content/uploads/2023/02/Shredded-Beef-Chimichangas-square-1000x1000.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 4,
        "restaurant_id": 1,
        "name": "Pollo Tapatio",
        "food_type": "entree",
        "description": "Grilled chicken breast topped with bacon, mushrooms and cheese sauce.",
        "price": 18,
        "food_image": "https://media-cdn.tripadvisor.com/media/photo-s/12/68/07/df/pollo-tapatio.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 5,
        "restaurant_id": 1,
        "name": "Flan",
        "food_type": "dessert",
        "description": "Baked custard dessert with a layer of caramel on to",
        "price": 8,
        "food_image": "https://www.simplyrecipes.com/thmb/cIyHV1HhyP4vRozjfEeK3PgsOpk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Flan-LEAD-5-86780bc5cb654e77b9b3d5e6f2392fc9.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 6,
        "restaurant_id": 1,
        "name": "Churro",
        "food_type": "dessert",
        "description": "Fried dough pastry comes with dark chocolate sauce",
        "price": 6,
        "food_image": "https://www.justataste.com/wp-content/uploads/2013/03/easy-churros-chocolate-580x875.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 7,
        "restaurant_id": 1,
        "name": "Paloma",
        "food_type": "beverage",
        "description": "tequila, fresh lime juice, and grapefruit soda",
        "price": 13,
        "food_image": "https://cdn.prod.website-files.com/60d29c6296068b90f732decd/6111c8d66f9214e023957cd4_Blood%20Orange%20Paloma%204.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 8,
        "restaurant_id": 1,
        "name": "Margarita",
        "food_type": "beverage",
        "description": "Tequila, strawberry puree, triple sec, fresh lime juice, and agave",
        "price": 12,
        "food_image": "https://carriecarvalho.com/wp-content/uploads/2022/07/strawberry-tequila-fizz_4505-683x1024.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 9,
        "restaurant_id": 2,
        "name": "Mexican Corn",
        "food_type": "appetizer",
        "description": "Deep fried and topped with house made lime mayo, chili powder, and cilantro",
        "price": 9,
        "food_image": "https://www.averiecooks.com/wp-content/uploads/2018/07/elote-6.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 10,
        "restaurant_id": 2,
        "name": "French Fries and Cheese",
        "food_type": "appetizer",
        "description": "Delicious French fries served with crispy bacon dip cheese and mozzarella cheese",
        "price": 6,
        "food_image": "https://images.timesfoodie.com/photo/msid-110538663,thumbsize-415048/110538663.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 11,
        "restaurant_id": 2,
        "name": "Tacos Shrimp",
        "food_type": "entree",
        "description": "Deep fried beer battered shrimp over a chipotle coleslaw. Finished with, mango sauce, avocado mousse, and pickled red onions.",
        "price": 14,
        "food_image": "https://thecozyapron.com/wp-content/uploads/2017/07/tequila-lime-shrimp-tacos_thecozyapron_1.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 12,
        "restaurant_id": 2,
        "name": "Carne Asada",
        "food_type": "entree",
        "description": "2.5 oz of grilled angus steak, cooked medium well, with fresh onions, fresh chopped cilantro, and avocado mousse.",
        "price": 14,
        "food_image": "https://littlespicejar.com/wp-content/uploads/2021/08/Carne-Asada-5-710x1065.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 13,
        "restaurant_id": 2,
        "name": "Tres Leches",
        "food_type": "dessert",
        "description": "An ultra light cake soaked in a sweet milk mixture and topped with fresh whipped cream and cinnamon",
        "price": 7,
        "food_image": "https://www.allrecipes.com/thmb/wN1JHZ98qJBDo1mkSv1EymSutIA=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7399-tres-leches-milk-cake-ddmfs-beauty-4x3-BG-25699-342a9c33649b439884f0edab17fdacf2.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 14,
        "restaurant_id": 2,
        "name": "Carlota",
        "food_type": "dessert",
        "description": "Mexican lime icebox cake",
        "price": 7,
        "food_image": "https://www.isabeleats.com/wp-content/uploads/2024/08/carlota-de-limon-small-6.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 15,
        "restaurant_id": 2,
        "name": "Water",
        "food_type": "beverage",
        "description": "Bottled water",
        "price": 2,
        "food_image": "https://seabrafoods.com/cdn/shop/products/deer-park-water-seabra-foods-online_1200x1200.jpg?v=1706323816",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 16,
        "restaurant_id": 2,
        "name": "Diet Soda",
        "food_type": "beverage",
        "description": "Soft drink assortments",
        "price": 3,
        "food_image": "https://www.grocery.com/store/image/cache/catalog/soft-drink-assortment/assortment-of-diet-soda-diet-coke-diet-pepsi-diet--B07WRDWD2V-500x500w.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 17,
        "restaurant_id": 3,
        "name": "Hummus",
        "food_type": "appetizer",
        "description": "Mashed chickpeas, tahini, lemon juice, and garlic",
        "price": 7,
        "food_image": "https://cookingwithcoit.com/wp-content/uploads/2021/04/HERO_Hummus.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 18,
        "restaurant_id": 3,
        "name": "Falafel",
        "food_type": "appetizer",
        "description": "Serve with tzaziki sauce and pita",
        "price": 8,
        "food_image": "https://images.food52.com/UjHB-o1S5T3JW52dJk_lUIb_oVE=/1008x672/filters:format(webp)/823c5ac6-846d-4e7c-a039-62ecca3bfe83--2017_0425_world-s-easiest-falafel_bobbi-lin_23796.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 19,
        "restaurant_id": 3,
        "name": "Chicken Kebab",
        "food_type": "entree",
        "description": "Tender chunks of marinated chicken breast cooked on a skewer with onions and bell peppers.",
        "price": 14,
        "food_image": "https://turkishstylecooking.com/wp-content/uploads/2012/05/tavuk_sis1.jpg?_gl=1*2ye5qc*_ga*YW1wLTAwQW1TQTJKQmh3bHV6SjVZZHVuNkE.*_ga_DN8KS8EWSB*MTczODk1NzU3OS4xLjEuMTczODk1NzU3OS4wLjAuMA..",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 20,
        "restaurant_id": 3,
        "name": "Gyro",
        "food_type": "entree",
        "description": "Rotisserie cut and grilled slices of seasoned ground lamb and beef.",
        "price": 13,
        "food_image": "https://www.mygreekdish.com/wp-content/uploads/2023/05/Souvlaki-with-Beef-Gyro-recipe.jpeg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 21,
        "restaurant_id": 3,
        "name": "Baklava",
        "food_type": "dessert",
        "description": "Baked, flaky layers of phyllo dough filled with ground walnuts and topped with a honey syrup. One order comes with three pieces of baklava.",
        "price": 6,
        "food_image": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Baklava%281%29.png",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 22,
        "restaurant_id": 3,
        "name": "Rice Pudding",
        "food_type": "dessert",
        "description": "Rice cooked with milk and sugar",
        "price": 7,
        "food_image": "https://spicysouthernkitchen.com/wp-content/uploads/Rice-Pudding-2.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 23,
        "restaurant_id": 3,
        "name": "Ayran",
        "food_type": "beverage",
        "description": "Yogurt mix water and salt",
        "price": 3,
        "food_image": "https://mommyandkitchen.com/wp-content/uploads/2022/09/Website-6.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 24,
        "restaurant_id": 3,
        "name": "Soda",
        "food_type": "beverage",
        "description": "Soft drink assortments",
        "price": 3,
        "food_image": "https://www.grocery.com/store/image/cache/catalog/soft-drink-assortment/assortment-of-diet-soda-diet-coke-diet-pepsi-diet--B07WRDWD2V-500x500w.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 25,
        "restaurant_id": 4,
        "name": "Tabbouleh",
        "food_type": "appetizer",
        "description": "Fresh salad with bulgur, parsley, and mint",
        "price": 8,
        "food_image": "https://www.culinaryhill.com/wp-content/uploads/2022/03/Easy-Bulgur-Tabbouleh-Recipe-Culinary-Hill-HR-07.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 26,
        "restaurant_id": 4,
        "name": "Cheese borek",
        "food_type": "appetizer",
        "description": "Puff pastry with VT aged cheddar cheese",
        "price": 6,
        "food_image": "https://toriavey.com/images/2012/02/Cheese-Bourekas-Main1-900x675.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 27,
        "restaurant_id": 4,
        "name": "Roasted Chicken",
        "food_type": "entree",
        "description": "Flavorful house marinated chicken, full of turkish herbs and spices, oven roasted and julienne cut, served on homemade bun or fresh lavash wrap with lettuce, tomato, onion, pickled red cabbage, served with side of yogurt sauce",
        "price": 18,
        "food_image": "https://nomadette.com/wp-content/uploads/2022/05/Roasted-Chicken-Rice.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 28,
        "restaurant_id": 4,
        "name": "Moussaka",
        "food_type": "entree",
        "description": "Layers of tomatoes seasoned ground lamb and beef, eggplant, and potato with a creamy bechamel on top.",
        "price": 22,
        "food_image": "https://www.themediterraneandish.com/wp-content/uploads/2024/04/Egyptian-Moussaka-Edited-1.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 29,
        "restaurant_id": 4,
        "name": "Ice Cream",
        "food_type": "dessert",
        "description": "Home made vanilla ice cream comes with cherry",
        "price": 6,
        "food_image": "https://www.davidlebovitz.com/wp-content/uploads/2009/02/Vanilla-ice-cream-recipe-cherry-compote-5-640x879.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 30,
        "restaurant_id": 4,
        "name": "Tulumba",
        "food_type": "dessert",
        "description": "Turkish style churros with sherbet",
        "price": 7,
        "food_image": "https://www.mygreekdish.com/wp-content/uploads/2014/07/Extra-syrupy-Tulumba-recipe-Fried-dough-pastries-750x526.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 31,
        "restaurant_id": 4,
        "name": "Turkish tea",
        "food_type": "beverage",
        "description": "Freshly brewed black tea",
        "price": 3,
        "food_image": "https://img.ehowcdn.com/630x/photos.demandstudios.com/getty/article/94/58/178280916.jpg?type=webp",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 32,
        "restaurant_id": 4,
        "name": "Turkish coffee",
        "food_type": "beverage",
        "description": "Turkish style espresso",
        "price": 4,
        "food_image": "https://sakiproducts.com/cdn/shop/articles/What-is-Turkish-Coffee-Thumbnail_1920x1080.jpg?v=1733322022",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 33,
        "restaurant_id": 5,
        "name": "Som Tum",
        "food_type": "appetizer",
        "description": "Green papaya salad with peanuts, lime, chili, and fish sauce",
        "price": 9,
        "food_image": "https://www.seriouseats.com/thmb/xLyXSR0-tsP-KfLe-g9pa8HY3pY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/20210928-Som-Tam-Thai-green-papaya-salad-vicky-wasik-24-f0d666fc609f49a0b9f34897bd2c6303.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 34,
        "restaurant_id": 5,
        "name": "Chicken Satay",
        "food_type": "appetizer",
        "description": "Grilled marinated chicken skewers served with peanut sauce",
        "price": 8,
        "food_image": "https://dishedbykate.com/wp-content/uploads/2023/10/Chicken-satay.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 35,
        "restaurant_id": 5,
        "name": "Pad Thai",
        "food_type": "entree",
        "description": "Stir-fried rice noodles with shrimp, tofu, egg, peanuts, and tamarind sauce",
        "price": 16,
        "food_image": "https://aaronandclaire.com/wp-content/uploads/2022/08/PADTHAI-768x432.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 36,
        "restaurant_id": 5,
        "name": "Massaman Curry",
        "food_type": "entree",
        "description": "Slow-cooked beef curry with coconut milk, potatoes, and peanuts",
        "price": 18,
        "food_image": "https://simplehomeedit.com/wp-content/uploads/2021/06/Massaman-Beef-Slow-Cooker-Recipe.webp",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 37,
        "restaurant_id": 5,
        "name": "Mango Sticky Rice",
        "food_type": "dessert",
        "description": "Sweet sticky rice with ripe mango and coconut milk",
        "price": 7,
        "food_image": "https://www.allrecipes.com/thmb/fGE4wbHw7T-bQa328gAPTbebRm0=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-150313-thai-sweet-sticky-rice-with-mango-khao-neeo-mamuang-ddmfs-4x3-hero-0da7a9b26cce4d07aea44f2f2b6abd95.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 38,
        "restaurant_id": 5,
        "name": "Thai Tea Ice Cream",
        "food_type": "dessert",
        "description": "Homemade Thai tea-flavored ice cream",
        "price": 6,
        "food_image": "https://www.loveandoliveoil.com/wp-content/uploads/2017/05/thai-tea-ice-cream1-600x900.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 39,
        "restaurant_id": 5,
        "name": "Thai Iced Tea",
        "food_type": "beverage",
        "description": "Sweet Thai tea with condensed milk and ice",
        "price": 4,
        "food_image": "https://www.foxandbriar.com/wp-content/uploads/2022/07/thai-iced-tea-6-of-9-1.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 40,
        "restaurant_id": 5,
        "name": "Thai Coffee",
        "food_type": "beverage",
        "description": "Traditional strong Thai-style coffee with condensed milk",
        "price": 4,
        "food_image": "https://omuraproducts.com/cdn/shop/files/Coffee-Rtd-Thai-Natural-9-5-Fl-Oz_5c67c04f-338c-4d4b-b394-632f9f7e2045.75ff1ce7991eb3e0299a669a57050125.jpg?v=1733344982",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }, {
        "id": 41,
        "restaurant_id": 6,
        "name": "Tom Yum Soup",
        "food_type": "appetizer",
        "description": "Spicy and sour shrimp soup with lemongrass, lime leaves, and chili",
        "price": 10,
        "food_image": "https://carveyourcraving.com/wp-content/uploads/2020/12/Spicy-tom-yum-soup.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 42,
        "restaurant_id": 6,
        "name": "Larb Gai",
        "food_type": "appetizer",
        "description": "Minced chicken salad with mint, chili, lime, and toasted rice powder",
        "price": 9,
        "food_image": "https://images.getrecipekit.com/20221011220021-larb-gai_1024x.webp?aspect_ratio=16:9&quality=90&",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 43,
        "restaurant_id": 6,
        "name": "Pad See Ew",
        "food_type": "entree",
        "description": "Stir-fried wide rice noodles with chicken, egg, and Chinese broccoli in a savory sauce",
        "price": 15,
        "food_image": "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_728,h_546/k%2FPhoto%2FRecipes%2F2024-05-pad-see-ew%2Fpad-see-ew-357",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 44,
        "restaurant_id": 6,
        "name": "Panang Curry",
        "food_type": "entree",
        "description": "Rich and creamy Thai curry with beef, coconut milk, and kaffir lime leaves",
        "price": 17,
        "food_image": "https://i0.wp.com/www.wholesomm.com/wp-content/uploads/2020/05/vegetable-panang-curry-tofu.jpg?resize=1024%2C1024&ssl=1",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 45,
        "restaurant_id": 6,
        "name": "Taro Custard",
        "food_type": "dessert",
        "description": "Thai-style baked taro and coconut milk custard",
        "price": 7,
        "food_image": "https://media.istockphoto.com/id/2174561107/photo/mor-kaeng-is-a-taste-of-history-thai-custard-with-mung-beans.jpg?s=2048x2048&w=is&k=20&c=YSEGSGmn9CIPXUCFMH5FlWFVdxL_H8Jc7cj3UVHgGKw=",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 46,
        "restaurant_id": 6,
        "name": "Coconut Ice Cream",
        "food_type": "dessert",
        "description": "Creamy coconut milk ice cream served with roasted peanuts",
        "price": 6,
        "food_image": "https://houseofnasheats.com/wp-content/uploads/2023/09/Coconut-Ice-Cream-Recipe-14.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 47,
        "restaurant_id": 6,
        "name": "Butterfly Pea Lemonade",
        "food_type": "beverage",
        "description": "Refreshing lemonade infused with butterfly pea flower, turning it vibrant purple",
        "price": 5,
        "food_image": "https://www.cookingwithnart.com/wp-content/uploads/2024/07/Butterfly-Pea-Lemonade.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    },
    {
        "id": 48,
        "restaurant_id": 6,
        "name": "Roselle Juice",
        "food_type": "beverage",
        "description": "Sweet and tangy hibiscus flower drink, served chilled",
        "price": 4,
        "food_image": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3Zv9wP0xfKO2fEx148k4HTxR1R34Oiq1P3SXt15lcaphuDjux1hL7r9B67-Na3nd8pqlVFVZsLTVZadUW1seHReGkUd0n8vTgq1XUYw1zdJ0XxFTTR5jpqbBEbE9rwxl0jmHf7XYA_dN8/s1600/Roselle+juice++3.jpg",
        "created_at": datetime.datetime.now(),
        "updated_at": datetime.datetime.now()
    }

    ]




def seed_menu_items():

    for menu_item in menu_items:
        new_menu_item = MenuItem(
            restaurant_id=menu_item["restaurant_id"],
            name=menu_item["name"],
            food_type=menu_item["food_type"],
            description=menu_item["description"],
            price=menu_item["price"],
            food_image=menu_item["food_image"],
            created_at=menu_item["created_at"],
            updated_at=menu_item["updated_at"],
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