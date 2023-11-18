import type Category from "../models/category.model";

import ApiProvider from "./api.provider";

export default class CategoryProvider extends ApiProvider<Category> {
  protected apiPath: string = "/api/catalogue/categories/";
}
