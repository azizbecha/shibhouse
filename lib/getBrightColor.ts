const getBrightColor = () => { 
    return `hsla(${~~(360 * Math.random())},90%,70%,0.8)`
}

export { getBrightColor }