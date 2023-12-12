import type ID from "./_id.model";

type Profile = {
  lives: number;
  xp: number;
  bits: number;
  level: number;
  is_email_verified: boolean;
  daily_streak_minutes: number;
} & ID;

export default Profile;
