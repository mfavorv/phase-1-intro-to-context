// Your code here
    function createEmployeeRecord(employeeDetails)
{
   return  {
    firstName : employeeDetails[0],
     familyName : employeeDetails[1],
     title : employeeDetails[2],
     payPerHour : employeeDetails[3],
     timeInEvents : [ ],
     timeOutEvents : [ ]
     }


}

function createEmployeeRecords(employeeData){
  return employeeData.map((employeeDetails) => {
    return createEmployeeRecord(employeeDetails) })
  } 

  function createTimeInEvent(employeeDetails, dateStamp){
    let [date, hour] = dateStamp.split(" ");

    function timeInEvent() {
    return {
type: "TimeIn",
hour: parseInt(hour),
date: date

    }
}

    employeeDetails.timeInEvents.push(timeInEvent());
    return employeeDetails;
        
  }

  function createTimeOutEvent(employeeDetails, dateStamp){
    let [date, hour] = dateStamp.split(" ");

    function timeOutEvent() {
        return {
    type: "TimeOut",
    hour: parseInt(hour),
    date: date
    
        }
    }

    employeeDetails.timeOutEvents.push(timeOutEvent());
    return employeeDetails;

  }

  function hoursWorkedOnDate(employeeDetails, date){
    let inEvent = employeeDetails.timeInEvents.find(event => event.date === date);
    let outEvent = employeeDetails.timeOutEvents.find(event => event.date === date);


     let hoursWorked = parseInt(outEvent.hour - inEvent.hour)/ 100;    
     return hoursWorked ;
    

}

function wagesEarnedOnDate(employeeDetails, date){
  let hours = hoursWorkedOnDate(employeeDetails, date);
  let rate = employeeDetails.payPerHour;
  let wages = parseInt(rate * hours);
  return wages;
    
}

function allWagesFor(employeeDetails){
  let dates = employeeDetails.timeInEvents.map(({ date }) => {return date});
  let amount = dates.reduce((money, date) => {
    return money + wagesEarnedOnDate(employeeDetails,date)
  }, 0);
  return amount

}

function calculatePayroll(arrayOfEmployeeRecords){
 return arrayOfEmployeeRecords.reduce((totalAmount, employeeRecord) => {
  return totalAmount + allWagesFor(employeeRecord);
 }, 0);
}

 