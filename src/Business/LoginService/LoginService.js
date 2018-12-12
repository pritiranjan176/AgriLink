
export default class LoginService{
    static func_login(data){
        return data;
    }
    
}




// export function makeList(data) {
//     let finalArr = [];
//     let StopMonitoringDelivery = data.Siri.ServiceDelivery.StopMonitoringDelivery;
//     for (let i = 0; i < StopMonitoringDelivery.length; i++) {
//         // console.log("On Make List" + StopMonitoringDelivery[i]);
//         let StopMonitoringDeliveryObject = StopMonitoringDelivery[i];
//         for (let j = 0; j < StopMonitoringDeliveryObject.MonitoredStopVisit.length; j++) {
//             // console.log("On Make List" + StopMonitoringDeliveryObject.MonitoredStopVisit[j]);
//             let monitoredStopVisitObject = StopMonitoringDeliveryObject.MonitoredStopVisit[j];

//             let finalObject = {
//                 RecordedAtTime: splitDate(monitoredStopVisitObject.RecordedAtTime),
//                 DirectionRef: monitoredStopVisitObject.MonitoredVehicleJourney.DirectionRef,
//                 AimedArrivalTime: splitDate(monitoredStopVisitObject.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime),
//                 ExpectedArrivalTime: splitDate(monitoredStopVisitObject.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime),
//                 AimedDepartureTime: splitDate(monitoredStopVisitObject.MonitoredVehicleJourney.MonitoredCall.AimedDepartureTime),
//                 ExpectedDepartureTime: splitDate(monitoredStopVisitObject.MonitoredVehicleJourney.MonitoredCall.ExpectedDepartureTime),
//             };

//             finalArr.push(finalObject);
//         }
//     }
//     let demoAee = [
//         {
//             RecordedAtTime: 'adsfaf',
//             DirectionRef: 'asdfsadf',
//             AimedArrivalTime: 'asff',
//             ExpectedArrivalTime: 'asdff',
//             AimedDepartureTime: 'asdff',
//             ExpectedDepartureTime: 'asfdfs'
//         },
//         {
//             RecordedAtTime: 'adsfaf',
//             DirectionRef: 'asdfsadf',
//             AimedArrivalTime: 'asff',
//             ExpectedArrivalTime: 'asdff',
//             AimedDepartureTime: 'asdff',
//             ExpectedDepartureTime: 'asfdfs'
//         },
//         {
//             RecordedAtTime: 'adsfaf',
//             DirectionRef: 'asdfsadf',
//             AimedArrivalTime: 'asff',
//             ExpectedArrivalTime: 'asdff',
//             AimedDepartureTime: 'asdff',
//             ExpectedDepartureTime: 'asfdfs'
//         },
//         {
//             RecordedAtTime: 'adsfaf',
//             DirectionRef: 'asdfsadf',
//             AimedArrivalTime: '',
//             ExpectedArrivalTime: 'asdff',
//             AimedDepartureTime: 'asdff',
//             ExpectedDepartureTime: 'asfdfs'
//         },
//         {
//             RecordedAtTime: 'adsfaf',
//             DirectionRef: 'asdfsadf',
//             AimedArrivalTime: '',
//             ExpectedArrivalTime: 'asdff',
//             AimedDepartureTime: 'asdff',
//             ExpectedDepartureTime: 'asfdfs'
//         }
//     ]
//     let dbData = RealmDB.get(DEMO_TABLE);
//     let db = dbData;
//     //debugger;
//     if (dbData.length <= 0) {
//         RealmDB.create(finalArr,DEMO_TABLE);
//     }
//     console.log("On Make List" + finalArr.length);
//     return dbData;
// }

// function dateformat(inputDate) {
//     let date = new Date(inputDate);
//     if (!isNaN(date.getTime())) {
//         let day = date.getDate().toString();
//         let month = (date.getMonth() + 1).toString();
//         // Months use 0 index.

//         return (day[1] ? day : '0' + day[0]) + '/' + (month[1] ? month : '0' + month[0]) + '/' + date.getFullYear();
//     }
// }

// function splitDate(fullDate) {

//     let fields = fullDate.split('T');

//     let date = fields[0];
//     let time = fields[1];
//     return dateformat(date);
// }
