export interface LoadingState {
    state: "idle" | "pending" | "failed" | "success";
}

export interface PaginateState {
    count: number,
    next: string | null,
    previous: string | null,
}
