
export const shuffle = <T>(arr: Array<T>) => {
    for (let n = 0; n < arr.length; ++n) {
        const m = Math.floor(Math.random() * arr.length);
        const t = arr[n];
        arr[n] = arr[m];
        arr[m] = t;
    }
}

