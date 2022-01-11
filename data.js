const Time = require('./time')
const Meet = require('./meet')

function data(name){
    return{
        name: name,
        schedule: [],
        add: function(meet){
            /*
                add san meeting sa scheduled
            */
           this.schedule.push(meet)
        },
        count: function({name}){
            let count = 0
            for (let index = 0; index < this.schedule.length; index++) {
                if(this.schedule[index].subject == name){
                        count++
                    } 
          }
          return count
        },
        exist: function({name}){
            /*
                naga check kung ang ang meeting na may subject name na
                etc present sa schedule then return true otherwise return false
                note: ini na meet kay time object
            */
              for (let index = 0; index < this.schedule.length; index++) {
                    if(this.schedule[index].subject == name){
                            return true   
                        } 
              }
              return false
        },
        conflict: function(suggestedMeeting){
    
            const scheduleMeeting = []

           //get all schedule meetings base on suggestedMeeting day
            this.schedule.forEach(schedule =>{
                if(suggestedMeeting.day == schedule.day){
                    scheduleMeeting.push(schedule)
                }
            })

            /*
                kapag wara sna scheduled meeting na naka align sa day 
                sa suggestedMeeting return false kay wara man conflict
            */
            if(scheduleMeeting.length == 0) return false

            /*
                kapag ang suggestedMeeting naga conflict sa
                scheduledMeeting then return true
            */
            for (let index = 0; index < scheduleMeeting.length; index++) {
                if(Meet.overlap(scheduleMeeting[index],suggestedMeeting)){
                    return true
                } 
            }

            //reach this line pag wara conflict
            return false

        }
    }
}
module.exports = {data}