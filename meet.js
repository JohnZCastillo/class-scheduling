//time must be in 24hours format
const Time = require('./time')

function create(name){
    return{
        subject: name,
        purpose: '',
        day: '',
        start: 0,
        end: 0,
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

    start = [time1.start,time2.start]
    end = [time1.end,time2.end]


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
    return time + (unit*100)
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
    temp.day = day
    temp.start = start
    temp.end = leap(start,unit)
    return temp
}


module.exports = {create,overlap,leap,tempMeet}

// const time1 = create('math');
// const time2 = create('english');

// time1.day = 'monday'
// time1.start = 630
// time1.end = 800

// time2.day = 'monday'
// time2.start = 530
// time2.end = 700

// console.log(overlap(time1,time2))