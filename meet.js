//time must be in 24hours format
const Time = require('./time')

function create(name){
    return{
        subject: name,
        day: '',
        startHour:0,
        startMinute: 0,
        endHour: 0,
        endMinute: 0,
    }
}

function between(min,target,max){
    return min < target && target < max
}


/*
    gina check kung ang duwa ka
    meeting naga ovelap
    su tanan na meeting ang expexted format kay naka 24 hour
*/

function overlap(time1,time2){
    
    if(time1.day != time2.day)return false

    start = []
    end = []

    start[0] = (Time.convert(time1.startHour))+time1.startMinute
    start[1] = (Time.convert(time2.startHour))+time2.startMinute
    end[0] =  (Time.convert(time1.endHour))+time1.endMinute
    end[1] =  (Time.convert(time2.endHour))+time2.endMinute
   
    //equal
   
    if(start[0] === start[1] && end[0] === end[1])  return true
    
    //time2 start is in betwen time1 start and end
    if(between(start[0],start[1],end[0])) return true
    
    //time1 start is in betwen time2 start and end
    if(between(start[1],start[0],end[1])) return true

    //time1 end is in betwen time2 start and end
    if(between(start[1],end[0],end[1])) return true
    
    //time2 end is in betwen time1 start and end
    if(between(start[0],end[1],end[0])) return true
    return false
}

/*
    check anay kung naka 24 format then console lag

    time: nagaexpect san *100 format
    leap san pira ka hours (1 unit - 1hour) basi sa time
    example: time: 700 (7:00) unit: 2
    result: time: 900 (9:00)
    
*/
function leap(time,unit){
    if(!Time.validate(time))console.log('Opps leaptime has input of 24hour format')
    return time + unit*100
}

/*
    creat a temp meeting
    {name} =  meeting name
    day = Monday..etc
    start = 700 (naga expect san *100 na format (700) rather sa 24format (7:00))
    unit = 1 unit = 1 hour
*/
function tempMeet({name},day,start,unit){
    const temp = create(name)
    const tempLeap = leap(start,unit)
        temp.day = day
        //get hour
        temp.startHour = start/100
        //get minute
        temp.startMinute = start%100
        //get hour
        temp.endHour = tempLeap/100
        //end hour
        temp.endMinute = tempLeap%100

    return temp
}


module.exports = {create,overlap,leap,tempMeet}

// const time1 = create();
// const time2 = create();

// time1.day = 'monday'
// time1.startHour = 6
// time1.startMinute = 0
// time1.endHour = 9
// time1.endMinute = 0


// time2.day = 'monday'
// time2.startHour = 6
// time2.startMinute = 0
// time2.endHour = 9
// time2.endMinute = 0

// console.log(overlap(time1,time2))