import requests

class EmailBreach:
    # def __init__(self):
    #     self.url = "https://data-breach-checker.p.rapidapi.com/api/breach"
    #     self.headers = {
    #         "X-RapidAPI-Key": "2b78d20d3emsh7c3af95a633e21ep1751c6jsn5becc352691a",
    #         "X-RapidAPI-Host": "data-breach-checker.p.rapidapi.com"
    #     }

    def isBreached(self, email):
        self.url = "https://data-breach-checker.p.rapidapi.com/api/breach"
        self.headers = {
            "X-RapidAPI-Key": "2b78d20d3emsh7c3af95a633e21ep1751c6jsn5becc352691a",
            "X-RapidAPI-Host": "data-breach-checker.p.rapidapi.com"
        }
        querystring = {"email": email}
        try:
            response = requests.get(self.url, headers=self.headers, params=querystring)
            return response.json()
        except requests.RequestException as e:
            print("Request Error:", e)
            return None

    def getBreachInfo(self, email):
        data = self.isBreached(email)
        # print(data)
        message = data.get("message", "")
        if data is None or "You have exceeded" in message:
            return {"status": "failed", "message": "Something went wrong!"}
        
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

        if all_entries:
            return {"status": message, "data": all_entries}
        return {"status": message, "data": "Not found in any breach record"}

if __name__ == '__main__':
    result = EmailBreach().getBreachInfo("test@gmail.com")
    print(result)
