function numberToWeekday(number){
    const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    return weekdays[number - 1];
}

function loadEvents(){
    fetch('Event.json')
        .then(response => response.json())
        .then(events => {
            events.sort((eventA, eventB) => {
                const dateA = new Date(eventA.startdate + ' ' + eventA.starttime);
                const dateB = new Date(eventB.startdate + ' ' + eventB.starttime);
                return dateA - dateB;
            });
            
            const ScheduleActivity = document.getElementById('ScheduleActivity');
            const ScheduleAffair = document.getElementById('ScheduleAffair');
            const now = new Date();
            events.forEach(event => {                
                const schedule = document.createElement('div');
                schedule.classList.add('schedule');
                const eventname = document.createElement('h6');
                const time = document.createElement('h6');

                eventname.textContent = event.event;
                const start = new Date(event.startdate + ' ' + event.starttime)
                const end = new Date(event.enddate + ' ' + event.endtime)
                if(now > end){
                    eventname.style.color = 'gray';
                }
                else if(now >= start && now <= end){
                    eventname.style.color = 'red';
                }
                else{
                    eventname.style.color = 'blue';
                }
                schedule.appendChild(eventname);

                if(event.startdate === event.enddate){
                    time.textContent = event.startdate + '(第' + event.startweek + '周' + numberToWeekday(event.startday)
                    + ')' ;
                    if(!event.description.includes("具体时间待定"))
                        time.textContent += event.starttime + '~' + event.endtime;
                }
                else{
                    time.textContent = event.startdate + '(第' + event.startweek + '周' + numberToWeekday(event.startday)
                    + ')' + event.starttime + '~' 
                    + event.enddate + '(第' + event.endweek + '周' + numberToWeekday(event.endday) + ')' + event.endtime;
                }
                time.style.color = 'purple';
                schedule.appendChild(time);

                if(event.location != ''){
                    const location = document.createElement('h6');
                    location.textContent = event.location;
                    location.style.color = 'purple';
                    schedule.appendChild(location);
                }

                if(event.description != ''){
                    const description = document.createElement('p');
                    description.textContent = event.description;
                    schedule.appendChild(description);
                }

                if(event.type === "活动"){
                    ScheduleActivity.appendChild(schedule);
                }
                else if(event.type === "事务"){
                    ScheduleAffair.appendChild(schedule);
                }
            });
        })
        .catch(error => console.error('Error loading events:', error));
}

window.addEventListener('load', loadEvents);