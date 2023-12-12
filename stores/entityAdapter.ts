type RecordKey = number | string | symbol;

export type EntityState<V> = {
  ids: Array<RecordKey>;
  entities: Record<RecordKey, V>;
};

export type EntityChangePayload<K> = {
  id: RecordKey;
  changes: Partial<K>;
};

type CreateEntityAdapter<K, V extends RecordKey> = {
  getSelectorId: (payload: K) => V;
  sortBy?: (a: K, b: K) => number;
};

export const createEntityAdapter = <K, V extends RecordKey = RecordKey>({
  getSelectorId,
  sortBy,
}: CreateEntityAdapter<K, V>) => ({
  getInitialState<T>(defaults?: T) {
    return {
      ...defaults,
      ids: [],
      entities: {},
    } as EntityState<K> & T;
  },
  addOne(state: EntityState<K>, payload: K) {
    const id = getSelectorId(payload);
    state.ids.push(id);
    state.entities[id] = payload;
  },
  addMany(state: EntityState<K>, payload: K[]) {
    for (const element of payload) {
      this.addOne(state, element);
    }
  },
  setOne(state: EntityState<K>, payload: K) {
    const id = getSelectorId(payload);
    state.entities[id] = payload;
  },
  setMany(state: EntityState<K>, payload: K[]) {
    const ids: V[] = [];
    const entities = {} as Record<V, K>;

    payload.forEach((entity) => {
      const id = getSelectorId(entity);
      ids.push(id);
      entities[id] = entity;
    });

    state.ids = ids;
    state.entities = entities;
  },
  updateOne(state: EntityState<K>, payload: EntityChangePayload<K>) {
    const data = Object.assign(state.entities[payload.id]!, payload.changes);
    state.entities[payload.id] = data;
  },
  removeOne(state: EntityState<K>, id: V) {
    const idIndex = state.ids.indexOf(id);
    if (idIndex > 0) state.ids.splice(idIndex, 0);
    delete state.entities[id];
  },
  getSelector(state: EntityState<K>) {
    return {
      selectAll() {
        const values = Object.values(state.entities);
        if (sortBy) return values.sort(sortBy);
        return values;
      },
      selectOne(id: ReturnType<typeof getSelectorId>) {
        return state.entities[id];
      },
    };
  },
});

export enum PromiseStatus {
  pending = "pending",
  rejected = "rejected",
  resolved = "resolved",
}

export const reducer = function <T extends Promise<any>>(promise: T) {
  const cases: Record<PromiseStatus, Array<(payload: any) => void>> = {
    [PromiseStatus.pending]: [],
    [PromiseStatus.rejected]: [],
    [PromiseStatus.resolved]: [],
  };

  return {
    addCase(status: PromiseStatus, action: (payload: Awaited<T>) => void) {
      cases[status].push(action);
      return this;
    },
    async execute() {
      for (const action of cases.pending) {
        action(null);
      }

      promise
        .then((result) => {
          for (const action of cases.resolved) {
            action(result);
          }

          return Promise.resolve(result);
        })
        .catch((error) => {
          for (const action of cases.rejected) {
            action(error);
          }

          return Promise.reject(error);
        });
    },
  };
};
