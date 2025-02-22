import pandas as pd
import json
from datetime import datetime, timedelta, time

'''
每学期需要修改以下参数
'''

# 本学期开学日期
DATE = "2025/02/17"
# 本学期周数
WEEK = 18

'''
以下代码一般不需修改
'''

# 导入excel数据与预处理
excel_file = 'INDEX/schedule/Event.xlsx'
df = pd.read_excel(excel_file)
df['开始日期'] = df['开始日期'].dt.strftime('%Y/%m/%d')
df['结束日期'] = df['结束日期'].dt.strftime('%Y/%m/%d')
events_list = df.to_dict(orient='records')

# 进行日期表示法与周次星期表示法的双向处理
def Date2WeekDay(date):
    date_format = "%Y/%m/%d"
    date1 = datetime.strptime(DATE, date_format).date()
    date2 = datetime.strptime(date, date_format).date()
    delta = date2 - date1
    days = delta.days + 1
    week = days // 7 + 1
    if week < 1 or week > WEEK:
        week = 0
    day = days % 7
    return week, day

def WeekDay2Date(week, day):
    date_format = "%Y/%m/%d"
    date1 = datetime.strptime(DATE, date_format).date()
    delta = 7 * (week-1) + day-1
    date2 = date1 + timedelta(days=delta)
    return date2.strftime(date_format)

def timeserializer(obj):
    if isinstance(obj, time):
        return obj.strftime('%H:%M')

i = 1
for event in events_list:
    i += 1
    if pd.isna(event["开始时间"]):
        print(f"开始信息无法自动补全，错误行数{i}")
    else:
        event["开始时间"] = timeserializer(event["开始时间"])
        if pd.isna(event["开始日期"]):
            if pd.isna(event["开始周次"]) or pd.isna(event["开始星期"]):
                print(f"开始信息无法自动补全，错误行数{i}")
            else:
                event["开始日期"] = WeekDay2Date(event["开始周次"], event["开始星期"])
        else:
            event["开始周次"], event["开始星期"] = Date2WeekDay(event["开始日期"])
    if pd.isna(event["结束时间"]):
        print(f"结束信息无法自动补全，错误行数{i}")
    else:
        event["结束时间"] = timeserializer(event["结束时间"])
        if pd.isna(event["结束日期"]):
            if pd.isna(event["结束周次"]) or pd.isna(event["结束星期"]):
                event["结束日期"] = event["开始日期"]
                event["结束周次"] = event["开始周次"]
                event["结束星期"] = event["开始星期"]
            else:
                event["结束日期"] = WeekDay2Date(event["结束周次"], event["结束星期"])
        else:
            event["结束周次"], event["结束星期"] = Date2WeekDay(event["结束日期"])
    if pd.isna(event["描述"]):
        event["描述"] = ""

# 转换为所需的JSON格式
formatted_events = [{"startdate": event["开始日期"], 
                     "starttime": event["开始时间"],
                     "startweek": event["开始周次"],
                     "startday": event["开始星期"],
                     "enddate": event["结束日期"], 
                     "endtime": event["结束时间"],
                     "endweek": event["结束周次"],
                     "endday": event["结束星期"],
                     "type": event["类别"],
                     "event": event["事件"],
                     "description": event["描述"]
                     } for event in events_list]

# 将列表写入JSON文件
with open('INDEX/schedule/Event.json', 'w', encoding='utf-8') as f:
    json.dump(formatted_events, f, ensure_ascii=False, indent=4)