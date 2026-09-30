/* ==========================================================================
   OMMI Cafe & Kitchen - Master Application Engine
   Features: Full Menu Database, Shopping Cart Drawer, Comprehensive Table &
             Monthly Fitness Plan Booking System, Menu Order Booking System,
             LocalStorage Booking Manager, WhatsApp Instant Messaging (+91 9490528726),
             and Lightboxes.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Master Application State
  const state = {
    cart: [],
    selectedCategory: 'all',
    searchQuery: '',
    bookingMode: 'table', // 'table' or 'plan'
    selectedOption: 'Window Table',
    myBookings: JSON.parse(localStorage.getItem('ommi_bookings') || '[]')
  };

  const categoryIcons = {
    juices: 'citrus',
    mocktails: 'glass-water',
    milkshakes: 'milk',
    icecream: 'ice-cream',
    snacks: 'flame',
    maggie: 'utensils',
    protein: 'dumbbell'
  };

  // FULL OFFICIAL MENU DATABASE
  const menuData = [
    // FRESH JUICES
    { id: 'j1', name: 'ABC Juice (Apple + Beetroot + Carrot)', category: 'juices', price: 60, badge: 'HEALTHY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTiS47xNB48GiI-MisT1lvJstZ6s0S6M9_q0N03OqzOg&s=10', desc: 'Freshly blended apple, beetroot, and carrot for ultimate immunity & wellness.', dietary: '100% Fresh Fruit Juice' },
    { id: 'j2', name: 'Beetroot Energy Juice', category: 'juices', price: 40, badge: 'ENERGY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwktT6Gkrb6xQvIVfdW_ugZ-pqU2UMPc_V687WVTktzQ&s=10', desc: 'Pure fresh beetroot extract rich in natural antioxidants & iron.', dietary: '100% Fresh Fruit Juice' },
    { id: 'j3', name: 'Carrot Juice', category: 'juices', price: 40, badge: 'FRESH', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKxTAo6lJuCMziGNWPD7-e2iIQX33v6Fe1VBAnypLTXA&s=10', desc: 'Freshly squeezed sweet carrot juice rich in vitamin A.', dietary: '100% Fresh Fruit Juice' },
    { id: 'j4', name: 'Beetroot Carrot Juice', category: 'juices', price: 40, badge: 'POPULAR', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0PMnQ4KfmgbLC8UDYTTwDMtUkEaDxoxvSC7nbzZpV4g&s=10', desc: 'Classic energizing blend of fresh beetroot and sweet carrots.', dietary: '100% Fresh Fruit Juice' },
    { id: 'j5', name: 'Banana Juice', category: 'juices', price: 40, badge: 'SWEET', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwHlRsMwUv4grcVL9aBkN8LK4Yo1HC13OQhnItyI6l3A&s=10', desc: 'Smooth fresh banana blend for instant energy.', dietary: '100% Fresh Fruit Juice' },
    { id: 'j6', name: 'Papaya Juice', category: 'juices', price: 40, badge: 'DIGESTIVE', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8PkJ2SA8OQOpXWEk3OQOPmWP9PeiNsko6m18Zm3xh2A&s=10', desc: 'Fresh sweet papaya juice great for digestion.', dietary: '100% Fresh Fruit Juice' },
    { id: 'j7', name: 'Watermelon Mint Juice', category: 'juices', price: 40, badge: 'REFRESHING', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvoPYPysUD7fXsN0JeXf5S0F4nNY_udTbz1HrGVkBQMQ&s=10', desc: 'Chilled sweet watermelon blended with garden mint leaves.', dietary: '100% Fresh Fruit Juice' },

    // MOCKTAILS
    { id: 'm1', name: 'Mojito', category: 'mocktails', price: 59, badge: 'CLASSIC', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMhifpVN0Usv_g4um02QJKu5Neff0oVdANxX7QAzP0vA&s=10', desc: 'Refreshing lime, crushed mint leaves, and sparkling soda.', dietary: 'Craft Mocktail' },
    { id: 'm2', name: 'Cranberry Mocktail', category: 'mocktails', price: 59, badge: 'FRUITY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYqU4IWe741uYFpvoCydSN18Xu-gUyaIPceNp5VSx4xw&s=10', desc: 'Tart cranberry nectar with wild mint and sparkling fizz.', dietary: 'Craft Mocktail' },
    { id: 'm3', name: 'Blue Curacao', category: 'mocktails', price: 59, badge: 'SIGNATURE', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS14UhzjkK_3I2ZfJ0_9FTXSbhtkHJkyGGMzCieaiPfGw&s=10', desc: 'Vibrant blue citrus mocktail served over crushed ice.', dietary: 'Craft Mocktail' },
    { id: 'm4', name: 'Strawberry Mocktail', category: 'mocktails', price: 59, badge: 'SWEET', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCbEoYfXyq_9jbPnY7yo1A64l2YXxKXCFajCgCsJ-3ig&s=10', desc: 'Sweet strawberry nectar with lime mist and soda.', dietary: 'Craft Mocktail' },
    { id: 'm5', name: 'Green Mint Mocktail', category: 'mocktails', price: 59, badge: 'COOL', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4C447JM4j87Nv2STAFoC8JzAX4FDkTmJcZ9ZxWHr9Zg&s=10', desc: 'Cool garden mint syrup and sparkling soda.', dietary: 'Craft Mocktail' },
    { id: 'm6', name: 'Watermelon Mocktail', category: 'mocktails', price: 59, badge: 'CHILLED', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1yH6AU_tKn5fmK90ZFcfI3oG0BYT93yL9NDq2jVT8WA&s=10', desc: 'Fresh watermelon fizz over crushed ice.', dietary: 'Craft Mocktail' },
    { id: 'm7', name: 'Soda', category: 'mocktails', price: 29, badge: 'FIZZ', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf39uI97jhjZpXNIaIgRdOS9t3gjXlKkd4lahf1VKPUg&s=10', desc: 'Chilled fizzy soda water.', dietary: 'Chilled Beverage' },

    // REGULAR MILKSHAKES
    { id: 'rs1', name: 'Banana Shake', category: 'milkshakes', price: 70, badge: 'REGULAR', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlDuMLn_hBdM9XtwuxWbtg5xHqu-04fxqM2cp1ulYNdw&s=10', desc: 'Creamy chilled milk blended with fresh sweet bananas.', dietary: 'Thick Milkshake' },
    { id: 'rs2', name: 'Chocolate Shake', category: 'milkshakes', price: 70, badge: 'FAVORITE', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT66measCMToK0O5S21NfW7AnZNIHgGKUCZ-BaXTK6fwg&s=10', desc: 'Rich Belgian cocoa blended with chilled milk.', dietary: 'Thick Milkshake' },
    { id: 'rs3', name: 'Mango Shake', category: 'milkshakes', price: 70, badge: 'SEASONAL', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkXu6oBKT31ayx2tAtbLUoibVMdbnz1AMabsFt6EG5MA&s=10', desc: 'Luscious Alphonso mango pulp and fresh milk.', dietary: 'Thick Milkshake' },
    { id: 'rs4', name: 'Litchi Shake', category: 'milkshakes', price: 70, badge: 'EXOTIC', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUVSP314W8NMAeWv8TlymTOwtoK5r02ReXsjmrVS2PUQ&s=10', desc: 'Sweet exotic litchi thick milkshake.', dietary: 'Thick Milkshake' },
    { id: 'rs5', name: 'Kiwi Shake', category: 'milkshakes', price: 70, badge: 'TANGY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkouSFjCZqEBVbULXBwL7Th8W55BP57M4npFYE9tjK_g&s=10', desc: 'Tangy fresh kiwi blended with sweet milk.', dietary: 'Thick Milkshake' },
    { id: 'rs6', name: 'Custard Apple Shake', category: 'milkshakes', price: 70, badge: 'CREAMY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1x00HYsn6vqR9QlHzscNpqLc3IlJb8zYo6kjvhFTGsA&s=10', desc: 'Rich sitaphal (custard apple) thick milkshake.', dietary: 'Thick Milkshake' },
    { id: 'rs7', name: 'Strawberry Shake', category: 'milkshakes', price: 70, badge: 'CLASSIC', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ-U0yCTxLimtTyIskOWQe1ueh0OuAOf5sw47w0Ou7nQ&s=10', desc: 'Sweet strawberry milkshake topped with cream.', dietary: 'Thick Milkshake' },
    { id: 'rs8', name: 'Vanilla Shake', category: 'milkshakes', price: 70, badge: 'SMOOTH', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_amVdx8nGQwIpUaxkelfDnUi67kInxOAqhgZHrl292w&s=10', desc: 'Classic Madagascar vanilla thick shake.', dietary: 'Thick Milkshake' },
    { id: 'rs9', name: 'Mixed Fruit Shake', category: 'milkshakes', price: 70, badge: 'BLENDED', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdVrc0KgojdIm4PlOdqz8_d2jW2TJQvPVOe1mukZgbNQ&s=10', desc: 'Multi-fruit thick milkshake blend.', dietary: 'Thick Milkshake' },

    // PREMIUM MILKSHAKES
    { id: 'ps1', name: 'Oreo Shake', category: 'milkshakes', price: 99, badge: 'PREMIUM', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFkgPBszj193N0rKHlBGzqQixJgDHrU07lBv1jvl2wjQ&s=10', desc: 'Crushed Oreo cookies thick milkshake topped with cookie crumble.', dietary: 'Premium Shake' },
    { id: 'ps2', name: 'KitKat Shake', category: 'milkshakes', price: 99, badge: 'PREMIUM', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBShRvINLWa17mck9lH73BXjtKKmVAC3q2aEOP3UKP1Q&s=10', desc: 'Blended KitKat wafer bars with rich chocolate fudge sauce.', dietary: 'Premium Shake' },
    { id: 'ps3', name: 'Lotte Choco Pie Shake', category: 'milkshakes', price: 99, badge: 'SPECIAL', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUDnm8onwvQJiyGKSmngVH5nUK9Kp0U655nXEAcA5G7Q&s=10', desc: 'Whole Lotte Choco Pie cake blended into a thick cocoa shake.', dietary: 'Premium Shake' },
    { id: 'ps4', name: 'Blueberry Premium Shake', category: 'milkshakes', price: 99, badge: 'PREMIUM', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDaK5ZMvI6T45vw5m26GIbz6hgvwAhtzXOm39HHDRIMg&s=10', desc: 'Wild blueberry puree thick milkshake.', dietary: 'Premium Shake' },
    { id: 'ps5', name: 'Blackcurrant Premium Shake', category: 'milkshakes', price: 99, badge: 'PREMIUM', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc5SWdnYBDpHn9IeRDFcRIOeTyz7GLRLdg-eZQJykAcA&s=10', desc: 'Rich blackcurrant berry thick milkshake.', dietary: 'Premium Shake' },
    { id: 'ps6', name: 'Peanut Butter Shake', category: 'milkshakes', price: 99, badge: 'PROTEIN', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgf7FBEbokonbqxywIYPj-M5X2TDp4TP0sCM4XdS1LEw&s=10', desc: 'Creamy roasted peanut butter thick shake.', dietary: 'High Energy' },
    { id: 'ps7', name: 'Green Pista Shake', category: 'milkshakes', price: 99, badge: 'ROYAL', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn28XsUkui9mXOWrt2D7qW251ch95aL-5CG_mxF6QZjQ&s=10', desc: 'Fresh pistachio blended thick milkshake.', dietary: 'Royal Premium' },
    { id: 'ps8', name: 'Kesari Pista Shake', category: 'milkshakes', price: 110, badge: 'ROYAL', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS8sJV6ituN5xeDUyoYJ5X2LVMlmuqYBIpbEfAwr_rXg&s=10', desc: 'Saffron (Kesari) and roasted pistachio thick shake.', dietary: 'Royal Premium' },
    { id: 'ps9', name: 'Dry Fruit Milkshake', category: 'milkshakes', price: 110, badge: 'ROYAL', image: 'https://evergreenrecipes.com/wp-content/uploads/2015/06/dry-fruits-shake.jpg', desc: 'Almonds, cashews, raisins, and dates blended in milk.', dietary: 'Nutrient Rich' },
    { id: 'ps10', name: 'Caramel Nuts Shake', category: 'milkshakes', price: 110, badge: 'DELUXE', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQctiNTKpqlICAUxKp5vckentzhGY7iDAs89Qnl7-wj_Q&s=10', desc: 'Golden salted caramel with crunchy roasted nuts.', dietary: 'Deluxe Shake' },
    { id: 'ps11', name: 'Dry Fruit Banana Shake', category: 'milkshakes', price: 110, badge: 'ROYAL', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiArccpDZGGwyHrdZkfI4DLyu0fXFUog2wWrkfehSkHQ&s=10', desc: 'Fresh banana blended with premium dry fruit nuts.', dietary: 'Energy Booster' },

    // ICE CREAM SCOOPS
    { id: 'ic1', name: 'Vanilla Scoop', category: 'icecream', price: 25, badge: 'REGULAR', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4TYaelL8dKn2DwHaPv_t3p-QlRO_xBGjP6dp49ci4aA&s=10', desc: 'Classic smooth vanilla ice cream scoop.', dietary: 'Chilled Treat' },
    { id: 'ic2', name: 'Chocolate Scoop', category: 'icecream', price: 25, badge: 'REGULAR', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMn35vg0-wZESoApWRaZVQF-wqknDTvuhPMFJcOfOs8w&s=10', desc: 'Rich chocolate ice cream scoop.', dietary: 'Chilled Treat' },
    { id: 'ic3', name: 'Strawberry Scoop', category: 'icecream', price: 25, badge: 'REGULAR', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXMX0oiDmJtFQ_pE9ut5cnmtHOHc4YFRFNo3ztiFOx1Q&s=10', desc: 'Sweet strawberry ice cream scoop.', dietary: 'Chilled Treat' },
    { id: 'ic4', name: 'Butterscotch Scoop', category: 'icecream', price: 25, badge: 'REGULAR', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBARK6bPbL9DUvO4sfQR-Yvi93SNbrDKEeFFDGJLU4bw&s=10', desc: 'Crunchy butterscotch praline ice cream scoop.', dietary: 'Chilled Treat' },
    { id: 'ic5', name: 'Mango Scoop', category: 'icecream', price: 25, badge: 'REGULAR', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPu-5e3vCfcLwxdHp_YQGyL6k_00eJ5AKDAT0JGqJJIw&s=10', desc: 'Fresh mango ice cream scoop.', dietary: 'Chilled Treat' },
    { id: 'ic6', name: 'Dry Fruit Scoop (Premium)', category: 'icecream', price: 35, badge: 'PREMIUM', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYfBwok1C-Kml9FilLkVncg5P1N2z6GjYviFgLqbuP4Q&s=10', desc: 'Premium ice cream packed with dry fruits.', dietary: 'Premium Scoop' },
    { id: 'ic7', name: 'Caramel Nuts Scoop (Premium)', category: 'icecream', price: 35, badge: 'PREMIUM', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScHYyGNhqRorlTs-6Ul4rSVzpqyDHdU74B64B4SQb6ag&s=10', desc: 'Caramel fudge and roasted nuts ice cream scoop.', dietary: 'Premium Scoop' },
    { id: 'ic8', name: 'Kesari Pista Scoop (Premium)', category: 'icecream', price: 35, badge: 'PREMIUM', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpN_lxVA9cibHCdszPIH7XLAiCV__6jclVD-0oojuKiw&s', desc: 'Saffron pistachio premium ice cream scoop.', dietary: 'Premium Scoop' },
    { id: 'ic9', name: 'Green Pista Scoop (Premium)', category: 'icecream', price: 35, badge: 'PREMIUM', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIl1ZGlhyzhTTo9fNKVYtLIRNFNkKHLTgM3o9mFSc5eA&s=10', desc: 'Green pistachio premium ice cream scoop.', dietary: 'Premium Scoop' },

    // SNACKS
    { id: 's1', name: 'French Fries', category: 'snacks', price: 40, badge: 'CRISPY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu5ft72qfTy9M2ftDuXWoYpCIdrb23Ns3zHqqQLdVsfQ&s=10', desc: 'Golden salted crispy french fries.', dietary: 'Hot Snack' },
    { id: 's2', name: 'Veg Nuggets (6 pcs)', category: 'snacks', price: 50, badge: 'CRISPY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdw7O3Kcjoj-hOdeyL53bvPN7bChUjTOdTuPTu_ur3AA&s=10', desc: '6 pieces of crispy fried vegetable nuggets.', dietary: 'Hot Snack' },
    { id: 's3', name: 'Onion Rings (6 pcs)', category: 'snacks', price: 50, badge: 'CRISPY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxdKU5zxGukhyXmRCEAJ1mk429grHuS2orfPQSysc5lw&s=10', desc: '6 pieces of golden battered onion rings.', dietary: 'Hot Snack' },
    { id: 's4', name: 'Chicken Pakoda (200g)', category: 'snacks', price: 99, badge: 'HOT SPECIAL', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEkGS1tMn7E6E8eWf8f08Fe4y9yI7l82bC9w_xumFcnQ&s=10', desc: '200g spiced crispy fried chicken pakodi.', dietary: 'Non-Veg Hot' },
    { id: 's5', name: 'Kaju Chicken Pakoda (200g)', category: 'snacks', price: 140, badge: 'MUST TRY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC5KxlQ-P5CUGgttyI4Hw8Wa5bKiTh2MsYHoxgrrzzRg&s=10', desc: '200g premium cashew-infused crispy chicken pakodi.', dietary: 'Chef Special' },
    { id: 's6', name: 'Chicken Popcorn (100g)', category: 'snacks', price: 100, badge: 'POPULAR', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJNkPmGcpxmU4XRmJXkejU40fuGIOjULaW0QMWNmkVTQ&s=10', desc: '100g crunchy bite-sized chicken popcorn.', dietary: 'Non-Veg Snack' },
    { id: 's7', name: 'Chicken Majestic (100g)', category: 'snacks', price: 100, badge: 'SPICY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0YRadZ4cyUVloMSZC7qUSPmf8Dpp9ReDysoGd-8OM-Q&s=10', desc: '100g spicy Hyderabadi style Chicken Majestic.', dietary: 'Spicy Non-Veg' },
    { id: 's8', name: 'Veg Popcorn', category: 'snacks', price: 60, badge: 'SNACK', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_otSq1wfVYE6VNdpTpkxd0urDHdcwnJixYZLO108G3Q&s=10', desc: 'Crispy veggie bite-sized popcorn.', dietary: 'Veg Snack' },
    { id: 's9', name: 'Veg Roll', category: 'snacks', price: 60, badge: 'TASTY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZL_kqU9hWqnu22hn4Bem8SPdcptS6AkEBZOip-XfTbg&s=10', desc: 'Spiced vegetable filling rolled in crispy wrap.', dietary: 'Veg Roll' },

    // MAGGIE WORLD
    { id: 'mg1', name: 'Veg Maggie', category: 'maggie', price: 40, badge: 'CLASSIC', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVVnoyWMDKeXoDzaAosF0ctGlMv8WYnYZQXXTwV0P2tQ&s=10', desc: 'Hot spiced vegetable masala Maggie noodles.', dietary: 'Comfort Food' },
    { id: 'mg2', name: 'Egg Maggie', category: 'maggie', price: 50, badge: 'POPULAR', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPNIHC_DLYK8dAVZl8dG4x4cldvxAkt1jrrWzeDbcW4w&s=10', desc: 'Hot Maggie cooked with scrambled egg & veggies.', dietary: 'Egg Special' },
    { id: 'mg3', name: 'Double Egg Maggie', category: 'maggie', price: 60, badge: 'DOUBLE EGG', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcsTf1A7ubSDcxqm4UBgYfmUJWojeYSLedWVd0DXtvSw&s=10', desc: 'Loaded Maggie noodles with 2 scrambled eggs & spices.', dietary: 'High Energy' },

    // HIGH PROTEIN SPECIALS
    { id: 'hp1', name: 'Boiled Egg', category: 'protein', price: 10, badge: 'PROTEIN', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStFb-LXAmE_w0l8Sx7OpPcf1PwKjDQFVvSyxRTflsOYw&s=10', desc: 'Fresh boiled egg served with pepper & salt seasoning.', dietary: '6g Protein' },
    { id: 'hp2', name: 'Ragi Java', category: 'protein', price: 25, badge: 'HEALTHY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQxlWccc2KYW_3YvHM177Fx9ZcUoiDrK2JvH1jIcd0Yw&s=10', desc: 'Traditional finger millet (Ragi) health drink with buttermilk.', dietary: 'Traditional' },
    { id: 'hp3', name: 'Fit Sprouts', category: 'protein', price: 25, badge: 'FITNESS', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsttKg3FCB-JbwDHVAG8hpe5dGgWxw8brJ7qahw-n0tQ&s=10', desc: 'Freshly sprouted moong & Bengal gram with lemon seasoning.', dietary: '100% Organic' },
    { id: 'hp4', name: 'Chia Seeds Salad', category: 'protein', price: 50, badge: 'SUPERFOOD', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQylIgF5a7krKRbC83NsyfbbvEfJZQkhcmSD3cviE2acg&s', desc: 'Hydrating chia seeds, fruit cubes, and honey drizzle.', dietary: 'Superfood' },
    { id: 'hp5', name: 'Egg Salad', category: 'protein', price: 60, badge: 'PROTEIN', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdPBSp9a0TK2joJCvybvj882voqrMDc1qoPuWcz1zEew&s=10', desc: 'Boiled egg slices with cucumber, tomatoes, and herbs.', dietary: 'High Protein' },
    { id: 'hp6', name: 'Curd Veg Salad', category: 'protein', price: 70, badge: 'PROBIOTIC', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpA1wSPJAartL5US682DHE2eA5yyX-jbAKrslui1ZIJQ&s=10', desc: 'Chilled fresh curd blended with crunchy vegetables.', dietary: 'Probiotic' },
    { id: 'hp7', name: 'Greek Yogurt Salad', category: 'protein', price: 70, badge: 'HEALTHY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVwmhEWHwUEhMTSXd9ZAI7eoOepBkqW6t5YIwMF1DuHw&s=10', desc: 'Thick Greek yogurt salad topped with fruits & honey.', dietary: 'High Protein' },
    { id: 'hp8', name: 'Oats + Banana Shake', category: 'protein', price: 99, badge: 'POWER SHAKE', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2zBou9aTV6tVlRZeCv2HlbEWHb3hXGKanjj2ifm9aNg&s=10', desc: 'Whole rolled oats, fresh banana, and honey protein shake.', dietary: 'Pre-Workout' },
    { id: 'hp9', name: 'Banana Shake (Protein)', category: 'protein', price: 40, badge: 'ENERGY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLje6dAv92qYgWSvJn9RMLdOd4tDPmo6SX2ijO7TcFPg&s', desc: 'Fresh banana energy shake.', dietary: 'Quick Energy' },
    { id: 'hp10', name: 'Dry Fruit Bowl', category: 'protein', price: 40, badge: 'NUTS', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWTM2yiiHF2AhbOB1BOvsGEtcxnPAqkPdxjCGJvc716A&s=10', desc: 'Assorted roasted almonds, cashews, and raisins.', dietary: 'Healthy Munch' },
    { id: 'hp11', name: 'Honey Dry Fruit Bowl', category: 'protein', price: 50, badge: 'PURE HONEY', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTueGsCf6Y_M4LwT3SargG9MhpyzBMmb1e5ZFnXlHMV9g&s=10', desc: 'Assorted dry fruit nuts coated in raw organic honey.', dietary: 'Pure Energy' },
    { id: 'hp12', name: 'Dry Fruit Milkshake (Protein)', category: 'protein', price: 120, badge: 'POWERHOUSE', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBWwtgYB_2DvhYCllXZaGwaVyXvCRlQ4OcKHX0HUk2KA&s=10', desc: 'Loaded dry fruit thick milkshake with saffron and nuts.', dietary: 'Max Protein' }
  ];

  /* ==========================================================================
     SHARED HELPERS
     ========================================================================== */

  // Get today's date as YYYY-MM-DD in LOCAL timezone (not UTC)
  function getLocalTodayStr() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm   = String(now.getMonth() + 1).padStart(2, '0');
    const dd   = String(now.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  /* ==========================================================================
     1. Menu Render & Filter Logic
     ========================================================================== */
  function renderMenu() {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;

    const filtered = menuData.filter(item => {
      const matchesCategory = state.selectedCategory === 'all' || item.category === state.selectedCategory;
      const matchesSearch   = item.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                              item.desc.toLowerCase().includes(state.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--color-muted);">
          <i data-lucide="search-x" style="width: 48px; height: 48px; margin-bottom: 1rem; color: var(--color-gold);"></i>
          <h3>No Items Found</h3>
          <p>Try searching for juice, shake, pakoda, or maggie!</p>
        </div>
      `;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <div class="menu-card">
        <div class="menu-card-img-wrap">
          <span class="card-badge-tag">${item.badge}</span>
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="menu-card-body">
          <div class="menu-card-header">
            <h3 class="menu-card-title">${item.name}</h3>
            <span class="menu-card-price">₹${item.price}</span>
          </div>
          <p class="menu-card-desc">${item.desc}</p>
          <div class="menu-card-footer">
            <span style="font-size: 0.75rem; color: var(--color-gold-bright); display: flex; align-items: center; gap: 0.3rem;">
              <i data-lucide="${categoryIcons[item.category] || 'utensils'}"></i> ${item.dietary}
            </span>
            <button class="btn btn-sm btn-primary add-to-cart-btn"
              data-id="${item.id}"
              data-name="${item.name}"
              data-price="${item.price}"
              data-img="${item.image}">
              <i data-lucide="plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    `).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget;
        addToCart({
          id:    target.dataset.id,
          name:  target.dataset.name,
          price: parseFloat(target.dataset.price),
          image: target.dataset.img
        });
      });
    });
  }

  // Category Tabs
  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      state.selectedCategory = target.dataset.category;
      renderMenu();
    });
  });

  // Search Input
  const searchInput = document.getElementById('menu-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderMenu();
    });
  }

  /* ==========================================================================
     2. Shopping Cart Drawer Logic
     ========================================================================== */
  const cartDrawer   = document.getElementById('cart-drawer');
  const cartOverlay  = document.getElementById('cart-overlay');
  const cartTrigger  = document.getElementById('cart-trigger');
  const cartClose    = document.getElementById('cart-close-btn');

  function toggleCartDrawer(open) {
    if (open) {
      cartDrawer?.classList.add('open');
      cartOverlay?.classList.add('open');
    } else {
      cartDrawer?.classList.remove('open');
      cartOverlay?.classList.remove('open');
    }
  }

  cartTrigger?.addEventListener('click',  () => toggleCartDrawer(true));
  cartClose?.addEventListener('click',    () => toggleCartDrawer(false));
  cartOverlay?.addEventListener('click',  () => toggleCartDrawer(false));

  window.addToCart = function(item) {
    const existing = state.cart.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({ ...item, quantity: 1 });
    }
    updateCartUI();
    toggleCartDrawer(true);
  };

  function updateCartUI() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal   = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const cartBadge = document.getElementById('cart-badge-count');
    if (cartBadge) cartBadge.innerText = totalItems;

    const cartDrawerCount = document.getElementById('cart-drawer-count');
    if (cartDrawerCount) cartDrawerCount.innerText = `(${totalItems} items)`;

    const cartTotal = document.getElementById('cart-total');
    if (cartTotal) cartTotal.innerText = `₹${subtotal}`;

    const emptyView = document.getElementById('cart-empty-view');
    const itemsList = document.getElementById('cart-items-list');

    if (!emptyView || !itemsList) return;

    if (state.cart.length === 0) {
      emptyView.style.display = 'block';
      itemsList.innerHTML = '';
    } else {
      emptyView.style.display = 'none';
      itemsList.innerHTML = state.cart.map(item => `
        <div style="display: flex; gap: 0.8rem; background: var(--bg-dark); padding: 0.8rem; border-radius: 12px; margin-bottom: 0.8rem; border: 1px solid var(--color-border);">
          <img src="${item.image}" alt="${item.name}" style="width: 54px; height: 54px; border-radius: 8px; object-fit: contain; background: rgba(212,175,55,0.1);">
          <div style="flex-grow: 1;">
            <div style="font-size: 0.88rem; font-weight: 700;">${item.name}</div>
            <div style="color: var(--color-gold-bright); font-size: 0.85rem; font-weight: 700;">₹${item.price * item.quantity}</div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.3rem;">
              <button onclick="changeQty('${item.id}', -1)" style="background: var(--bg-card); border: 1px solid var(--color-border); color: white; border-radius: 4px; width: 22px; height: 22px; cursor: pointer;">-</button>
              <span style="font-size: 0.82rem;">${item.quantity}</span>
              <button onclick="changeQty('${item.id}', 1)"  style="background: var(--bg-card); border: 1px solid var(--color-border); color: white; border-radius: 4px; width: 22px; height: 22px; cursor: pointer;">+</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  window.changeQty = function(id, delta) {
    const item = state.cart.find(i => i.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      state.cart = state.cart.filter(i => i.id !== id);
    }
    updateCartUI();
  };

  /* ── Menu Order Helpers ──────────────────────────────────────────────────── */

  // Validate cart name/phone inputs
  function validateOrderFields() {
    const nameEl  = document.getElementById('order-name');
    const phoneEl = document.getElementById('order-phone');
    if (!nameEl || !phoneEl) return null;

    if (!nameEl.value.trim()) {
      alert('Please enter your Full Name to place the order.');
      nameEl.focus();
      return null;
    }
    if (!phoneEl.value.trim()) {
      alert('Please enter your Phone Number to place the order.');
      phoneEl.focus();
      return null;
    }
    if (!/^[6-9]\d{9}$/.test(phoneEl.value.trim())) {
      alert('Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).');
      phoneEl.focus();
      return null;
    }
    return { name: nameEl.value.trim(), phone: phoneEl.value.trim() };
  }

  // Create a Menu Order booking and save to state + localStorage
  function processMenuOrder(name, phone) {
    const subtotal     = state.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const totalQty     = state.cart.reduce((sum, i) => sum + i.quantity, 0);
    const itemsSummary = state.cart.map(i => `${i.name} ×${i.quantity}`).join(', ');
    const refCode      = `#OMMI-ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const booking = {
      id:      refCode,
      mode:    'Menu Order',
      option:  `Food Order (${totalQty} item${totalQty !== 1 ? 's' : ''})`,
      name,
      phone,
      email:   'N/A',
      date:    getLocalTodayStr(),
      time:    'ASAP / Counter Pickup',
      guests:  `₹${subtotal} Total`,
      notes:   itemsSummary,
      items:   state.cart.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
      subtotal,
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    state.myBookings.unshift(booking);
    localStorage.setItem('ommi_bookings', JSON.stringify(state.myBookings));
    updateBookingsUI();
    return booking;
  }

  // Build WhatsApp URL for a menu order
  function buildOrderWhatsAppURL(booking) {
    const itemLines = booking.items
      .map(i => `  • ${i.name} ×${i.quantity} = ₹${i.price * i.quantity}`)
      .join('\n');
    return `https://wa.me/919490528726?text=${encodeURIComponent(
      `*🛒 New OMMI Cafe Menu Order*\n` +
      `--------------------------------\n` +
      `*Order ID:* ${booking.id}\n` +
      `*Customer:* ${booking.name}\n` +
      `*Phone:* ${booking.phone}\n` +
      `*Date:* ${booking.date}\n` +
      `*Order Items:*\n${itemLines}\n` +
      `*Total Amount:* ₹${booking.subtotal}\n` +
      `--------------------------------\n` +
      `Please confirm my order. Thank you!`
    )}`;
  }

  // Show the booking pass modal for any booking type
  function showBookingPassModal(booking, waURL, isOrder = false) {
    const ticketContent = document.getElementById('pass-ticket-content');
    if (ticketContent) {
      const itemRows = isOrder && booking.items
        ? booking.items.map(i =>
            `<div class="ticket-row">
               <span>${i.name} <span style="color:var(--color-muted);">×${i.quantity}</span></span>
               <strong>₹${i.price * i.quantity}</strong>
             </div>`
          ).join('') +
          `<div class="ticket-row" style="border-top:1px dashed rgba(212,175,55,0.3); margin-top:0.5rem; padding-top:0.5rem;">
             <span style="font-weight:700;">Total</span>
             <strong style="font-size:1.05rem; color:var(--color-gold-bright);">₹${booking.subtotal}</strong>
           </div>`
        : '';

      ticketContent.innerHTML = `
        <span class="ticket-badge">${booking.id}</span>
        <h4 style="font-size:1.1rem; color:var(--color-gold-bright); margin-bottom:0.8rem;">${booking.option}</h4>
        <div class="ticket-row"><span>Customer:</span><strong>${booking.name} (${booking.phone})</strong></div>
        <div class="ticket-row"><span>Type:</span><strong>${booking.mode}</strong></div>
        <div class="ticket-row"><span>Date:</span><strong>${booking.date} @ ${booking.time}</strong></div>
        ${isOrder
          ? itemRows
          : `<div class="ticket-row"><span>Details:</span><strong>${booking.guests}</strong></div>
             ${booking.notes && booking.notes !== 'None' ? `<div class="ticket-row"><span>Notes:</span><strong>${booking.notes}</strong></div>` : ''}`
        }
        <div style="border-top:1px dashed var(--color-border); margin-top:1rem; padding-top:0.8rem; display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--color-muted);">
          <span>Status: <strong style="color:#22c55e;">CONFIRMED</strong></span>
          <span>OMMI Cafe &amp; Kitchen</span>
        </div>`;
    }
    const waBtn = document.getElementById('whatsapp-send-link');
    if (waBtn) waBtn.href = waURL;
    document.getElementById('booking-pass-modal')?.classList.add('open');
  }

  // Helper: clear cart order form
  function clearOrderForm() {
    const n = document.getElementById('order-name');
    const p = document.getElementById('order-phone');
    if (n) n.value = '';
    if (p) p.value = '';
  }

  // ── Confirm & Get Booking Pass button ─────────────────────────────────────
  document.getElementById('checkout-btn')?.addEventListener('click', () => {
    if (state.cart.length === 0) {
      alert('Your cart is empty! Add items from the menu first.');
      return;
    }
    const fields = validateOrderFields();
    if (!fields) return;

    const booking = processMenuOrder(fields.name, fields.phone);
    const waURL   = buildOrderWhatsAppURL(booking);

    if (typeof confetti !== 'undefined') confetti({ particleCount: 120, spread: 80 });

    showBookingPassModal(booking, waURL, true);
    toggleCartDrawer(false);
    state.cart = [];
    updateCartUI();
    clearOrderForm();
  });

  // ── Order via WhatsApp directly ────────────────────────────────────────────
  document.getElementById('checkout-whatsapp-btn')?.addEventListener('click', () => {
    if (state.cart.length === 0) {
      alert('Your cart is empty! Add items from the menu first.');
      return;
    }
    const fields = validateOrderFields();
    if (!fields) return;

    const booking = processMenuOrder(fields.name, fields.phone);
    const waURL   = buildOrderWhatsAppURL(booking);

    if (typeof confetti !== 'undefined') confetti({ particleCount: 120, spread: 80 });

    window.open(waURL, '_blank');
    toggleCartDrawer(false);
    state.cart = [];
    updateCartUI();
    clearOrderForm();
  });

  /* ==========================================================================
     3. Comprehensive Booking System & Picker Logic
     ========================================================================== */
  const tablePickerOptions = [
    { id: 'opt_w1', name: 'Window Table',       desc: 'Cozy seating with street view (2-4 Persons)',    icon: 'armchair' },
    { id: 'opt_c1', name: 'Dine-In Counter Bar', desc: 'Fast service counter seats (1-2 Persons)',       icon: 'coffee'   },
    { id: 'opt_f1', name: 'Family Booth',        desc: 'Spacious comfortable booth (4-6 Persons)',       icon: 'users'    },
    { id: 'opt_p1', name: 'Garden Patio',        desc: 'Fresh outdoor seating area (2-4 Persons)',       icon: 'sun'      }
  ];

  const planPickerOptions = [
    { id: 'plan_egg',      name: 'Egg Salad Plan',       desc: 'High protein boiled egg salad daily (₹1399/mo)',         icon: 'utensils'   },
    { id: 'plan_sprouts',  name: 'Fit Sprouts Plan',     desc: '100% organic sprouted moong & gram (₹749/mo)',           icon: 'leaf'       },
    { id: 'plan_banana',   name: 'Banana Shake Plan',    desc: 'Fresh banana energy shake daily (₹1099/mo)',             icon: 'glass-water'},
    { id: 'plan_df_shake', name: 'Dry Fruit Shake Plan', desc: 'Loaded dry fruit & banana shake (₹1999/mo)',             icon: 'zap'        },
    { id: 'plan_curd',     name: 'Curd Veg Salad Plan',  desc: 'Probiotic chilled curd salad daily (₹1399/mo)',          icon: 'heart'      },
    { id: 'plan_df_bowl',  name: 'Dry Fruit Bowl Plan',  desc: 'Roasted almonds, cashews & raisins (₹1099/mo)',          icon: 'box'        }
  ];

  function renderBookingPicker() {
    const grid        = document.getElementById('booking-picker-grid');
    const title       = document.getElementById('picker-title');
    const subtitle    = document.getElementById('picker-subtitle');
    const heading     = document.getElementById('form-heading');
    const guestsLabel = document.getElementById('guests-label');
    const guestsSelect= document.getElementById('res-guests');

    if (!grid) return;

    const options = state.bookingMode === 'table' ? tablePickerOptions : planPickerOptions;

    if (state.bookingMode === 'table') {
      if (title)       title.innerText  = 'Select Seating Zone';
      if (subtitle)    subtitle.innerText= 'Click a seating area to lock in your reservation preference.';
      if (heading)     heading.innerText = 'Complete Table Reservation';
      if (guestsLabel) guestsLabel.innerHTML = '<i data-lucide="users"></i> Party Size / Guests';
      if (guestsSelect) {
        guestsSelect.innerHTML = `
          <option value="1 Person">1 Person</option>
          <option value="2 People" selected>2 People</option>
          <option value="4 People Family">4 People (Family Table)</option>
          <option value="6+ Group Party">6+ Group Party</option>`;
      }
    } else {
      if (title)       title.innerText  = 'Select Monthly Fitness Plan Package';
      if (subtitle)    subtitle.innerText= 'Choose your 30-day protein meal subscription package.';
      if (heading)     heading.innerText = 'Complete Fitness Subscription';
      if (guestsLabel) guestsLabel.innerHTML = '<i data-lucide="clock"></i> Subscription Duration';
      if (guestsSelect) {
        guestsSelect.innerHTML = `
          <option value="1 Month (30 Days)" selected>1 Month (30 Days Subscription)</option>
          <option value="2 Months (60 Days)">2 Months (60 Days Package)</option>
          <option value="3 Months (Quarterly Pass)">3 Months (Quarterly Pass)</option>`;
      }
    }

    if (!options.some(o => o.name === state.selectedOption)) {
      state.selectedOption = options[0].name;
    }

    grid.innerHTML = options.map(opt => `
      <div class="picker-card ${opt.name === state.selectedOption ? 'active' : ''}" data-name="${opt.name}">
        <i data-lucide="${opt.icon}" style="color: var(--color-gold-bright); font-size: 1.4rem; margin-bottom: 0.2rem;"></i>
        <span>${opt.name}</span>
        <small>${opt.desc}</small>
      </div>
    `).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();

    document.querySelectorAll('.picker-card').forEach(card => {
      card.addEventListener('click', (e) => {
        document.querySelectorAll('.picker-card').forEach(c => c.classList.remove('active'));
        const target = e.currentTarget;
        target.classList.add('active');
        state.selectedOption = target.dataset.name;
      });
    });
  }

  // Quick Book Plan Helper from Plans section
  window.quickBookPlan = function(planName) {
    state.bookingMode  = 'plan';
    state.selectedOption = planName;
    document.getElementById('tab-mode-plan')?.classList.add('active');
    document.getElementById('tab-mode-table')?.classList.remove('active');
    renderBookingPicker();
    document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('res-name')?.focus();
  };

  // Booking Mode Tabs
  document.getElementById('tab-mode-table')?.addEventListener('click', () => {
    document.getElementById('tab-mode-table').classList.add('active');
    document.getElementById('tab-mode-plan').classList.remove('active');
    state.bookingMode = 'table';
    renderBookingPicker();
  });

  document.getElementById('tab-mode-plan')?.addEventListener('click', () => {
    document.getElementById('tab-mode-plan').classList.add('active');
    document.getElementById('tab-mode-table').classList.remove('active');
    state.bookingMode = 'plan';
    renderBookingPicker();
  });

  // Set min date to local today
  const dateInput = document.getElementById('res-date');
  if (dateInput) {
    const todayStr = getLocalTodayStr();
    dateInput.min = todayStr;
    if (!dateInput.value) dateInput.value = todayStr;
  }

  // Helper: build WhatsApp URL for table/plan bookings
  function buildWhatsAppURL(booking) {
    return `https://wa.me/919490528726?text=${encodeURIComponent(
      `*New OMMI Cafe Booking Confirmation*\n` +
      `--------------------------------\n` +
      `*Booking ID:* ${booking.id}\n` +
      `*Type:* ${booking.mode}\n` +
      `*Selected:* ${booking.option}\n` +
      `*Customer Name:* ${booking.name}\n` +
      `*Phone:* ${booking.phone}\n` +
      `*Date:* ${booking.date}\n` +
      `*Time Slot:* ${booking.time}\n` +
      `*Details:* ${booking.guests}\n` +
      (booking.notes !== 'None' ? `*Special Notes:* ${booking.notes}\n` : '') +
      `--------------------------------\n` +
      `Please confirm my booking. Thank you!`
    )}`;
  }

  // Helper: process and save a table/plan booking
  function processBooking(name, phone, email, date, time, guests, notes) {
    const prefix  = state.bookingMode === 'table' ? 'TBL' : 'SUB';
    const refCode = `#OMMI-${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;

    const booking = {
      id:      refCode,
      mode:    state.bookingMode === 'table' ? 'Dine-In Table Reservation' : 'Monthly Meal Plan Subscription',
      option:  state.selectedOption,
      name,
      phone,
      email:   email || 'N/A',
      date,
      time,
      guests,
      notes:   notes || 'None',
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    state.myBookings.unshift(booking);
    localStorage.setItem('ommi_bookings', JSON.stringify(state.myBookings));
    updateBookingsUI();
    return booking;
  }

  // Standard Form Submit (Generates Pass Modal)
  const resForm = document.getElementById('reservation-form');
  if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name   = document.getElementById('res-name').value.trim();
      const phone  = document.getElementById('res-phone').value.trim();
      const email  = document.getElementById('res-email').value.trim();
      const date   = document.getElementById('res-date').value;
      const time   = document.getElementById('res-time').value;
      const guests = document.getElementById('res-guests').value;
      const notes  = document.getElementById('res-notes').value.trim();

      // Phone validation
      if (!/^[6-9]\d{9}$/.test(phone)) {
        alert('Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).');
        document.getElementById('res-phone').focus();
        return;
      }

      // Date validation
      if (date < getLocalTodayStr()) {
        alert('Please select today or a future date for your booking.');
        document.getElementById('res-date').focus();
        return;
      }

      const booking = processBooking(name, phone, email, date, time, guests, notes);
      if (typeof confetti !== 'undefined') confetti({ particleCount: 120, spread: 80 });

      showBookingPassModal(booking, buildWhatsAppURL(booking), false);

      resForm.reset();
      if (dateInput) {
        const todayStr = getLocalTodayStr();
        dateInput.min   = todayStr;
        dateInput.value = todayStr;
      }
      renderBookingPicker();
    });
  }

  // Instant WhatsApp Submit Button
  document.getElementById('instant-whatsapp-btn')?.addEventListener('click', () => {
    const nameInput  = document.getElementById('res-name');
    const phoneInput = document.getElementById('res-phone');
    const dateEl     = document.getElementById('res-date');

    if (!nameInput.value.trim()) {
      alert('Please fill in your Name before booking via WhatsApp.');
      nameInput.focus();
      return;
    }
    if (!phoneInput.value.trim()) {
      alert('Please fill in your Phone Number before booking via WhatsApp.');
      phoneInput.focus();
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phoneInput.value.trim())) {
      alert('Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).');
      phoneInput.focus();
      return;
    }
    if (!dateEl.value || dateEl.value < getLocalTodayStr()) {
      alert('Please select today or a future date for your booking.');
      dateEl.focus();
      return;
    }

    const name   = nameInput.value.trim();
    const phone  = phoneInput.value.trim();
    const email  = document.getElementById('res-email').value.trim();
    const date   = dateEl.value;
    const time   = document.getElementById('res-time').value;
    const guests = document.getElementById('res-guests').value;
    const notes  = document.getElementById('res-notes').value.trim();

    const booking = processBooking(name, phone, email, date, time, guests, notes);
    if (typeof confetti !== 'undefined') confetti({ particleCount: 120, spread: 80 });

    window.open(buildWhatsAppURL(booking), '_blank');

    resForm.reset();
    if (dateInput) {
      const todayStr = getLocalTodayStr();
      dateInput.min   = todayStr;
      dateInput.value = todayStr;
    }
    renderBookingPicker();
  });

  // Modal & Overlay Close Event Handlers
  document.getElementById('pass-close-btn')?.addEventListener('click', () => {
    document.getElementById('booking-pass-modal')?.classList.remove('open');
  });

  document.getElementById('booking-pass-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'booking-pass-modal') {
      document.getElementById('booking-pass-modal').classList.remove('open');
    }
  });

  document.getElementById('plan-board-modal-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'plan-board-modal-overlay') {
      document.getElementById('plan-board-modal-overlay').classList.remove('open');
    }
  });

  /* ==========================================================================
     4. My Bookings Drawer Manager
     ========================================================================== */
  const bookingsDrawer  = document.getElementById('bookings-drawer');
  const bookingsOverlay = document.getElementById('bookings-overlay');
  const bookingsTrigger = document.getElementById('my-bookings-trigger');
  const bookingsClose   = document.getElementById('bookings-close-btn');

  function toggleBookingsDrawer(open) {
    if (open) {
      bookingsDrawer?.classList.add('open');
      bookingsOverlay?.classList.add('open');
      updateBookingsUI();
    } else {
      bookingsDrawer?.classList.remove('open');
      bookingsOverlay?.classList.remove('open');
    }
  }

  bookingsTrigger?.addEventListener('click', () => toggleBookingsDrawer(true));
  bookingsClose?.addEventListener('click',   () => toggleBookingsDrawer(false));
  bookingsOverlay?.addEventListener('click', () => toggleBookingsDrawer(false));

  function updateBookingsUI() {
    const badge = document.getElementById('bookings-badge-count');
    if (badge) badge.innerText = state.myBookings.length;

    const listBody = document.getElementById('bookings-list-body');
    if (!listBody) return;

    if (state.myBookings.length === 0) {
      listBody.innerHTML = `
        <div style="text-align:center; padding:3rem 1rem; color:#9CA3AF;">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
            stroke="#D4AF37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
            style="margin:0 auto 1rem; display:block;">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8"  y1="2" x2="8"  y2="6"></line>
            <line x1="3"  y1="10" x2="21" y2="10"></line>
            <line x1="10" y1="14" x2="10" y2="17"></line>
            <line x1="14" y1="14" x2="14" y2="17"></line>
          </svg>
          <h4 style="font-size:1.1rem; color:#fff; margin-bottom:0.4rem;">No Orders or Bookings Yet</h4>
          <p style="font-size:0.85rem;">Add menu items to cart or reserve a table / meal plan!</p>
        </div>`;
      return;
    }

    listBody.innerHTML = state.myBookings.map(b => {
      const isOrder = b.mode === 'Menu Order';

      // Build WhatsApp resend URL for each type
      let waURL;
      if (isOrder && b.items) {
        const itemLines = b.items
          .map(i => `  • ${i.name} ×${i.quantity} = ₹${i.price * i.quantity}`)
          .join('\n');
        waURL = `https://wa.me/919490528726?text=${encodeURIComponent(
          `*🛒 OMMI Cafe Menu Order Re-confirmation*\n` +
          `--------------------------------\n` +
          `*Order ID:* ${b.id}\n*Customer:* ${b.name}\n*Phone:* ${b.phone}\n` +
          `*Date:* ${b.date}\n*Order Items:*\n${itemLines}\n` +
          `*Total:* ₹${b.subtotal}\n--------------------------------\nPlease confirm. Thank you!`
        )}`;
      } else {
        waURL = `https://wa.me/919490528726?text=${encodeURIComponent(
          `*OMMI Cafe Booking Re-confirmation*\n--------------------------------\n` +
          `*Booking ID:* ${b.id}\n*Type:* ${b.mode}\n*Selected:* ${b.option}\n` +
          `*Customer:* ${b.name}\n*Phone:* ${b.phone}\n*Date:* ${b.date}\n` +
          `*Time:* ${b.time}\n*Details:* ${b.guests}\n` +
          (b.notes && b.notes !== 'None' ? `*Notes:* ${b.notes}\n` : '') +
          `--------------------------------\nPlease confirm. Thank you!`
        )}`;
      }

      // Order items block
      const itemsBlock = isOrder && b.items ? `
        <div style="background:rgba(0,0,0,0.3); border-radius:10px; padding:0.7rem 0.8rem; margin-bottom:0.7rem;">
          <div style="font-size:0.7rem; font-weight:800; color:#F5E08A; margin-bottom:0.4rem; letter-spacing:0.5px;">🛒 ORDER ITEMS</div>
          ${b.items.map(i => `
            <div style="display:flex; justify-content:space-between; font-size:0.78rem; color:#E2E8F0;
              padding:0.2rem 0; border-bottom:1px solid rgba(255,255,255,0.06);">
              <span>${i.name} <span style="color:#9CA3AF;">×${i.quantity}</span></span>
              <span style="color:#F5E08A; font-weight:700;">₹${i.price * i.quantity}</span>
            </div>`).join('')}
          <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:800;
            color:#fff; padding-top:0.5rem; margin-top:0.2rem;">
            <span>Total</span><span style="color:#F5E08A;">₹${b.subtotal}</span>
          </div>
        </div>` : '';

      // Table/plan details block
      const detailsBlock = !isOrder ? `
        <div style="font-size:0.8rem; color:#9CA3AF; margin-bottom:0.7rem; display:flex; flex-direction:column; gap:0.25rem;">
          <div><span style="color:#F5E08A;">📅</span> ${b.date} &nbsp;@&nbsp; ${b.time}</div>
          <div><span style="color:#F5E08A;">🏷️</span> ${b.mode}</div>
          <div><span style="color:#F5E08A;">👥</span> ${b.guests}</div>
          ${b.notes && b.notes !== 'None' ? `<div><span style="color:#F5E08A;">📝</span> ${b.notes}</div>` : ''}
        </div>` : '';

      const typeIcon  = isOrder ? '🛒' : (b.mode.includes('Subscription') ? '💪' : '🪑');
      const typeColor = isOrder ? '#60A5FA' : '#F5E08A';

      return `
      <div style="background:#181C28; border:1px solid rgba(212,175,55,0.35); border-radius:16px;
        padding:1.2rem; margin-bottom:1rem; box-shadow:0 4px 16px rgba(0,0,0,0.5);">

        <!-- ID & status row -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
          <span style="font-size:0.7rem; font-weight:800; color:#F5E08A; background:rgba(212,175,55,0.15);
            padding:0.2rem 0.6rem; border-radius:8px; border:1px solid rgba(212,175,55,0.3);">${b.id}</span>
          <span style="font-size:0.7rem; color:#22c55e; font-weight:700; background:rgba(34,197,94,0.1);
            padding:0.15rem 0.5rem; border-radius:6px;">✓ ACTIVE</span>
        </div>

        <!-- Title & type badge -->
        <div style="display:flex; align-items:center; gap:0.4rem; margin-bottom:0.5rem;">
          <span style="font-size:1rem;">${typeIcon}</span>
          <h4 style="font-size:0.95rem; color:#fff; flex:1; margin:0;">${b.option}</h4>
          <span style="font-size:0.65rem; font-weight:700; color:${typeColor};
            background:rgba(255,255,255,0.06); padding:0.15rem 0.5rem; border-radius:6px;">
            ${isOrder ? 'ORDER' : b.mode.includes('Subscription') ? 'PLAN' : 'TABLE'}
          </span>
        </div>

        <!-- Customer info -->
        <div style="font-size:0.8rem; color:#9CA3AF; margin-bottom:0.7rem;">
          <span style="color:#F5E08A;">👤</span> ${b.name} &nbsp;|&nbsp; ${b.phone}
        </div>

        ${itemsBlock}
        ${detailsBlock}

        <!-- Action buttons -->
        <div style="display:flex; gap:0.5rem;">
          <a href="${waURL}" target="_blank" rel="noopener"
            style="flex:1; display:inline-flex; align-items:center; justify-content:center; gap:0.4rem;
            background:#25D366; color:#fff; font-weight:700; font-size:0.78rem; padding:0.45rem 0.6rem;
            border-radius:10px; text-decoration:none; cursor:pointer;">
            📲 WhatsApp
          </a>
          <button onclick="cancelBooking('${b.id.replace(/'/g, "\\'")}')"
            style="flex:1; display:inline-flex; align-items:center; justify-content:center; gap:0.4rem;
            background:rgba(230,57,70,0.1); color:#E63946; font-weight:700; font-size:0.78rem;
            padding:0.45rem 0.6rem; border-radius:10px; border:1px solid rgba(230,57,70,0.4); cursor:pointer;">
            🗑️ Cancel
          </button>
        </div>
      </div>`;
    }).join('');
  }

  window.cancelBooking = function(id) {
    if (confirm(`Are you sure you want to cancel ${id}?`)) {
      state.myBookings = state.myBookings.filter(b => b.id !== id);
      localStorage.setItem('ommi_bookings', JSON.stringify(state.myBookings));
      updateBookingsUI();
    }
  };

  // Lightboxes
  document.getElementById('view-plan-board-btn')?.addEventListener('click', () => {
    document.getElementById('plan-board-modal-overlay')?.classList.add('open');
  });
  document.getElementById('plan-board-close-btn')?.addEventListener('click', () => {
    document.getElementById('plan-board-modal-overlay')?.classList.remove('open');
  });

  // Initial Boot
  renderMenu();
  renderBookingPicker();
  updateBookingsUI();
});
