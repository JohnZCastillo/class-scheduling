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

function subject(name){
   return{
      ...Data.data(name),
      unit: 3,
      teacher: [],
      blockTime: [0,0,0,0,0,0,0,],//monday, tuesday... represents the subject being teacher the samte time and day
      proceed: function(meeting){
         //kapag ang teahcer usad lang then regualr conflict na na inverted
         if(this.teacher.length <= 1)return !this.conflict(meeting)

         const day = mapDay(meeting.day);

         
         if(this.teacher.length > this.blockTime[day] ){
               for(let index = 0; index<this.teacher.length; index++){
             
                  //return dayun pag wra san scched teacher
                  if(this.teacher[index].schedule.length == 0){
                     this.teacher[index].schedule.push(meeting)
                     this.blockTime[day] += 1   
                     return true
                  }

                  //hanap san tacher na avaialble sani na oras
                  for(let meet = 0; meet<this.teacher[index].schedule.length;meet++){
                     if(!this.teacher[index].conflict(meeting)){
                        this.teacher[index].schedule.push(meeting)
                        this.blockTime[day] += 1   
                        return true
                     }
                  }
               }
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


const t1 = Data.data('marie joy ignacio')
const t2 = Data.data('charmaine banaag')
const t3 = Data.data('Haziel costa')
const t4 = Data.data('John Paul detoress')
const t5 = Data.data('charles pitagan')
const t6 = Data.data('mariz pitagan')
const t7 = Data.data('marie joy ignacio')
const t8 = Data.data('mark sibulo')
const t9 = Data.data('anacleto  marcelino')
const t10 = Data.data('jackielyn caballero')
const t11 = Data.data('gabriel ballano')
const t12 = Data.data('charmain banate')
const t13 = Data.data('nstp')



const ethics = subject('ethics')
const purcom = subject('purposive communication')
const konteks = subject('kontekswalisadong filipino')
const math = subject('math')
const comp = subject('computing')
const prog = subject('programming')
const proglab = subject('programming Lab')
const fitt = subject('fitt 1')
const cvsu = subject('cvsu')
const nstp = subject('nstp')

proglab.unit = 1
prog.unit = 2
cvsu.unit = 1
nstp.unit = 2


ethics.teacher = [t8]
purcom.teacher = [t12]
konteks.teacher = [t9,t11]
math.teacher = [t1,t4,t7]
comp.teacher = [t4,t6]
prog.teacher = [t5,t6]
fitt.teacher = [t10]
cvsu.teacher = [t2,t3]
nstp.teacher = [t13]
proglab.teacher = [t5,t6]

const days =  ['monday','tuesday','wednesday','thursday','friday','saturday']
const hours = Time.getTime(700,1700,30)
const sections = [s1,s2,s3,s4,s5,s6,s7]
const subjects = [ethics,purcom,konteks,math,comp,prog,fitt,nstp,cvsu,proglab]


// console.log(sections[0])
// sections.forEach(sub => {
//    console.log(sub)
// });

sections.forEach(section =>{
   days.forEach(day =>{
      const breakTime = Data.data('lunchtime')
      const lunchTime = Meet.tempMeet(breakTime,day,1100,1)
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
                  const subjectTemp = Meet.tempMeet(subject,day,hour,subject.unit)
                  const sectionTemp = Meet.tempMeet(section,day,hour,subject.unit)

                  //ini para maaran kung para sa anu ang meeting 
                  subjectTemp.purpose = sectionTemp.subject
                  sectionTemp.purpose = subjectTemp.subject

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

//let count = 0 


// for (let index = 0; index < sections.length; index++) {
//    for (let i = 0; i < sections[index].schedule.length; i++) {
//          ++count
//    }

//    if(count != subjects.length){
      
//       console.log(sections[index].name,' has ',count,' subject and it is lacking in subject. it must hava a ',subjects.length,' subjects')
//    }
//    count = 0
// }

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

// console.log(t1.schedule)
// console.log('=================')
// console.log(t2.schedule)
// console.log(sections[0].schedule)
console.log(s1.schedule)
console.log('====================')
console.log(s2.schedule)