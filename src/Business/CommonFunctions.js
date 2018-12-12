// import ImageResizer from 'react-native-image-resizer';
// import ImgToBase64 from 'react-native-image-base64';
import {
    Alert, NativeModules
} from 'react-native';

// export async function GetTime(data) {
    
//     var date, TimeType, hour, minutes, seconds, fullTime;

//     date = new Date(data);
//     hour = date.getHours();
    
//     // Getting the current minutes from date object.
//     minutes = date.getMinutes();

//     // Checking if the minutes value is less then 10 then add 0 before minutes.
//     if (minutes < 10) {
//         minutes = '0' + minutes.toString();
//     }


//     //Getting current seconds from date object.
//     seconds = date.getSeconds();

//     // If seconds value is less than 10 then add 0 before seconds.
//     if (seconds < 10) {
//         seconds = '0' + seconds.toString();
//     }


//     // Adding all the variables in fullTime variable.
//     fullTime = hour.toString() + ':' + minutes.toString();


//     return fullTime;
//     // debugger;
// }

export function getTimeStamp() {
    var timeStamp = Math.floor(Date.now());
    return timeStamp;
}

//fromtime= start time , currTime = currtime
// export function getTimeDiff(fromTime, currTime) {


//     var curr_time = new Date(currTime);
//     var from_time = new Date(fromTime);
//     // debugger;

//     var diffMs = (curr_time - from_time); // milliseconds between now & Christmas
//     var diffDays = Math.floor(diffMs / 86400000); // days
//     var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
//     var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
//     if (diffHrs.toString().length == 1) {
//         diffHrs = "0" + diffHrs
//     }
//     else {
//         diffHrs = diffHrs
//     }
//     if (diffMins.toString().length == 1) {
//         diffMins = "0" + diffMins
//     }
//     else {
//         diffMins = diffMins
//     }
//     var data = diffHrs + ":" + diffMins
//     return data;
// }

// export function getTotalTime(currTime, Previousdata) {
//     //   debugger;
//     var CurrTime = currTime.split(":")
//     var Previousdata = Previousdata.split(":")
//     var HourDiff = parseInt(CurrTime[0]) + parseInt(Previousdata[0])
//     if (HourDiff.toString().length == 1) {
//         HourDiff = "0" + HourDiff
//     }
//     else {
//         HourDiff = HourDiff
//     }
//     var MinDiff = parseInt(CurrTime[1]) + parseInt(Previousdata[1])
//     if (MinDiff.toString().length == 1) {
//         MinDiff = "0" + MinDiff
//     }
//     else {
//         MinDiff = MinDiff
//     }

//     totalTime = HourDiff + ":" + MinDiff
//     return totalTime;

// }
//required uri of the image and image type (jpeg or png etc.)


// export async function ImageResize(ImageUri, ImageType) {
//     var ResizedImage = ""
//     // debugger;
    
//     if (ImageUri.length != 0) {


//         await ImageResizer.createResizedImage(ImageUri, 1500, 1500, 'JPEG', 100)
//             .then(async (response) => {
           
//                 await ImgToBase64.getBase64String(response.uri)
//                     .then(base64String => {
//                         ResizedImage = "data:image/"+ImageType+";base64,"+base64String
                        
//                     })
//                     .catch(err => (alert(err)));

//             })
         
//             .catch(err => {
//                 console.log(err);
//                 debugger
//                 return Alert.alert('Unable to resize the photo', 'Check the console for full the error message');
//             });
//     }
//     return ResizedImage;

// }


// export async function getResizedImageData(uri) {
//     var ResizedImage = ""

//     debugger
//     NativeModules.RNImageToBase64.getBase64String(uri, (err, base64) => {
//         // Do something with the base64 string
//         // ResizedImage = base64
//         debugger
//         return base64;

//     }).then((encodeData) => {
//         debugger;
//         ResizedImage = encodeData
//     })
//     return ResizedImage;
//     debugger


// }
// export  function getResizedImageData(uri) {
//     var ResizedImage = ""

// debugger
// NativeModules.RNImageToBase64.getBase64String(uri, (err, base64).then(ResizedImage =>{
//         debugger
//         alert(ResizedImage)
//         return ResizedImage;

//     }))


// }
export function getDocType(filePath) {

    if (filePath.length != 0) {
        var strings = filePath.split(".")
        let i = strings.length
        var type = strings[i - 1]
        return type;
    }

}
export function  getDistance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist.toFixed(3);
    }
}