import type Breadcrumb from "../models/_breadcrumb.model";
import type Paginate from "../models/_paginate.model";
import type Topic from "../models/topic.model";
import type TopicBreadcrumb from "../models/topic_breadcrumb.model";
import { ApiProviderImpl, type TApiOption, type TApiPatchOption } from "./api.provider";

export default class TopicProvider extends ApiProviderImpl {
  protected apiPath: string = "/api/catalogue/topics/";

  list(options?: Pick<TApiOption, "query" | "url">) {
    return this.get<Breadcrumb<TopicBreadcrumb, Paginate<Topic>>>(options);
  }

  update(options: Pick<TApiPatchOption, "path" | "data">){
    return this.patch<Topic>(options);
  }
}
