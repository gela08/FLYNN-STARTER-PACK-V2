
import { Flavor, Product } from './types';

export const FLAVORS: Flavor[] = [
  { name: "Original", price: 0 },
  { name: "Garlic", price: 5 },
  { name: "Jack Daniels", price: 5 },
  { name: "Yangnyeom", price: 5 },
  { name: "Yangnyeom X2", price: 5 },
  { name: "Spicy BBQ", price: 5 },
  { name: "Lemon Glaze", price: 5 },
  { name: "Yangnyeom W Garlic", price: 10 },
  { name: "24 Cheddar", price: 10 },
  { name: "Snow Cheese", price: 10 },
  { name: "Yangnyeom X2 W Garlic", price: 10 },
  { name: "Dark Truffle", price: 10 },
];

export const PRODUCTS: Product[] = [
  // WITH COFFEE
  { id: 'c1', name: "Iced Caramel Macchiato", description: "Espresso, milk, and luscious caramel syrup, served over ice.", price: 39, category: 'with-coffee', image: "Images/iced-caramel-macchiatos-coffee-no-bg.png", gradient: "from-[#38220f] to-[#dfc28a]" },
  { id: 'c2', name: "Donya Berry With Coffee", description: "Premium Japanese matcha harmonized with milk and bold espresso.", price: 39, category: 'with-coffee', image: "Images/donya-berry-coffee-no-bg.png", gradient: "from-[#cb5475] to-[#f2d4dc]" },
  { id: 'c3', name: "Don Matchatos With Coffee", description: "Japanese matcha delicately harmonized with milk and espresso.", price: 39, category: 'with-coffee', image: "Images/don-matchatos-coffee-no-bg.png", gradient: "from-[#49592a] to-[#c3d4a5]" },
  { id: 'c4', name: "Don Darko With Coffee", description: "Finest Belgian dark chocolate blended with bold espresso.", price: 39, category: 'with-coffee', image: "Images/don-darko-coffee-no-bg.png", gradient: "from-[#0c0906] to-[#dbc1ac]" },
  { id: 'c5', name: "Matcha Berry With Coffee", description: "Antioxidant-rich matcha with strawberry notes and espresso.", price: 39, category: 'with-coffee', image: "Images/matcha-berry-coffee-no-bg.png", gradient: "from-[#82a742] to-[#cc6985]" },
  { id: 'c6', name: "Black Forest With Coffee", description: "Belgian craftmanship meets natural Taiwanese strawberries.", price: 39, category: 'with-coffee', image: "Images/black-forest-coffee-no-bg.png", gradient: "from-[#8e0b21] to-[#e5a9ba]" },
  { id: 'c7', name: "Oreo With Coffee", description: "Classic Oreo cookie taste blended into rich coffee.", price: 39, category: 'with-coffee', image: "Images/oreo-coffee-no-bg.png", gradient: "from-[#333] to-[#cfcfcf]" },
  { id: 'c8', name: "Brown Spanish Latte", description: "Balanced coffee and creamy milk with brown sugar syrup.", price: 39, category: 'with-coffee', image: "Images/brown-spanish-latte-no-bg.png", gradient: "from-[#967259] to-[#f7ebde]" },
  
  // NO COFFEE
  { id: 'nc1', name: "Don Matchatos", description: "Premium Japanese matcha harmonized with velvety milk.", price: 39, category: 'no-coffee', image: "Images/don-matchatos-no-coffee-no-bg.png", gradient: "from-[#49592a] to-[#c6e99f]" },
  { id: 'nc2', name: "Donya Berry", description: "Succulent Taiwanese strawberries mingled with creamy milk.", price: 39, category: 'no-coffee', image: "Images/donya-berry-no-coffee-no-bg.png", gradient: "from-[#be2952] to-[#f2d4dc]" },
  { id: 'nc3', name: "Don Darko", description: "Finest Belgian dark chocolate blended with creamy milk.", price: 39, category: 'no-coffee', image: "Images/don-darko-coffee-no-bg.png", gradient: "from-[#0c0906] to-[#e0caca]" },
  { id: 'nc4', name: "Matcha Berry", description: "Harmony of Japanese matcha and Taiwanese strawberries.", price: 39, category: 'no-coffee', image: "Images/matcha-berry-no-coffee-no-bg.png", gradient: "from-[#49592a] to-[#cc6985]" },
  { id: 'nc5', name: "Black Forest", description: "Belgian craftmanship and sweet Taiwanese strawberries.", price: 39, category: 'no-coffee', image: "Images/black-forest-no-coffee-no-bg.png", gradient: "from-[#8e0b21] to-[#f2d4dc]" },
  { id: 'nc6', name: "Oreo", description: "Creamy milk blended with classic Oreo cookies.", price: 39, category: 'no-coffee', image: "Images/oreo-no-coffee-no-bg.png", gradient: "from-[#333] to-[#cfcfcf]" },

  // MEALS
  { id: 'm1', name: "RM2: 2pcs Boneless Chicken", description: "Two pieces of juicy Korean fried chicken with rice.", price: 95, category: 'meal', hasFlavors: true, image: "Images/24-chicken-RM2.png", gradient: "from-orange-600 to-yellow-400" },
  { id: 'm2', name: "RM3: 3pcs Boneless Chicken", description: "Three pieces of signature Korean fried chicken with rice.", price: 130, category: 'meal', hasFlavors: true, image: "Images/24-chicken-RM3.png", gradient: "from-orange-600 to-yellow-400" },
  { id: 'm3', name: "KRM2: Kimchi Rice Meal", description: "Two pieces of boneless chicken with spicy kimchi rice.", price: 135, category: 'meal', hasFlavors: true, image: "Images/24-chicken-KRM2.png", gradient: "from-red-600 to-orange-400" },
  { id: 'm4', name: "KRM3: Large Kimchi Meal", description: "Three pieces of boneless chicken with spicy kimchi rice.", price: 170, category: 'meal', hasFlavors: true, image: "Images/24-chicken-KRM3.png", gradient: "from-red-600 to-orange-400" }
];
