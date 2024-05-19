import os
import requests
from dotenv import load_dotenv
from icecream import ic

class EmailBreach:
    def __init__(self):
        self.keys = self.load_api_keys()
        self.current_key_index = 0
        self.url = "https://data-breach-checker.p.rapidapi.com/api/breach"

    def load_api_keys(self):
        load_dotenv('.env')
        keys = os.getenv("API_KEYS").split(',')
        keys = [key.strip() for key in keys]  # Strip leading and trailing whitespace
        return keys

    def get_next_key(self):
        if self.current_key_index < len(self.keys) - 1:
            self.current_key_index += 1
        else:
            self.current_key_index = 0
        return self.keys[self.current_key_index]

    def isBreached(self, email):
        for _ in range(len(self.keys)):  # Try each API key
            self.headers = {
                "X-RapidAPI-Key": self.keys[self.current_key_index],
                "X-RapidAPI-Host": "data-breach-checker.p.rapidapi.com"
            }
            querystring = {"email": email}
            try:
                response = requests.get(self.url, headers=self.headers, params=querystring)
                ic(response.status_code)
                ic("here11")
                ic(self.keys[self.current_key_index])
                response_json = response.json()
                ic(response_json)
                if "message" in response_json and "You have exceeded" in response_json["message"]:
                    # Move to the next API key
                    self.current_key_index = (self.current_key_index + 1) % len(self.keys)
                    continue
                else:
                    return response_json  # Return the response if rate limit not exceeded
                ic(response_json)
            except requests.RequestException as e:
                ic("Request Error:", e)
                return None



    def getBreachInfo(self, email):
        data = self.isBreached(str(email))
        ic(data)
        
        if data is None:
            return {"status": "failed", "message": "Something went wrong!"}
        message = data.get("message", "")
        ic(message)
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
            return {"status": message, "data": all_entries, "is_breached": True, "message": "found in breach record"}
        return {"status": message, "data": "Not found in any breach record", "is_breached": False, "message": "not found in breach record"}

if __name__ == '__main__':
    result = EmailBreach().getBreachInfo("djspaul99@gmail.com")
    print(result)
