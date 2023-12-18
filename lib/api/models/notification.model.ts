import type ID from "./_id.model";
import type Timestamp from "./_timestamp.model";

export const NotificationTopic = {
  ADS: "Ads",
  LIVE: "Live",
  LEVEL: "Level",
  REWARD: "Reward",
  STREAK: "Streak",
  COMMENT: "Comment",
  GENERAL: "General",
};

type Notification = {
  icon?: string;
  image: string;
  title: string;
  body: string;
  is_read: boolean;
  topic: keyof typeof NotificationTopic;
  metadata: Record<string, string>;
} & ID &
  Timestamp;

export default Notification;
