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


for (const section of sections) {  
    for (const subject of subjects) {
    
    const meeting = Data.meet(subject)
    const meetingPool = Data.timePool(days,hours,meeting)     
    
        for (const teacher of teachers) {
            for (const meet of meetingPool) {
               
                if(!section.conflict(meet) && !teacher.conflict(meet)){
                    
                    if(!section.inSchedule(meet) && teacher.hasSubject(subject)){
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
}

function getImportant({subject,teacher,section,day,start,end,span}){
    return {subject,teacher,section,day,start,end,span}
}

const dataToExcel = []

//export to excel

for (const section of sections) {
    for (const schedule of section.schedule) {
        dataToExcel.push(getImportant(schedule))
    }
}

Excel.createExcel(dataToExcel)