export type IdGenerator = { getId: () => string };

export const createSequentialIdGenerator = (): IdGenerator => {
    let id = 0;
    return {
        getId: () => {
            ++id;
            return `${id}`;
        },
    };
};
