import requests
from json import dump

class emailBreach:
    def __init__(self):
        self.url = "https://data-breach-checker.p.rapidapi.com/api/breach"
        self.headers = {
            "X-RapidAPI-Key": "26b9999e81msheeb3e281682706ap1a66e6jsn83d5bb95ed4b",
            "X-RapidAPI-Host": "data-breach-checker.p.rapidapi.com"
        }

    def isBreached(self, email):
        querystring = {"email": email}
        try:
            response = requests.get(self.url, headers=self.headers, params=querystring)
            return response.json()
        except Exception:
            return None
    def getBreachInfo(self, email):
        data = self.isBreached(email)
        if data == None:
            return {"message": "Something went wrong!"}
        
        all_entries = {}
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

        if (all_entries):
            return {"message": data.get("message", ""), "data": all_entries}
        return {"message": data.get("message", ""), "data": "Not found in any breach record"}
        

if __name__ == '__main__':
    result = emailBreach().getBreachInfo("test@gmail.com")
    ## For saving data in a json file
    # with open("big-resp.json","w") as f:
    #     dump(result,f)
    print(result)
