import { useContext, createContext } from 'react';
import { types, Instance } from 'mobx-state-tree';

const RootModel = types.model();

export const RootStore = RootModel.create();
export type RootInstance = Instance<typeof RootStore>;

const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
    const store = useContext(RootStoreContext);
    if (store === null) {
        throw new Error("Store cannot be null, please add a context provider");
    }
    return store;
}
