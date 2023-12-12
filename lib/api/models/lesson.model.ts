import type ID from "./_id.model";

type Lesson = {
    module_id: number;
    name: string;
    description?: string;
    is_unlocked: boolean;
    is_completed: boolean;
} & ID;

export default Lesson;