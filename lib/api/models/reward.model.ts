import type ID from "./_id.model";
import type Price from "./price.model";

type Reward = {
    type: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    dark_color: string;
    price: Price;
    is_unlocked: boolean;
} & ID;

export default Reward;
