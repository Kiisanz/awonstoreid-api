export const errorMessages = {
  productNotFound: (name) => `Product ${name} not found.`,

  categoryNotFound: (name) => `Category ${name} not found.`,

  noProductsInCategory: (category) =>
    `There are no products in the ${category} category.`,
};
