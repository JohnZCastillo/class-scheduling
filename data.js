function utility(){
    return {
        hasSubject: function(newSubject){
            for (const subject of this.subject) {
                if(subject.name == newSubject.name){
                    return true
                }
            }
            return false
        },
        conflict: function(meeting){
            for (const schedule of this.schedule) {
                if(meeting.overlap(schedule)){
                    return true
                }
            }
            return false
        },
        inSchedule: function(meeting){
            for (const schedule of this.schedule) {
                if(schedule.subject == meeting.subject){
                    return  true
                }
            }
            return false
        }
    }
}

function section(name){
    return{
       name: name,
       year: 0,
       course: '',
       semester: 0,
       subject: [],
       schedule: [],
       students: [],
       ...utility(),
    }
}

function subject(name){
    return{
        name: name,
        units: 3
    }
}

function teacher(name){
    const loadMap = new Map()
    return{
        name: name,
        load: loadMap,
        workingDays: [],
        workingHours: [],
        subject: [],
        schedule: [],
        teachingLoad: 9, //units per day
        subjectAvailability: function(){
            let total = this.teachingLoad * this.workingDays.length
            return Math.round((total / 3) / (this.subject.length))
        },
        insert:  function(meeting){

            //return false pag wara san worktime time ini na meeting
           if(!this.workingDays.includes(meeting.day)) return false
           //if(!this.workingHours.includes(meeting.start)) return false
           //if(!this.workingHours.includes(meeting.end)) return false
           if(this.conflict(meeting)) return false

            if(this.load.has(meeting.subject)){
               
                //subjectAvailability naga tukoy sa subject kag sa kun kapira na na tukdo
                //kapag ang load for this subject is full return false
                if(this.load.get(meeting.subject) >=  this.subjectAvailability()){
                    return false
                }
                
                this.load.set(meeting.subject,this.load.get(meeting.subject += 1))
                this.schedule.push(meeting)
                return true
            }

            this.load.set(meeting.subject,1)//1 1 meeting
            this.schedule.push(meeting)
            return true
        },
        ...utility()
    }
}

function between(min,target,max){
    return min < target && target < max
}

function meet({name,units}){
    return{
        subject: name,
        teacher: '',
        section: '',
        day: '',
        start: 0,
        end: 0,
        span: units,
        leap: function(){
            if(this.start == 0){
                throw new Error('start not set')
            }
            this.end = this.start + (this.span*100)
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

function timePool(days,hours,meeting){
    const pool = []
    
    for (const day of days) {
        for (const hour of hours) {
                   
            if(hour + (meeting.span*100) > hours[hours.length-1]){
                break
            }

         
            const tempMeet = meet({name: meeting.subject,units: meeting.span})
            tempMeet.day = day
            tempMeet.start = hour
            tempMeet.leap()
            
         //   console.log(clone)
            pool.push(tempMeet)

        }
    }
   
    return pool
}
// const Time = require('./time')

// const me = meet({name: 'sample',units: 3})
// console.log(timePool(Time.getDays(0,4),Time.getTime(700,1600,30),me))

module.exports = {section,teacher,subject,meet,timePool}