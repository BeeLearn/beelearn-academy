import type ID from "./_id.model";

type Streak = {
    date: string,
    is_today: boolean;
    is_expired: boolean;
    is_complete: boolean;
} & ID;

export default  Streak;
