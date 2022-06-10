const isChatCommand = (input: string): boolean => {
    let regex: RegExp = /\/[a-zA-Z]+/i;
    return regex.test(input);
}

export { isChatCommand }