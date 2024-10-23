import validateRequest from "../helpers/validateRequest.helper.js";
import model from "../models/init.js";
import HTTP_STATUS from "../helpers/HTTPStatus.Helper.js";

class PromoCodeController {
  static async addPromoCode(req, res, next) {
    try {
      const { code, description, discountType, discountValue, expiryDate } =
        req.body;
      validateRequest(
        ["code", "description", "discountType", "discountValue", "expiryDate"],
        req.body,
        {},
        { discountType: ["percentage", "cashback", "item"] }
      );
      const newPromoCode = await model.PromoCode.build({
        code,
        description,
        discountType,
        discountValue,
        expiryDate,
      });
      await newPromoCode.save();
      return res.success(
        newPromoCode,
        "created",
        HTTP_STATUS.CREATED,
        `${code} promo code has been successfully added.`
      );
    } catch (error) {
      next(error);
    }
  }
}

export default PromoCodeController;
