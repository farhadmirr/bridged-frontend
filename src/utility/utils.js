import React from 'react'
import platform from 'platform';
import useWindowDimensions from '../hooks/useWindowDimensions';
export const OS = platform.os

export function generateOtpData(mobileNum) {
    // const { height, width } = useWindowDimensions();

    const Data = 'mobile=98' + mobileNum + '&CountryID=1&device_details={' +
        `"Os":` + `"` + platform.os.family + `",`+`"OsVersion":`+`"`+platform.os.version+`",`+`"DeviceInfo":{"resolation":"`+window.innerWidth+"*"+window.innerHeight+`",`+
        `"CpuArchitecture":"`+platform.os.architecture+`","MachineHostName":"`+platform.description+`","UUID":{},"fcmID":"","Metrix":{}}}&app_data={"Version":"0.0.1","ID":"net.myco.userpanel"}`
    return Data
}
export function validateOtpData(mobile,otp,name,lastname){
    const Data = `mobile=98`+mobile+`&device_details={"Os":"`+platform.os.family+
    `","OsVersion":"`+platform.os.version + `","DeviceInfo":{"resolation":"`+window.innerWidth+"*"+window.innerHeight+`","fcmID":"","CpuArchitecture":"`+platform.os.architecture+`","MachineHostName":"`+platform.description+`","UUID":""}}`+
    `&otp=`+otp +`&Firstname=`+name +`&Lastname=`+lastname
    return Data
}

export function startsWith(str, word) {
    return str.lastIndexOf(word, 0) === 0;
}