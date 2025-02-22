function numberToWeekday(number){
    const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    return weekdays[number - 1];
}

function loadEvents(){
    fetch('./schedule/Event.json')
        .then(response => response.json())
        .then(events => {
            events.sort((eventA, eventB) => {
                const dateA = new Date(eventA.startdate + ' ' + eventA.starttime);
                const dateB = new Date(eventB.startdate + ' ' + eventB.starttime);
                return dateA - dateB;
            });
            
            const SchedulePresent = document.getElementById('SchedulePresent');
            const now = new Date();
            events.forEach(event => {
                const start = new Date(event.startdate + ' ' + event.starttime)
                const end = new Date(event.enddate + ' ' + event.endtime)
                
                if(now >= start && now <= end){
                    const schedule = document.createElement('div');
                    schedule.classList.add('schedule');
                    const eventname = document.createElement('h6');
                    const time = document.createElement('h6');

                    if(event.type === "选课"){
                        eventname.textContent = '选课：' + event.event;
                    }
                    else{
                        eventname.textContent = event.event;
                    }
                    eventname.style.color = 'red';
                    schedule.appendChild(eventname);

                    if(event.startdate === event.enddate){
                        time.textContent = event.startdate + '(第' + event.startweek + '周' + numberToWeekday(event.startday)
                        + ')' + event.starttime + '~' + event.endtime;
                    }
                    else{
                        time.textContent = event.startdate + '(第' + event.startweek + '周' + numberToWeekday(event.startday)
                        + ')' + event.starttime + '~' 
                        + event.enddate + '(第' + event.endweek + '周' + numberToWeekday(event.endday) + ')' + event.endtime;
                    }
                    time.style.color = 'purple';
                    schedule.appendChild(time);

                    if(event.description != ''){
                        const description = document.createElement('p');
                        description.textContent = event.description;
                        schedule.appendChild(description);
                    }

                    SchedulePresent.appendChild(schedule);
                }

                else if(now < start){
                    const schedule = document.createElement('div');
                    schedule.classList.add('schedule');
                    const eventname = document.createElement('h6');
                    const time = document.createElement('h6');

                    if(event.type === "选课"){
                        eventname.textContent = '选课：' + event.event;
                    }
                    else{
                        eventname.textContent = event.event;
                    }
                    eventname.style.color = 'blue';
                    schedule.appendChild(eventname);

                    if(event.startdate === event.enddate){
                        time.textContent = event.startdate + '(第' + event.startweek + '周' + numberToWeekday(event.startday)
                        + ')' + event.starttime + '~' + event.endtime;
                    }
                    else{
                        time.textContent = event.startdate + '(第' + event.startweek + '周' + numberToWeekday(event.startday)
                        + ')' + event.starttime + '~' 
                        + event.enddate + '(第' + event.endweek + '周' + numberToWeekday(event.endday) + ')' + event.endtime;
                    }
                    time.style.color = 'purple';
                    schedule.appendChild(time);

                    if(event.description != ''){
                        const description = document.createElement('p');
                        description.textContent = event.description;
                        schedule.appendChild(description);
                    }

                    ScheduleFuture.appendChild(schedule);
                }
            });
        })
        .catch(error => console.error('Error loading events:', error));
}

window.addEventListener('load', loadEvents);