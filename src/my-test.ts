import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from 'k6/data';
import type { RecommendationRequest, RecommendationResponse } from "./quickpizza"

const BASE_URL: string = __ENV.BASE_URL || 'http://localhost:3333';

export const options = {
  vus: 10,
  duration: '30s',
};

const customers = new SharedArray('all my customers', function () {
  return JSON.parse(open('./data/customers.json')).customers;
});

export default () => {
  let restrictions: RecommendationRequest = {
    maxCaloriesPerSlice: 500,
    mustBeVegetarian: false,
    excludedIngredients: ["pepperoni"],
    excludedTools: ["knife"],
    maxNumberOfToppings: 6,
    minNumberOfToppings: 2
  }
  let res = http.post(`${BASE_URL}/api/pizza`, JSON.stringify(restrictions), {
    headers: {
      'Content-Type': 'application/json',
      'X-User-ID': customers[Math.floor(Math.random() * customers.length)],
    },
  });
  check(res, { "status is 200": (res) => res.status === 200 });

  let recRes: RecommendationResponse = JSON.parse(res.body as string);
  console.log(`${recRes.pizza.name} (${recRes.pizza.ingredients.length} ingredients)`);

  sleep(1);
}