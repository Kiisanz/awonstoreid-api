class ItemDetailDTO {
  constructor(quantity, price, discount, finalPrice) {
    this.quantity = quantity;
    this.discount = discount;
    this.price = price;
    this.finalPrice = finalPrice;
  }
}

class ItemDTO {
  constructor(itemName, itemDetails) {
    this.itemName = itemName;
    this.itemDetails = itemDetails.map(
      (detail) =>
        new ItemDetailDTO(
          detail.quantity,
          detail.price,
          detail.discount,
          detail.finalPrice
        )
    );
  }
}

class CategoryDTO {
  constructor(categoryName) {
    this.categoryName = categoryName;
  }
}

class ProductDTO {
  constructor(product) {
    this.productId = product.productId;
    this.productName = product.productName;
    this.slug = product.slug;
    this.category = new CategoryDTO(product.Category.categoryName);
    this.items = product.Items.map(
      (item) => new ItemDTO(item.itemName, item.ItemDetails)
    );
  }
}

const productData = (products) => {
  return products.map((product) => new ProductDTO(product));
};

export default productData;
