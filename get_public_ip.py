import urllib.request
import json

def get_public_ip():
    with urllib.request.urlopen('https://api.ipify.org?format=json') as response:
        ip_data = json.load(response)
        return ip_data['ip']

if __name__ == '__main__':
    print(f"Public IP: {get_public_ip()}")