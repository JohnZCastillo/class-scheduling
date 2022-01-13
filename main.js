const Data = require('./data')
const Time = require('./time')
const Excel = require('./excel')

const t1 = Data.teacher('Sir John Castillo')
const t2 = Data.teacher('Sir James Castillo')

const pe = Data.subject('pe')
const math = Data.subject('math')
const english = Data.subject('english')


const s1 = Data.section('section 1')
const s2 = Data.section('section 2')
const s3 = Data.section('section 3')

const subjects = [pe,math,english]
const sections = [s1,s2,s3]

s1.subject = subjects
s2.subject = subjects
s3.subject = subjects

const hours = Time.getTime(700,1600,30)
const days = Time.getDays(0,4)

t1.subject.push(pe,english)
t2.subject.push(pe,english,math)

t1.workingDays = Time.getDays(0,5)
t2.workingDays = Time.getDays(0,5)

t1.workingHours = hours
t2.workingHours = hours

const teachers = [t1,t2]

let found = false

for (const subject of subjects) {
    
    const meeting = Data.meet(subject)
    const meetingPool = Data.timePool(days,hours,meeting)
    
    for (const section of sections) {        
    
        if(!section.hasSubject(subject)) continue
    

        if(section.inSchedule(meeting)) continue

        for (const teacher of teachers) {
            for (const meet of meetingPool) {
                if(!section.conflict(meet) && !teacher.conflict(meet)){
                    if(teacher.insert(meet)){
                        meet.teacher = teacher.name
                        meet.section = section.name
                        section.schedule.push(meet)
                        break
                    }
                }
            }
        }
    }
}


// for (const section of sections) {
//     for(const subject of subjects){

//         if(!section.hasSubject(subject)) continue
    
//         for (const teacher of teachers) {
            
//             if(!teacher.hasSubject(subject)) continue

//             for (const day of days) {
//                 for (const hour of hours) {
                    
//                     const meet = Data.meet(subject.name)
//                     meet.teacher = teacher.name 
//                     meet.section = section.name
//                     meet.day = day
//                     meet.start = hour
//                     meet.setEnd(subject.units)
//                     meet.span = subject.units
                    
//                     if(section.conflict(meet)) continue
//                     if(teacher.conflict(meet)) continue
                    
//                     if(teacher.insert(meet)){
//                         section.schedule.push(meet)   
//                     }
                    
                  
//                 }
//             }


//         }
        
//     }  
// }

function sched({subject,teacher,section,day,start,end}){
   return {subject,teacher,section,day,start,end}
}

const dataToExcel = []

sections.forEach(section => {
    section.schedule.forEach(schedule => {
      dataToExcel.push(sched(schedule))
        //console.log(schedule)   
    })
})


Excel.createExcel(dataToExcel)