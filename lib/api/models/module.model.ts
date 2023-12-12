import type ID from "./_id.model";
import type Timestamp from "./_timestamp.model";
import type Lesson from "./lesson.model";

type Module = {
    name: string;
    description?: string;
    is_unlocked: boolean;
    is_completed: boolean;
    lessons: Lesson[],
} & ID & Timestamp;

export default Module;