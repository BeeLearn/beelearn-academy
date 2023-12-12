import type ID from "./_id.model";
import type Timestamp from "./_timestamp.model";

type Notification = {
    icon?: string,
    image: string,
    title: string, 
    body: string,
    is_read: boolean,
    metadata: Record<string, string>
} & ID & Timestamp;

export default Notification;
