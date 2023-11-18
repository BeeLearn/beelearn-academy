import type ID from "./_id.model";
import type Course from "./course.model";

type Category = {
    name: string;
    courses: Course[];
} & ID;

export default Category;
