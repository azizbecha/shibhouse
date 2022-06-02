import { useMediaQuery } from "react-responsive";

export const useScreenType = () => {

    const isBigScreen = useMediaQuery({ minWidth: 1824 })
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })

    if(isBigScreen){
        return "3-cols";
    }
    
    if(isDesktopOrLaptop){
        return "2-cols";
    }
    
    if(isTabletOrMobile){
        return "1-cols";
    }
    
    return "fullscreen";
};