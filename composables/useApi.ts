import Api from "~/lib/api";

export default function useApi(accessToken?: string) {
  if (accessToken) {
    Api.accessToken = accessToken;
  }

  return Api.instance;
}
