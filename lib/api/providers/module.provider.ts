import type Breadcrumb from "../models/_breadcrumb.model";
import type Paginate from "../models/_paginate.model";
import type Module from "../models/module.model";
import type ModuleBreadcrumb from "../models/module_breadcrumb.model";
import { ApiProviderImpl, type TApiOption } from "./api.provider";

export default class ModuleProvider extends ApiProviderImpl{
  protected apiPath: string = "/api/catalogue/modules/";

  list(options?: Pick<TApiOption, "query" | "url">){
    return this.get<Breadcrumb<ModuleBreadcrumb, Paginate<Module>>>(options);
  }
}
