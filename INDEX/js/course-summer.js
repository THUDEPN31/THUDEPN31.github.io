function numberToWeekday(number){
    const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    return weekdays[number - 1];
}

function loadEvents(){
    fetch('Event.json')
        .then(response => response.json())
        .then(events => {
            const CourseTable = document.getElementById('CourseTable-Summer');
            const now = new Date();
            events.forEach(event => {
                if(event.type === "选课-夏"){
                    const row = document.createElement('tr');
                    const weekCell = document.createElement('td')
                    const timeCell = document.createElement('td');
                    const eventCell = document.createElement('td');
        
                    if(event.startweek > 0){
                        weekCell.textContent = event.startweek;
                    }
                    timeCell.innerHTML = event.startdate + '(' + numberToWeekday(event.startday) + ')' + event.starttime 
                        + '~' + '<br>'  + event.enddate + '(' + numberToWeekday(event.endday) + ')' + event.endtime;
                    if(event.description.includes("先选先得")){
                        eventCell.textContent = '！' + event.event;
                    }
                    else{
                        eventCell.textContent = event.event;
                    }
        
                    const start = new Date(event.startdate + ' ' + event.starttime)
                    const end = new Date(event.enddate + ' ' + event.endtime)
                    if(now > end){
                        row.style.color = 'gray';
                    }
                    else if(now >= start && now <= end){
                        row.style.color = 'red';
                    }
                    else{
                        row.style.color = 'blue';
                    }
        
                    row.appendChild(weekCell);
                    row.appendChild(timeCell);
                    row.appendChild(eventCell);
                    CourseTable.appendChild(row);
                }
            });
        })
        .catch(error => console.error('Error loading events:', error));
}

window.addEventListener('load', loadEvents);