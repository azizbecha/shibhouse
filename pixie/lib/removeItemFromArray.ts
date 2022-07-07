function removeItem<T>(arr: Array<T>, value: T): Array<T> { 
    const index: number = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

export { removeItem }