import requests

class emailBreach:
    def __init__(self):
        self.url = "https://data-breach-checker.p.rapidapi.com/api/breach"
        self.headers = {
            "X-RapidAPI-Key": "26b9999e81msheeb3e281682706ap1a66e6jsn83d5bb95ed4b",
            "X-RapidAPI-Host": "data-breach-checker.p.rapidapi.com"
        }

    def isBreached(self, email):
        querystring = {"email": email}
        response = requests.get(self.url, headers=self.headers, params=querystring)
        return response.json()

    def getBreachInfo(self, email):
        data = self.isBreached(email)
        all_entries = []

        for entry in data.get("data", []):
            entry_info = {
                "BreachDate": entry.get("BreachDate", ""),
                "Name": entry.get("Name", ""),
                "Domain": entry.get("Domain", ""),
                "Description": entry.get("Description", ""),
                "LogoPath": entry.get("LogoPath", ""),
                "DataClasses": entry.get("DataClasses", [])
            }

            all_entries.append(entry_info)

        json_data = {
            "message": data.get("message", ""),
            "data": all_entries
        }

        return json_data

if __name__ == '__main__':
    result = emailBreach().getBreachInfo("test@gmail.com")
    print(result)
