/*
    convert san time na 24 format sa * 100
    pag may munute na kaupo ma return 0
    or pag dili naka 24 format
*/
function convert(hour){
    if(!validate(hour) || !isMinute(hour)) return hour*100
}

/*  
    check if time is (24 hours)*100 format
    example: 7:00 false
    exmaple: 700  true 
 */ 
function validate(time){
    return time > 100
}
function isMinute(time){
    return time%100 > 0
}

/*
    return san time na naka *100 format
    pag naka 24 format then return empty na array
*/

function getTime(startTime,endTime){
    
    if(validate(startTime)){
        console.log('start time is not in 24 Hour format')
        return []
    }

    if(validate(endTime)){
        console.log ('end time is not in 24 Hour format')
        return []
    }

    const timeHolder = []
    const minuteInterval = 30

    for (let start = startTime; start <= endTime; start++) {
        timeHolder.push(convert(start)) 
        if(start != endTime) timeHolder.push(convert(start) + minuteInterval)
    }
    return timeHolder
}


module.exports = {convert,validate,getTime}