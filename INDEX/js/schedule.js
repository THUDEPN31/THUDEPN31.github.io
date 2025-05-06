function numberToWeekday(number){
    const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    return weekdays[number - 1];
}

function events2html(event, color, Schedule){
    const schedule = document.createElement('div');
    schedule.classList.add('schedule');
    const eventname = document.createElement('h6');
    const time = document.createElement('h6');

    if(event.type === "选课"){
        eventname.textContent = '选课：' + event.event;
    }
    else if(event.type === "选课-夏"){
        eventname.textContent = '选课-夏：' + event.event;
    }
    else{
        eventname.textContent = event.event;
    }
    eventname.style.color = color;
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
        description.innerHTML = event.description;
        schedule.appendChild(description);
    }

    Schedule.appendChild(schedule);
}

function loadEvents(){
    fetch('./schedule/Event.json')
        .then(response => response.json())
        .then(events => {
            const SchedulePresent = document.getElementById('SchedulePresent');
            const ScheduleFuture = document.getElementById('ScheduleFuture');
            const now = new Date();
            
            events.sort((eventA, eventB) => {
                const dateA = new Date(eventA.enddate + ' ' + eventA.endtime);
                const dateB = new Date(eventB.enddate + ' ' + eventB.endtime);
                return dateA - dateB;
            });
            events.forEach(event => {
                const start = new Date(event.startdate + ' ' + event.starttime)
                const end = new Date(event.enddate + ' ' + event.endtime)
                if(start <= now && now <= end) events2html(event, 'red', SchedulePresent);
            });
        
            events.sort((eventA, eventB) => {
                const dateA = new Date(eventA.startdate + ' ' + eventA.starttime);
                const dateB = new Date(eventB.startdate + ' ' + eventB.starttime);
                return dateA - dateB;
            });
            events.forEach(event => {
                const start = new Date(event.startdate + ' ' + event.starttime);
                if(now < start) events2html(event, 'blue', ScheduleFuture);
            });
        })
        .catch(error => console.error('Error loading events:', error));
}

window.addEventListener('load', loadEvents);