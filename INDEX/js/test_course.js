// 测试代码
events = [
    {
        "startdate": "2024/12/06",
        "starttime": "13:00",
        "startweek": 0,
        "startday": 5,
        "enddate": "2024/12/09",
        "endtime": "16:00",
        "endweek": 0,
        "endday": 1,
        "type": "选课",
        "event": "预选",
        "description": ""
    },
    {
        "startdate": "2024/12/13",
        "starttime": "13:00",
        "startweek": 0,
        "startday": 5,
        "enddate": "2024/12/16",
        "endtime": "16:00",
        "endweek": 0,
        "endday": 1,
        "type": "选课",
        "event": "正选",
        "description": "全部课程可选可删，先选先得，选满后实行Waiting List方案。"
    },
    {
        "startdate": "2024/12/19",
        "starttime": "13:00",
        "startweek": 0,
        "startday": 4,
        "enddate": "2024/12/23",
        "endtime": "16:00",
        "endweek": 0,
        "endday": 1,
        "type": "选课",
        "event": "重补修体育课分项（第一次）",
        "description": ""
    },
    {
        "startdate": "2024/12/20",
        "starttime": "13:00",
        "startweek": 0,
        "startday": 5,
        "enddate": "2024/12/27",
        "endtime": "16:00",
        "endweek": 0,
        "endday": 5,
        "type": "选课",
        "event": "二级选课（第一次）",
        "description": "先选先得，选满为止。"
    },
    {
        "startdate": "2025/01/13",
        "starttime": "13:00",
        "startweek": 0,
        "startday": 1,
        "enddate": "2025/01/15",
        "endtime": "16:00",
        "endweek": 0,
        "endday": 3,
        "type": "选课",
        "event": "北大、北外课程选课",
        "description": "先选先得，选满后实行Waiting List方案。"
    },
    {
        "startdate": "2025/02/17",
        "starttime": "13:00",
        "startweek": 1,
        "startday": 1,
        "enddate": "2025/02/24",
        "endtime": "08:00",
        "endweek": 2,
        "endday": 1,
        "type": "选课",
        "event": "补退选（第一阶段）",
        "description": "全部课程可选可删，先选先得，选满后实行Waiting List方案。"
    },
    {
        "startdate": "2025/02/17",
        "starttime": "13:00",
        "startweek": 1,
        "startday": 1,
        "enddate": "2025/02/24",
        "endtime": "08:00",
        "endweek": 2,
        "endday": 1,
        "type": "选课",
        "event": "二级选课（第二次）",
        "description": "先选先得，选满为止。"
    },
    {
        "startdate": "2025/02/24",
        "starttime": "13:00",
        "startweek": 2,
        "startday": 1,
        "enddate": "2025/02/27",
        "endtime": "16:00",
        "endweek": 2,
        "endday": 4,
        "type": "选课",
        "event": "重补修体育课分项（第二次）",
        "description": ""
    },
    {
        "startdate": "2025/02/24",
        "starttime": "13:00",
        "startweek": 2,
        "startday": 1,
        "enddate": "2025/02/28",
        "endtime": "12:00",
        "endweek": 2,
        "endday": 5,
        "type": "选课",
        "event": "网上申请特殊原因补选",
        "description": "学生网上申请，经任课教师、开课院系网上两重审批均通过后，方可补选成功。"
    },
    {
        "startdate": "2025/02/24",
        "starttime": "13:00",
        "startweek": 2,
        "startday": 1,
        "enddate": "2025/02/28",
        "endtime": "16:00",
        "endweek": 2,
        "endday": 5,
        "type": "选课",
        "event": "补退选（第二阶段）",
        "description": "本科生体育课程不可选，亦不可删。其他课程不可选课，只允许删除已选课程，所删课程不记录在成绩单上。"
    },
    {
        "startdate": "2025/03/24",
        "starttime": "08:00",
        "startweek": 6,
        "startday": 1,
        "enddate": "2025/03/28",
        "endtime": "16:00",
        "endweek": 6,
        "endday": 5,
        "type": "选课",
        "event": "选择课程以P/F记载",
        "description": "在“课程属性”为“任选”的已选课程中选择一门，其成绩记为P或F，无绩点。"
    },
    {
        "startdate": "2025/03/24",
        "starttime": "08:00",
        "startweek": 6,
        "startday": 1,
        "enddate": "2025/03/28",
        "endtime": "16:00",
        "endweek": 6,
        "endday": 5,
        "type": "选课",
        "event": "退课（第一阶段）",
        "description": "除本科生体育课、北外课程不可退课外，其他课程均可退课，所删后八周课程不记录在成绩单上。"
    },
    {
        "startdate": "2025/04/21",
        "starttime": "08:00",
        "startweek": 10,
        "startday": 1,
        "enddate": "2025/04/25",
        "endtime": "16:00",
        "endweek": 10,
        "endday": 5,
        "type": "选课",
        "event": "退课（第二阶段）",
        "description": "只允许后八周开课的课程退课，所删课程不记录在成绩单上，其他课程、北大、北外课程均不可退课。"
    }
]

function numberToWeekday(number){
    const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    return weekdays[number - 1];
}

function loadEvents(){
    const CourseTable = document.getElementById('CourseTable');
    const now = new Date();
    events.forEach(event => {
        if(event.type === "选课"){
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
}

window.onload = loadEvents;