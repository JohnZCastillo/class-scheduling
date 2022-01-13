function meet(subject){
    return{
        subject: subject,
        teacher: '',
        section: '',
        day: '',
        start: 0,
        end: 0,
        span: 0,
        leap: function(){
            if(this.start == 0){
                throw new Error('start not set')
            }
            this.end += (this.span*100)
            return true
        },
        overlap:  function(anotherMeet){
            
            if(this.day != anotherMeet.day) return false

            if(this.start == anotherMeet.start && this.end == anotherMeet.end){
                return true
            }

            if(between(this.start,anotherMeet.start,this.end)){
                return true
            }
            
            if(between(anotherMeet.start,this.start,anotherMeet.end)){
                return true
            }
            
            if(between(this.start,anotherMeet.end,this.end)){
                console.log('here')
                return true
            }

            if(between(anotherMeet.start,this.end,anotherMeet.end)){
                return true
            }

            return false
        }
    }
}

function between(min,target,max){
    return min < target && target < max
}

function timePool(days,hours,meet){
    const pool = []
   
    for (const day of days) {
        const clone = {...meet}
        for (const hour of hours) {
            
            if(hour + clone.span*100 > hours[hours.length-1]){
                break
            }

            clone.day = day
            clone.start = start
            clone.leap
            
            pool.push(clone)
        }
    }
    return pool
}

module.exports = {meet,timePool}