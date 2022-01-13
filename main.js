const Meet = require('./meet')
const Time = require('./time')
const Data = require('./data')

function mapDay(dayname){
   const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
   for (let index = 0; index < days.length; index++) {
     if(dayname ==  days[index]){
        return index
     }
   }
   return -1
}

// function teacher(name){
//    return{
//       ...Data.data(name),
//       subjects: [],
//       loadTracker: [], //subject day availableUnit
//       workDays = [],
//       totalLoad: function(){
//          let total = 0
//             this.subjects.forEach(subject =>{
//                total += subject.unit
//             })
//          return total
//       },
//    }
// }

function subject(name){
   return{
      ...Data.data(name),
      unit: 0,
      teacher: 1,
      blockTime: [0,0,0,0,0,0,0,],//monday, tuesday... represents the subject being teacher the samte time and day
      proceed: function(meeting){
         //kapag ang teahcer usad lang then regualr conflict na na inverted
         if(this.teacher <= 1){
            console.log('proceed caled but returning conflict')
            return !this.conflict(meeting)
         } 
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

english.teacher = 1;
math.teacher = 1
pe.teacher = 1

//const days =  ['monday','tuesday','wednesday','thursday','friday','saturday']
const days =  ['monday','tuesday',]
const hours = Time.getTime(600,1600,15)
//const sections = [s1,s2,s3,s4,s5,s6,s7]
const sections = [s1,s2]
const subjects = [math,english]


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
<<<<<<< HEAD
            if(!section.meetingExist(subject)){//ok
               if(!subject.meetingExist(section)){

                  const subjectTemp = Meet.tempMeet(subject,day,hour,subject.unit)
                  const sectionTemp = Meet.tempMeet(section,day,hour,subject.unit)

                  //ini para maaran kung para sa anu ang meeting 
                  subjectTemp.purpose = sectionTemp.subject
                  sectionTemp.purpose = subjectTemp.subject

=======
            if(!section.exist(subject)){//ok
               if(!subject.exist(section)){
                  const subjectTemp = Meet.tempMeet(subject,day,hour,3)
                  const sectionTemp = Meet.tempMeet(section,day,hour,3)
>>>>>>> parent of d4ac467 (stable v1: issue is no gap between subject)
                  if(!section.conflict(subjectTemp)){
                     if(subject.proceed(sectionTemp)){
                         if(subjectTemp.end <= hours[hours.length-1]){
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

subjects .forEach(sub =>{
   console.log(`===========${sub.name}============`)
   console.log(sub.schedule)
})

// console.log(s1.schedule)