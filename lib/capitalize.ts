const capitalizeWord = (word: string) => {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1);
}

export { capitalizeWord }