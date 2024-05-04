class HashIdentifier:
    def getData(self, hash):
        return {"hash":"hash identified"}

if __name__ == '__main__':
    print(HashIdentifier().getData('hash'))