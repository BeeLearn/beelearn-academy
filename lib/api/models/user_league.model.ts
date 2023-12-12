import type ID from "./_id.model";
import type User from "./user.model";

type UserLeague = {
  id: number;
  user: Partial<User>;
  xp: number;
} & ID;

export default UserLeague;
