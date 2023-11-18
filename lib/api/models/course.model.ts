import type ID from "./_id.model";
import type Timestamp from "./_timestamp.model";

type Course = {
    name: string;
    description: string;
    illustration: string;
    is_new: boolean;
    is_liked: boolean;
    is_enrolled: boolean;
    is_completed: boolean;
} & ID & Timestamp;

export default Course;