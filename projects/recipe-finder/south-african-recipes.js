// South African Traditional Recipes Collection

const saRecipes = [
    {
        id: 101,
        title: "Umqombothi (Traditional African Beer)",
        image: "assets/umqombothi.jpg",
        usedIngredientCount: 4,
        missedIngredientCount: 2,
        readyInMinutes: 480,
        servings: 10,
        category: "Beverages",
        instructions: `
            <h4>Ingredients:</h4>
            <ul>
                <li>2 kg maize meal</li>
                <li>1 kg sorghum malt</li>
                <li>500 g maize malt</li>
                <li>10 liters water</li>
                <li>1 packet yeast</li>
            </ul>
            <h4>Method:</h4>
            <ol>
                <li>Mix 1 kg maize meal with 2 liters water in a large pot. Cook until thick.</li>
                <li>Remove from heat and add 1 liter cold water. Let cool.</li>
                <li>Add sorghum malt and maize malt. Mix well.</li>
                <li>Cover and leave to ferment for 24 hours.</li>
                <li>Strain through a coarse sieve. The liquid is your umqombothi.</li>
                <li>Serve at room temperature.</li>
            </ol>
            <p><strong>Note:</strong> Traditional beer has a low alcohol content and is rich in B vitamins.</p>
        `,
        history: "Umqombothi has been brewed for centuries by the Xhosa people. It's traditionally used in ceremonies and gatherings."
    },
    {
        id: 102,
        title: "Chakalaka",
        image: "assets/chakalaka.jpg",
        usedIngredientCount: 6,
        missedIngredientCount: 2,
        readyInMinutes: 45,
        servings: 6,
        category: "Relish",
        instructions: `
            <h4>Ingredients:</h4>
            <ul>
                <li>2 onions, chopped</li>
                <li>2 tomatoes, chopped</li>
                <li>1 green pepper, chopped</li>
                <li>2 carrots, grated</li>
                <li>2 cloves garlic, minced</li>
                <li>1 can baked beans in tomato sauce (410g)</li>
                <li>2 tbsp curry powder</li>
                <li>1 tbsp vegetable oil</li>
                <li>1 tsp paprika</li>
                <li>Salt and pepper to taste</li>
            </ul>
            <h4>Method:</h4>
            <ol>
                <li>Heat oil in a large pan. Sauté onions until soft.</li>
                <li>Add garlic, green pepper, and carrots. Cook for 5 minutes.</li>
                <li>Add curry powder and paprika. Stir for 1 minute.</li>
                <li>Add tomatoes and baked beans. Simmer for 15-20 minutes.</li>
                <li>Season with salt and pepper to taste.</li>
                <li>Serve hot or cold with pap, bread, or meat.</li>
            </ol>
        `,
        history: "Chakalaka originated in the townships of Johannesburg. Legend says it was invented by Mozambican miners who worked in South African mines."
    },
    {
        id: 103,
        title: "Morogo (Wild Spinach)",
        image: "assets/morogo.jpg",
        usedIngredientCount: 3,
        missedIngredientCount: 2,
        readyInMinutes: 30,
        servings: 4,
        category: "Side Dish",
        instructions: `
            <h4>Ingredients:</h4>
            <ul>
                <li>500g morogo/wild spinach (or regular spinach)</li>
                <li>1 onion, chopped</li>
                <li>2 tomatoes, chopped</li>
                <li>2 tbsp vegetable oil</li>
                <li>Salt and pepper to taste</li>
            </ul>
            <h4>Method:</h4>
            <ol>
                <li>Wash morogo thoroughly and chop roughly.</li>
                <li>Heat oil in a pot, sauté onions until soft.</li>
                <li>Add tomatoes and cook for 5 minutes.</li>
                <li>Add morogo and simmer for 15-20 minutes.</li>
                <li>Season with salt and pepper.</li>
                <li>Serve with pap and meat.</li>
            </ol>
        `
    },
    {
        id: 104,
        title: "Dompas (Traditional Bread)",
        image: "assets/dompas.jpg",
        usedIngredientCount: 4,
        missedIngredientCount: 2,
        readyInMinutes: 120,
        servings: 8,
        category: "Bread",
        instructions: `
            <h4>Ingredients:</h4>
            <ul>
                <li>4 cups flour</li>
                <li>2 cups water</li>
                <li>1 packet yeast</li>
                <li>1 tsp salt</li>
                <li>1 tsp sugar</li>
            </ul>
            <h4>Method:</h4>
            <ol>
                <li>Mix yeast, sugar and warm water. Let stand for 10 minutes.</li>
                <li>Add flour and salt. Knead until smooth.</li>
                <li>Cover and let rise for 1 hour.</li>
                <li>Shape into loaves and place in greased pot.</li>
                <li>Cover and let rise for 30 minutes.</li>
                <li>Bake on stovetop over low heat for 45-50 minutes.</li>
            </ol>
        `
    },
    {
        id: 105,
        title: "Mageu (Fermented Maize Drink)",
        image: "assets/mageu.jpg",
        usedIngredientCount: 3,
        missedIngredientCount: 1,
        readyInMinutes: 720,
        servings: 6,
        category: "Beverages",
        instructions: `
            <h4>Ingredients:</h4>
            <ul>
                <li>2 cups maize meal</li>
                <li>6 cups water</li>
                <li>1 cup flour</li>
                <li>1 cup sugar</li>
            </ul>
            <h4>Method:</h4>
            <ol>
                <li>Mix maize meal with 2 cups water to form a paste.</li>
                <li>Boil remaining water, add paste and cook for 20 minutes.</li>
                <li>Cool to room temperature.</li>
                <li>Mix flour with small amount water to form paste, add to mixture.</li>
                <li>Cover and leave to ferment for 24 hours.</li>
                <li>Add sugar and serve chilled.</li>
            </ol>
        `
    }
];