const isChatCommand = (input: string): boolean => {
    return input[0] == '/'
}

export { isChatCommand }