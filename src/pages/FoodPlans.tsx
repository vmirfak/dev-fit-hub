import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLoayout';
import { useState } from 'react';

const FoodPlans = () => {
  const [expandedMeal, setExpandedMeal] = useState<number | null>(null);
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);

  const meals = [
    {
      mealName: 'Meal 1 - Breakfast',
      recipes: [
        {
          recipeName: 'Oatmeal',
          ingredients: [
            { name: 'Oats', quantity: '100g' },
            { name: 'Milk', quantity: '250ml' },
            { name: 'Honey', quantity: '1 tbsp' },
            { name: 'Banana', quantity: '1 medium' },
            { name: 'Cinnamon', quantity: '1 tsp' },
          ],
        },
        {
          recipeName: 'Scrambled Eggs',
          ingredients: [
            { name: 'Eggs', quantity: '3 large' },
            { name: 'Butter', quantity: '1 tbsp' },
            { name: 'Salt', quantity: 'to taste' },
            { name: 'Pepper', quantity: 'to taste' },
            { name: 'Spinach', quantity: '50g' },
          ],
        },
        {
          recipeName: 'Greek Yogurt Parfait',
          ingredients: [
            { name: 'Greek Yogurt', quantity: '200g' },
            { name: 'Granola', quantity: '50g' },
            { name: 'Mixed Berries', quantity: '100g' },
            { name: 'Honey', quantity: '1 tbsp' },
            { name: 'Chia Seeds', quantity: '1 tbsp' },
          ],
        },
        {
          recipeName: 'Smoothie Bowl',
          ingredients: [
            { name: 'Frozen Berries', quantity: '150g' },
            { name: 'Banana', quantity: '1 medium' },
            { name: 'Almond Milk', quantity: '200ml' },
            { name: 'Granola', quantity: '30g' },
            { name: 'Coconut Flakes', quantity: '1 tbsp' },
          ],
        },
        {
          recipeName: 'Avocado Toast',
          ingredients: [
            { name: 'Whole Grain Bread', quantity: '2 slices' },
            { name: 'Avocado', quantity: '1 medium' },
            { name: 'Salt', quantity: 'to taste' },
            { name: 'Pepper', quantity: 'to taste' },
            { name: 'Cherry Tomatoes', quantity: '5 pcs' },
          ],
        },
      ],
    },
    {
      mealName: 'Meal 2 - Morning Snack',
      recipes: [
        {
          recipeName: 'Fruit Salad',
          ingredients: [
            { name: 'Apple', quantity: '1 medium' },
            { name: 'Banana', quantity: '1 medium' },
            { name: 'Orange', quantity: '1 medium' },
            { name: 'Grapes', quantity: '100g' },
            { name: 'Yogurt', quantity: '100g' },
          ],
        },
        {
          recipeName: 'Nut Mix',
          ingredients: [
            { name: 'Almonds', quantity: '30g' },
            { name: 'Walnuts', quantity: '30g' },
            { name: 'Cashews', quantity: '30g' },
            { name: 'Dried Cranberries', quantity: '20g' },
            { name: 'Pumpkin Seeds', quantity: '20g' },
          ],
        },
        {
          recipeName: 'Rice Cakes with Peanut Butter',
          ingredients: [
            { name: 'Rice Cakes', quantity: '2 pcs' },
            { name: 'Peanut Butter', quantity: '2 tbsp' },
            { name: 'Banana Slices', quantity: '1 medium' },
            { name: 'Honey', quantity: '1 tsp' },
            { name: 'Chia Seeds', quantity: '1 tsp' },
          ],
        },
        {
          recipeName: 'Hummus and Veggies',
          ingredients: [
            { name: 'Hummus', quantity: '100g' },
            { name: 'Carrot Sticks', quantity: '100g' },
            { name: 'Cucumber Slices', quantity: '100g' },
            { name: 'Bell Pepper Strips', quantity: '100g' },
            { name: 'Cherry Tomatoes', quantity: '100g' },
          ],
        },
        {
          recipeName: 'Protein Shake',
          ingredients: [
            { name: 'Protein Powder', quantity: '1 scoop' },
            { name: 'Milk or Water', quantity: '300ml' },
            { name: 'Banana', quantity: '1 medium' },
            { name: 'Peanut Butter', quantity: '1 tbsp' },
            { name: 'Spinach', quantity: '1 cup' },
          ],
        },
      ],
    },
    {
      mealName: 'Meal 3 - Lunch',
      recipes: [
        {
          recipeName: 'Grilled Chicken Salad',
          ingredients: [
            { name: 'Chicken Breast', quantity: '200g' },
            { name: 'Mixed Greens', quantity: '100g' },
            { name: 'Cherry Tomatoes', quantity: '10 pcs' },
            { name: 'Olive Oil', quantity: '2 tbsp' },
            { name: 'Balsamic Vinegar', quantity: '1 tbsp' },
          ],
        },
        {
          recipeName: 'Veggie Stir Fry',
          ingredients: [
            { name: 'Broccoli', quantity: '150g' },
            { name: 'Bell Peppers', quantity: '100g' },
            { name: 'Carrots', quantity: '100g' },
            { name: 'Soy Sauce', quantity: '2 tbsp' },
            { name: 'Sesame Oil', quantity: '1 tbsp' },
          ],
        },
        {
          recipeName: 'Pasta Primavera',
          ingredients: [
            { name: 'Pasta', quantity: '200g' },
            { name: 'Zucchini', quantity: '1 medium' },
            { name: 'Cherry Tomatoes', quantity: '10 pcs' },
            { name: 'Parmesan Cheese', quantity: '50g' },
            { name: 'Olive Oil', quantity: '2 tbsp' },
          ],
        },
        {
          recipeName: 'Quinoa Bowl',
          ingredients: [
            { name: 'Quinoa', quantity: '150g' },
            { name: 'Black Beans', quantity: '100g' },
            { name: 'Corn', quantity: '50g' },
            { name: 'Avocado', quantity: '1 medium' },
            { name: 'Lime Juice', quantity: '2 tbsp' },
          ],
        },
        {
          recipeName: 'Fruit Smoothie',
          ingredients: [
            { name: 'Banana', quantity: '1 medium' },
            { name: 'Berries', quantity: '100g' },
            { name: 'Greek Yogurt', quantity: '150g' },
            { name: 'Honey', quantity: '1 tbsp' },
            { name: 'Almond Milk', quantity: '200ml' },
          ],
        },
      ],
    },
    {
      mealName: 'Meal 4 - Afternoon Snack',
      recipes: [
        {
          recipeName: 'Veggie Sticks and Hummus',
          ingredients: [
            { name: 'Carrot', quantity: '1 medium' },
            { name: 'Celery', quantity: '1 stalk' },
            { name: 'Cucumber', quantity: '1 medium' },
            { name: 'Hummus', quantity: '100g' },
            { name: 'Bell Pepper', quantity: '1 medium' },
          ],
        },
        {
          recipeName: 'Yogurt with Honey',
          ingredients: [
            { name: 'Yogurt', quantity: '150g' },
            { name: 'Honey', quantity: '1 tbsp' },
            { name: 'Almonds', quantity: '20g' },
            { name: 'Chia Seeds', quantity: '1 tbsp' },
            { name: 'Cinnamon', quantity: '1 tsp' },
          ],
        },
        {
          recipeName: 'Cheese and Crackers',
          ingredients: [
            { name: 'Cheese', quantity: '100g' },
            { name: 'Whole Wheat Crackers', quantity: '5-6 pcs' },
            { name: 'Apple Slices', quantity: '1 medium' },
            { name: 'Walnuts', quantity: '10 pcs' },
            { name: 'Grapes', quantity: '50g' },
          ],
        },
        {
          recipeName: 'Smoothie',
          ingredients: [
            { name: 'Banana', quantity: '1 medium' },
            { name: 'Spinach', quantity: '1 cup' },
            { name: 'Almond Milk', quantity: '250ml' },
            { name: 'Protein Powder', quantity: '1 scoop' },
            { name: 'Berries', quantity: '100g' },
          ],
        },
        {
          recipeName: 'Nut Butter on Rice Cakes',
          ingredients: [
            { name: 'Rice Cakes', quantity: '2 pcs' },
            { name: 'Almond Butter', quantity: '2 tbsp' },
            { name: 'Sliced Banana', quantity: '1 medium' },
            { name: 'Honey', quantity: '1 tsp' },
            { name: 'Chia Seeds', quantity: '1 tsp' },
          ],
        },
      ],
    },
    {
      mealName: 'Meal 5 - Dinner',
      recipes: [
        {
          recipeName: 'Baked Salmon',
          ingredients: [
            { name: 'Salmon Fillet', quantity: '200g' },
            { name: 'Lemon', quantity: '1 medium' },
            { name: 'Asparagus', quantity: '150g' },
            { name: 'Olive Oil', quantity: '2 tbsp' },
            { name: 'Garlic', quantity: '2 cloves' },
          ],
        },
        {
          recipeName: 'Chicken Stir Fry',
          ingredients: [
            { name: 'Chicken Breast', quantity: '200g' },
            { name: 'Bell Peppers', quantity: '100g' },
            { name: 'Broccoli', quantity: '100g' },
            { name: 'Soy Sauce', quantity: '2 tbsp' },
            { name: 'Sesame Oil', quantity: '1 tbsp' },
          ],
        },
        {
          recipeName: 'Vegetable Curry',
          ingredients: [
            { name: 'Mixed Vegetables', quantity: '300g' },
            { name: 'Coconut Milk', quantity: '400ml' },
            { name: 'Curry Paste', quantity: '2 tbsp' },
            { name: 'Rice', quantity: '150g' },
            { name: 'Cilantro', quantity: 'to garnish' },
          ],
        },
        {
          recipeName: 'Beef Tacos',
          ingredients: [
            { name: 'Ground Beef', quantity: '200g' },
            { name: 'Taco Shells', quantity: '4 pcs' },
            { name: 'Lettuce', quantity: '100g' },
            { name: 'Tomato', quantity: '1 medium' },
            { name: 'Cheese', quantity: '50g' },
          ],
        },
        {
          recipeName: 'Pasta with Marinara Sauce',
          ingredients: [
            { name: 'Pasta', quantity: '200g' },
            { name: 'Marinara Sauce', quantity: '200g' },
            { name: 'Parmesan Cheese', quantity: '50g' },
            { name: 'Basil', quantity: 'to taste' },
            { name: 'Olive Oil', quantity: '1 tbsp' },
          ],
        },
      ],
    },
    {
      mealName: 'Meal 6 - Supper',
      recipes: [
        {
          recipeName: 'Cottage Cheese with Fruit',
          ingredients: [
            { name: 'Cottage Cheese', quantity: '200g' },
            { name: 'Peach or Pear', quantity: '1 medium' },
            { name: 'Honey', quantity: '1 tbsp' },
            { name: 'Almonds', quantity: '20g' },
            { name: 'Chia Seeds', quantity: '1 tsp' },
          ],
        },
        {
          recipeName: 'Vegetable Soup',
          ingredients: [
            { name: 'Mixed Vegetables', quantity: '200g' },
            { name: 'Vegetable Broth', quantity: '500ml' },
            { name: 'Onion', quantity: '1 medium' },
            { name: 'Garlic', quantity: '2 cloves' },
            { name: 'Olive Oil', quantity: '1 tbsp' },
          ],
        },
        {
          recipeName: 'Peanut Butter Banana Sandwich',
          ingredients: [
            { name: 'Whole Wheat Bread', quantity: '2 slices' },
            { name: 'Peanut Butter', quantity: '2 tbsp' },
            { name: 'Banana', quantity: '1 medium' },
            { name: 'Honey', quantity: '1 tsp' },
            { name: 'Chia Seeds', quantity: '1 tsp' },
          ],
        },
        {
          recipeName: 'Dark Chocolate and Almonds',
          ingredients: [
            { name: 'Dark Chocolate', quantity: '30g' },
            { name: 'Almonds', quantity: '30g' },
            { name: 'Raisins', quantity: '20g' },
            { name: 'Coconut Flakes', quantity: '10g' },
            { name: 'Honey', quantity: '1 tsp' },
          ],
        },
        {
          recipeName: 'Chia Pudding',
          ingredients: [
            { name: 'Chia Seeds', quantity: '30g' },
            { name: 'Almond Milk', quantity: '200ml' },
            { name: 'Honey', quantity: '1 tbsp' },
            { name: 'Vanilla Extract', quantity: '1 tsp' },
            { name: 'Berries', quantity: '100g' },
          ],
        },
      ],
    },
  ];

  const toggleMealExpansion = (mealIndex: number) => {
    setExpandedMeal(expandedMeal === mealIndex ? null : mealIndex);
  };

  const toggleRecipeExpansion = (recipeIndex: number) => {
    setExpandedRecipe(expandedRecipe === recipeIndex ? null : recipeIndex);
  };

  const [isOpen] = useState(false);
  
  return (
    <DefaultLayout isModalOpen={isOpen}>
      <Breadcrumb pageName="My Diet Plans" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
        {meals.map((meal, mealIndex) => (
          <div key={mealIndex} className="mb-6">
            <div
              className="flex justify-between items-center p-4 bg-blue-100 dark:bg-gray-800 cursor-pointer rounded-lg"
              onClick={() => toggleMealExpansion(mealIndex)}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-neutral-600">
                {meal.mealName}
              </h3>
              <span className="text-2xl">
                {expandedMeal === mealIndex ? '-' : '+'}
              </span>
            </div>
  
            <div className={`overflow-hidden transition-all duration-400 ease-in-out ${
              expandedMeal === mealIndex ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}>
              {expandedMeal === mealIndex && (
                <div>
                  {meal.recipes.map((recipe, recipeIndex) => (
                    <div key={recipeIndex}>
                      <div
                        className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 cursor-pointer rounded-lg"
                        onClick={() => toggleRecipeExpansion(recipeIndex)}
                      >
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                          {recipe.recipeName}
                        </h4>
                        <span className="text-2xl">
                          {expandedRecipe === recipeIndex ? '-' : '+'}
                        </span>
                      </div>
  
                      <div
                      className={`overflow-hidden transition-all duration-400 ease-in-out ${
                        expandedRecipe === recipeIndex ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                        {expandedRecipe === recipeIndex && (
                          <div className="grid grid-cols-5 gap-4 p-4">
                            {recipe.ingredients.map((ingredient, index) => (
                              <div
                                key={index}
                                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center"
                              >
                                <span className="font-semibold">{ingredient.name}</span>
                                <span className="text-sm text-gray-500">{ingredient.quantity}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
  
};

export default FoodPlans;
