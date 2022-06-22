import { useMediaQuery } from "react-responsive";

export const useScreenType = () => {

    const isBigScreen = useMediaQuery({ minWidth: 1824 })
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

    if(isBigScreen){
        return "bigScreen";
    }
    
    if(isDesktopOrLaptop){
        return "mediumScreen";
    }
    
    if(isTabletOrMobile){
        return "smallScreen";
    }
    
    return "fullscreen";
};