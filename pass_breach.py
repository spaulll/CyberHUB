import requests
import hashlib

class PassBreach:
    def getData(self, prefix):
        try:
            url = f'https://api.pwnedpasswords.com/range/{prefix}'
            res = requests.get(url)
            res.raise_for_status()
            return res.text.splitlines()
        except Exception:
            return []

    def isPassBreached(self, password):
        sha1 = hashlib.sha1(password.encode('utf-8')).hexdigest().upper()
        prefix, suffix = sha1[:5], sha1[5:]

        pwnedlist = [line.split(':') for line in self.getData(prefix)]
        if(pwnedlist):
            for tail, count in pwnedlist:
                if tail == suffix:
                    return {                                    # if found
                        "status" : "success",
                        "isbreached" : "True",
                        "times" : count
                    }
            return {                                            # if not found
                "status" : "success",
                "isbreached" : "False",
                "times" : None
            }
        return {                                                # something is wrong
            "status" : "failed",
            "isbreached" : None,
            "times" : None
        }


if __name__ == '__main__':
    print(PassBreach().isPassBreached('password'))