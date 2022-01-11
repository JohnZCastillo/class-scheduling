const Meet = require('./meet')
const Time = require('./time')
const Data = require('./data')

function mapDay(dayname){
   const days = ['monday','tuesday','wednesday','thursday','friday','saturday']
   for (let index = 0; index < days.length; index++) {
     if(dayname ==  days[index]){
        return index
     }
   }
   return -1
}

function subject(name){
   return{
      ...Data.data(name),
      unit: 0,
      teacher: 1,
      blockTime: [0,0,0,0,0,0,0,],//monday, tuesday... represents the subject being teacher the samte time and day
      proceed: function(meeting){
         //kapag ang teahcer usad lang then regualr conflict na na inverted
         if(this.teacher <= 1) return !this.conflict(meeting)
         const day = mapDay(meeting.day);

         
         if(this.teacher > this.blockTime[day] ){
            this.blockTime[day] += 1
            return true
         }
         return false
      }

   }
}


const s1 = Data.data('s1')
const s2 = Data.data('s2')
const s3 = Data.data('s3')
const s4 = Data.data('s4')
const s5 = Data.data('s5')
const s6 = Data.data('s6')
const s7 = Data.data('s7')


const math = subject('math')
const english = subject('english')
const pe = subject('pe')

english.teacher = 2;
math.teacher = 3
pe.teacher = 2

//const days =  ['monday','tuesday','wednesday','thursday','friday','saturday']
const days =  ['monday','tuesday',]
const hours = Time.getTime(6,16)
const sections = [s1,s2,s3,s4,s5,s6,s7]
//const sections = [s1,s2,s3,s4]
const subjects = [math,english,pe]


// console.log(sections[0])
// sections.forEach(sub => {
//    console.log(sub)
// });

sections.forEach(section =>{
   days.forEach(day =>{
      const breakTime = Data.data('lunchtime')
      const lunchTime = Meet.tempMeet(breakTime,day,1100,2)
      section.schedule.push(lunchTime)
   })
})


console.log(hours)

days.forEach(day => {
   hours.forEach( hour =>{
      sections.forEach(section =>{
         subjects.forEach(subject =>{
            if(!section.exist(subject)){//ok
               if(!subject.exist(section)){
                  const subjectTemp = Meet.tempMeet(subject,day,hour,3)
                  const sectionTemp = Meet.tempMeet(section,day,hour,3)
                  console.log(subjectTemp)
                  if(!section.conflict(subjectTemp)){
                     if(subject.proceed(sectionTemp)){
                         if(subjectTemp.endHour*100 <= hours[hours.length-1]){
                           section.add(subjectTemp)
                           subject.add(sectionTemp)
                        }
                     }
                  }           
               }
            }
         })
      })
   })
})


// sections.forEach(section =>{
//    console.log(`===========${section.name}============`)
//   section.schedule.forEach( sched =>{
//      if(sched.subject != 'lunchtime'){
//         console.log(sched)
//      }
// })
   
// })

// subjects .forEach(sub =>{
//    console.log(`===========${sub.name}============`)
//    console.log(sub.schedule)
// })

// console.log(s1.schedule)