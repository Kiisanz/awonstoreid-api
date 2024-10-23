function validate(requiredFields, body, minLength = {}, enums = {}) {
  const messages = [];

  requiredFields.forEach((field) => {
    const value = body[field];

    // Validasi untuk memastikan field tidak kosong
    if (typeof value === "string" && value.trim() === "") {
      messages.push(`${field} must be provided and cannot be empty.`);
    } else if (!value) {
      messages.push(`${field} must be provided.`);
    }

    // Validasi panjang minimal
    if (
      minLength[field] &&
      typeof value === "string" &&
      value.length < minLength[field]
    ) {
      messages.push(
        `${field} must be at least ${minLength[field]} characters long.`
      );
    }

    // Validasi untuk 'discountValue' sebagai decimal
    if (field === "discountValue") {
      if (typeof value !== "number" || isNaN(value)) {
        messages.push("discountValue must be a valid number.");
      } else if (!/^\d+(\.\d{1,2})?$/.test(value.toString())) {
        messages.push(
          "discountValue must be a decimal with up to two decimal places."
        );
      }
    }

    // Validasi untuk 'discountType' sebagai enum
    if (field === "discountType") {
      if (!enums.discountType || !enums.discountType.includes(value)) {
        const allowedValues = enums.discountType
          ? enums.discountType.join(", ")
          : "none";
        messages.push(
          `discountType must be one of the following: ${allowedValues}`
        );
      }
    }

    // Validasi untuk 'price' dan 'quantity'
    if (
      (field === "price" || field === "quantity") &&
      typeof value !== "number"
    ) {
      messages.push(`${field} must be a number.`);
    }

    // Validasi untuk 'expiryDate'
    if (field === "expiryDate") {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        messages.push("expiryDate must be a valid date.");
      } else if (date < new Date()) {
        messages.push("expiryDate must be in the future.");
      }
    }
  });

  return messages;
}

export default validate;
