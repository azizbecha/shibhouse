const isChatCommand = (input: string): boolean => {
    let regex: RegExp = /[\/\\]/;
    return regex.test(input);
}

export { isChatCommand }