import { useMediaQuery } from "react-responsive";

export const useScreenType = () => {

    const isBigScreen: boolean = useMediaQuery({ minWidth: 1824 })
    const isDesktopOrLaptop: boolean = useMediaQuery({ minWidth: 1224 })
    const isTabletOrMobile: boolean = useMediaQuery({ maxWidth: 1224 })

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