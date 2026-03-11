// Spoonacular API - Sign up for free at https://spoonacular.com/food-api
// Replace with your actual API key
const API_KEY = '6672c4e393b44cc1817b6157d5dd3f38'; // Get free API key from spoonacular.com
const BASE_URL = 'https://api.spoonacular.com/recipes';

// DOM Elements
const ingredientInput = document.getElementById('ingredientInput');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');
const loadingDiv = document.getElementById('loading');
const modal = document.getElementById('recipeModal');
const recipeDetails = document.getElementById('recipeDetails');
const closeBtn = document.querySelector('.close-btn');

// Event Listeners
searchBtn.addEventListener('click', searchRecipes);
ingredientInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchRecipes();
});
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
});

// Search for recipes
async function searchRecipes() {
    const ingredients = ingredientInput.value.trim();

    if (!ingredients) {
        alert('Please enter some ingredients!');
        return;
    }

    // Show loading
    loadingDiv.classList.remove('hidden');
    resultsDiv.innerHTML = '';

    try {
        const response = await fetch(
            `${BASE_URL}/findByIngredients?ingredients=${ingredients}&number=12&apiKey=${API_KEY}`
        );

        if (!response.ok) throw new Error('Failed to fetch recipes');

        const recipes = await response.json();
        displayRecipes(recipes);
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <p style="color: var(--bold-red);">Failed to load recipes. Using demo data instead.</p>
            </div>
        `;
        // Show demo recipes if API fails
        showDemoRecipes();
    } finally {
        loadingDiv.classList.add('hidden');
    }
}

// Display recipe cards
function displayRecipes(recipes) {
    if (!recipes || recipes.length === 0) {
        resultsDiv.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <p style="color: var(--text-light);">No recipes found. Try different ingredients!</p>
            </div>
        `;
        return;
    }

    resultsDiv.innerHTML = recipes.map(recipe => `
        <div class="recipe-card" onclick="getRecipeDetails(${recipe.id})">
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="recipe-card-content">
                <h3>${recipe.title}</h3>
                <p>Used ingredients: ${recipe.usedIngredientCount}</p>
                <p>Missing ingredients: ${recipe.missedIngredientCount}</p>
            </div>
        </div>
    `).join('');
}

// Get recipe details
async function getRecipeDetails(recipeId) {
    try {
        // Check if it's one of our custom traditional recipes
        if (recipeId >= 1000) {
            // Get from our traditional recipes collection
            const traditionalRecipe = traditionalRecipes.find(r => r.id === recipeId);
            if (traditionalRecipe) {
                displayTraditionalRecipeDetails(traditionalRecipe);
                return;
            }
        }

        const response = await fetch(
            `${BASE_URL}/${recipeId}/information?apiKey=${API_KEY}`
        );

        if (!response.ok) throw new Error('Failed to fetch recipe details');

        const recipe = await response.json();
        displayRecipeDetails(recipe);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load recipe details. Please try again.');
    }
}

// Display recipe details in modal
function displayRecipeDetails(recipe) {
    recipeDetails.innerHTML = `
        <div class="recipe-detail">
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">

            <h3>Ingredients:</h3>
            <ul class="ingredients-list">
                ${recipe.extendedIngredients.map(ing =>
                    `<li>${ing.original}</li>`
                ).join('')}
            </ul>

            <h3>Instructions:</h3>
            <p class="instructions">${recipe.instructions || 'No instructions available.'}</p>

            <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
            <p><strong>Servings:</strong> ${recipe.servings}</p>
        </div>
    `;

    modal.classList.remove('hidden');
}

// Display traditional recipe details
function displayTraditionalRecipeDetails(recipe) {
    recipeDetails.innerHTML = `
        <div class="recipe-detail">
            <h2>${recipe.title} <span style="font-size: 0.8rem; background: var(--bold-red); color: white; padding: 0.2rem 0.8rem; border-radius: 20px; margin-left: 1rem;">Traditional</span></h2>
            <img src="${recipe.image}" alt="${recipe.title}" style="max-height: 250px; object-fit: cover;">

            <h3>Ingredients:</h3>
            <ul class="ingredients-list">
                ${recipe.ingredients.map(ing =>
                    `<li>${ing}</li>`
                ).join('')}
            </ul>

            <h3>Instructions:</h3>
            <div class="instructions">
                ${recipe.instructions}
            </div>

            ${recipe.history ? `
                <div style="margin-top: 1.5rem; padding: 1rem; background: var(--light-bg); border-left: 4px solid var(--bold-red);">
                    <h4>History & Culture:</h4>
                    <p>${recipe.history}</p>
                </div>
            ` : ''}

            <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
            <p><strong>Servings:</strong> ${recipe.servings}</p>
        </div>
    `;

    modal.classList.remove('hidden');
}

// Traditional South African Recipes Collection
const traditionalRecipes = [
    {
        id: 1001,
        title: "Umqombothi (Traditional African Beer)",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Umqombothi.jpg/300px-Umqombothi.jpg",
        usedIngredientCount: 4,
        missedIngredientCount: 2,
        readyInMinutes: 480,
        servings: 10,
        ingredients: [
            "2 kg maize meal",
            "1 kg sorghum malt",
            "500 g maize malt",
            "10 liters water",
            "1 packet yeast"
        ],
        instructions: `
            <h4>Method:</h4>
            <ol>
                <li>Mix 1 kg maize meal with 2 liters water in a large pot. Cook until thick, stirring constantly.</li>
                <li>Remove from heat and add 1 liter cold water. Let cool to room temperature.</li>
                <li>Add sorghum malt and maize malt. Mix well with your hands.</li>
                <li>Cover with a cloth and leave to ferment in a warm place for 24 hours.</li>
                <li>After 24 hours, strain through a coarse sieve or traditional grass strainer.</li>
                <li>The golden liquid is your umqombothi. Serve at room temperature.</li>
            </ol>
            <p><strong>Note:</strong> Traditional beer has a low alcohol content (about 3%) and is rich in B vitamins. It's traditionally served in a <em>gogogo</em> (large communal container).</p>
        `,
        history: "Umqombothi has been brewed for centuries by the Xhosa and Zulu people of South Africa. It plays a vital role in ancestral ceremonies, weddings, and community gatherings. The brewing process is often a social event where knowledge is passed down through generations."
    },
    {
        id: 1002,
        title: "Chakalaka",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Chakalaka_with_Pap.jpg/300px-Chakalaka_with_Pap.jpg",
        usedIngredientCount: 6,
        missedIngredientCount: 2,
        readyInMinutes: 45,
        servings: 6,
        ingredients: [
            "2 onions, chopped",
            "2 tomatoes, chopped",
            "1 green pepper, chopped",
            "2 carrots, grated",
            "2 cloves garlic, minced",
            "1 can baked beans in tomato sauce (410g)",
            "2 tbsp curry powder",
            "1 tbsp vegetable oil",
            "1 tsp paprika",
            "1 tsp chilli flakes (optional)",
            "Salt and pepper to taste"
        ],
        instructions: `
            <h4>Method:</h4>
            <ol>
                <li>Heat oil in a large pan over medium heat. Sauté onions until soft and translucent (about 5 minutes).</li>
                <li>Add garlic, green pepper, and grated carrots. Cook for another 5 minutes, stirring occasionally.</li>
                <li>Add curry powder, paprika, and chilli flakes. Stir for 1 minute until fragrant.</li>
                <li>Add chopped tomatoes and cook for 5 minutes until they start to break down.</li>
                <li>Add baked beans (including the sauce). Stir well.</li>
                <li>Reduce heat and simmer for 15-20 minutes, stirring occasionally.</li>
                <li>Season with salt and pepper to taste.</li>
                <li>Serve hot or cold with pap, bread, braai meat, or curries.</li>
            </ol>
            <p><strong>Tip:</strong> Chakalaka tastes even better the next day after the flavors have melded together. You can add other vegetables like cabbage, beans, or butternut squash.</p>
        `,
        history: "Chakalaka originated in the townships of Johannesburg. Legend has it that it was invented by Mozambican miners who worked in South African gold mines. They would cook tinned produce with chili and garlic to create a relish that could be stored without refrigeration. Today, it's a beloved side dish enjoyed across Southern Africa, especially at braais (barbecues)."
    },
    {
        id: 1003,
        title: "Pap (Stywe Pap)",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/National_dishe_of_South_Africa.jpg/300px-National_dishe_of_South_Africa.jpg",
        usedIngredientCount: 2,
        missedIngredientCount: 1,
        readyInMinutes: 30,
        servings: 6,
        ingredients: [
            "2 cups maize meal",
            "4 cups water",
            "Salt to taste"
        ],
        instructions: `
            <h4>Method:</h4>
            <ol>
                <li>Bring water and salt to a boil in a large pot.</li>
                <li>Reduce heat to medium and gradually whisk in maize meal to prevent lumps.</li>
                <li>Stir continuously with a wooden spoon (called a <em>lefata</em> or <em>khala</em>) until the pap thickens.</li>
                <li>Cover and reduce heat to low. Cook for 15-20 minutes, stirring occasionally.</li>
                <li>The pap is ready when it pulls away from the sides of the pot.</li>
                <li>Mold into a dome shape on a serving plate.</li>
                <li>Serve with chakalaka, tomato gravy, or meat stew.</li>
            </ol>
        `
    }
];

// Demo recipes for when API fails
function showDemoRecipes() {
    // Combine regular demo recipes with traditional recipes
    const regularDemos = [
        {
            id: 1,
            title: "Simple Grilled Chicken",
            image: "https://spoonacular.com/recipeImages/716429-312x231.jpg",
            usedIngredientCount: 2,
            missedIngredientCount: 1
        },
        {
            id: 2,
            title: "Classic Tomato Pasta",
            image: "https://spoonacular.com/recipeImages/715538-312x231.jpg",
            usedIngredientCount: 2,
            missedIngredientCount: 2
        },
        {
            id: 3,
            title: "Vegetable Stir Fry",
            image: "https://spoonacular.com/recipeImages/716268-312x231.jpg",
            usedIngredientCount: 3,
            missedIngredientCount: 1
        }
    ];

    // Format traditional recipes for display
    const formattedTraditional = traditionalRecipes.map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        usedIngredientCount: recipe.usedIngredientCount,
        missedIngredientCount: recipe.missedIngredientCount
    }));

    // Combine all demo recipes
    const allDemos = [...regularDemos, ...formattedTraditional];
    displayRecipes(allDemos);
}

// Load demo recipes on page load
window.addEventListener('load', showDemoRecipes);