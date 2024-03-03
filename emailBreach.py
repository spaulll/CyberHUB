import requests
import json
class emailBreach:
	def __init__(self):
		pass
	def isBreached(self,email):
		self.url = "https://data-breach-checker.p.rapidapi.com/api/breach"

		self.querystring = {"email":email}

		self.headers = {
			"X-RapidAPI-Key": "26b9999e81msheeb3e281682706ap1a66e6jsn83d5bb95ed4b",
			"X-RapidAPI-Host": "data-breach-checker.p.rapidapi.com"
		}

		self.response = requests.get(self.url, headers=self.headers, params=self.querystring)

		return (self.response.json())

# ob = emailBreach()
# s = ob.isBreached("test@gmail.com")
# with open("big-resp.json","w") as f:
# 	json.dump(s, f, indent=4)