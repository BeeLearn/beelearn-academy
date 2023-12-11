import type ID from "./_id.model";
import type { Category } from "./metadata.model";
import type Profile from "./profile.model";
import type Settings from "./settings.model";
import type Token from "./token.model";

export const UserType = {
  STUDENT: "Student",
  CURATOR: "CURATOR",
  SPECIALIST: "SPECIALIST",
};

type User = {
  uid: string;
  avatar: string;
  email: string;
  username: string;
  last_name: string;
  first_name: string;
  full_name: string;
  profile: Profile;
  settings: Settings;
  is_premium: boolean;
  token: Token;
  categories: Category[];
  unread_notifications: number;
  user_type: keyof typeof UserType;
} & ID;

export default User;
