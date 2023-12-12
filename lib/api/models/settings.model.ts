import type ID from "./_id.model";

type Settings = {
    is_promotional_email_enabled: boolean;
    is_push_notifications_enabled: boolean;
} & ID;

export default Settings;