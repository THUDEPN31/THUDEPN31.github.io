function loadEvents(){
    fetch('Event.json')
        .then(response => response.json())
        .then(events => {
            const CourseTable = document.getElementById('CourseTable');
            events.forEach(event => {
                const row = document.createElement('tr');
                const weekCell = document.createElement('td')
                const dateCell = document.createElement('td');
                const eventCell = document.createElement('td');
  
                weekCell.textContent = event.startweek;
                dateCell.textContent = event.startdate;
                eventCell.textContent = event.event;
  
                row.appendChild(weekCell);
                row.appendChild(dateCell);
                row.appendChild(eventCell);
                CourseTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error loading events:', error));
}

window.onload = loadEvents;