import Api from "~/lib/api";
import type User from "~/lib/api/models/user.model";
import type { DeepPartial } from "~/widget.types";

export type UserState = {
  user?: User;
};

export const useUserStore = defineStore("user", {
  state(): UserState {
    return {
      user: undefined,
    };
  },
  actions: {
    async getCurrentUser() {
      const response = await Api.instance.userProvider.getCurrentUser();
      this.user = response.data;
    },
    async updateCurrentUser(data: Record<string, any>, hasFile = false) {
      const response = await Api.instance.userProvider.updateCurrentUser(
        { data },
        hasFile
      );

      this.user = response.data;
    },
  },
  getters: {
    profile(state): User["profile"] {
      return state.user!.profile;
    },
    settings(state): User["settings"] {
      return state.user!.settings;
    },
  },
});
