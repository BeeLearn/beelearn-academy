import type ID from "./_id.model";
import type Timestamp from "./_timestamp.model";
import type Course from "./course.model";

type Category = {
    name: string;
    description: string;
    courses: Course[];
} & ID & Timestamp;

export default Category;
