import requests
from datetime import datetime, timedelta, timezone

url = "http://192.168.31.133:80/doc/betwween/time/cal"

IST = timezone(timedelta(hours=5, minutes=30))

response = requests.get(url)

if response.status_code == 200:
    data = response.json()["data"]

    for i, item in enumerate(data, start=1):
        created = item["createdAt"]
        updated = item["updatedAt"]

        t1 = datetime.fromisoformat(created.replace("Z", "+00:00")).astimezone(IST)
        t2 = datetime.fromisoformat(updated.replace("Z", "+00:00")).astimezone(IST)

        diff = t2 - t1
        total_seconds = int(diff.total_seconds())

        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        seconds = total_seconds % 60

        created_fmt = t1.strftime("%b %d %Y %I:%M:%S %p")
        updated_fmt = t2.strftime("%b %d %Y %I:%M:%S %p")

        print(f"{i}. Created: {created_fmt} | Updated: {updated_fmt} | Time: {hours:02d}:{minutes:02d}:{seconds:02d}")

else:
    print("Error:", response.status_code)