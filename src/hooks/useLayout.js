import React from 'react'
import useWindowSize from './useWindowSize'

const deviceList = {
    PC: 'PC',
    TABLET: 'TABLET',
    MOBILE: 'MOBILE',
}
export default function useLayout() {
    let [currentDevice, setCurrentDevice] = React.useState(deviceList.PC)
    let { width } = useWindowSize()
    if (width < 576) {
        setCurrentDevice(deviceList.MOBILE)
    } else if (width.value < 1100) {
        setCurrentDevice(deviceList.TABLET)
    } else {
        setCurrentDevice(deviceList.PC)
    }
    return currentDevice;
}