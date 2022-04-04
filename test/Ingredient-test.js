import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';

describe('Ingredient', () => {

  let ingredientsData, ingredient;

  beforeEach(() => {

    ingredientsData = [
      {
        id: 1,
        name: 'wheat flour',
        estimatedCostInCents: 142,
      },
      {
        id: 2,
        name: 'bicarbonate of soda',
        estimatedCostInCents: 582,
      },
      {
        id: 3,
        name: 'eggs',
        estimatedCostInCents: 472,
      },
    ]

    ingredient = new Ingredient(ingredientsData);
  });

  it('should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });

  it('should be an instance of Ingredient', () => {
    expect(ingredient).to.be.an.instanceOf(Ingredient);
  });

  it('should be able to contain all of the ingredients', () => {
    expect(ingredient.ingredientList.length).to.equal(3);
  });

  it('should be able to search by ingredient id', () => {
    expect(ingredient.addNameOfIngredient(1)).to.equal('wheat flour');
    expect(ingredient.addNameOfIngredient(3)).to.equal('eggs');
  });

  it('should be able to provide the Ingredient cost per unit', () => {
    expect(ingredient.provideIngredientCostPerUnit(1)).to.equal(142);
    expect(ingredient.provideIngredientCostPerUnit(3)).to.equal(472);
  });
});
