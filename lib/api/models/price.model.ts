import type ID from "./_id.model";

export enum PriceType {
    REWARD_ACHIEVE = "REWARD_ACHIEVE",
    LESSON_COMPLETE = "LESSON_COMPLETE",
    STREAK_COMPLETE = "STREAK_COMPLETE",
}

type Price = {
    type: PriceType,
    xp: number,
    bits: number,
} & ID;

export default Price;
