function getTime(start,end,interval){
    
    const time = []
    
    const startHour = Math.floor(start/100)
    const startMinute = start%100

    const endHour =  Math.floor(end/100)
    const endMinute = end%100
    //para intra ang start time
    time.push(start)

    for (let hour = startHour; hour < endHour; hour++){
       for (let minute = startMinute; minute <= 60; minute+=interval) {
            if(minute == 0) continue
            if(minute == 60){
                time.push((hour*100)+100)      
            }else{
                    time.push((hour*100)+minute)
            }
           if(hour == endHour && minute == endMinute)break
       }  
    }

    return time
}


//console.log(getTime(600,1600,15))
module.exports = {getTime}