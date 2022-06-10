const isChatCommand = (input: string): boolean => {
    let regex: RegExp = /([/])\w+/g;
    return regex.test(input);
}

export { isChatCommand }