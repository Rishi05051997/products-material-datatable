var faker = require('faker');
var database = {
  products: []
};
for (let i = 1; i <= 100; i++) {
  database.products.push({
    id: i,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    rating: Math.floor(Math.random() * 5 + 1)
  });
}
console.log(JSON.stringify(database));
