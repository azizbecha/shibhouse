const isChatCommand = (input: string): boolean => {
    return input.trim()[0] == '/'
}

export { isChatCommand }