from re import match, IGNORECASE

class HashIdentifier:
    def getData(self, hash):
        # Dictionary of hash regex patterns for various hash types
        hash_patterns = {
            'MD2': r'^[a-f0-9]{32}$',
            'MD4': r'^[a-f0-9]{32}$',
            'MD5': r'^[a-f0-9]{32}$',
            'SHA1': r'^[a-f0-9]{40}$',
            'SHA256': r'^[a-f0-9]{64}$',
            'SHA384': r'^[a-f0-9]{96}$',
            'SHA512': r'^[a-f0-9]{128}$',
            'RIPEMD128': r'^[a-f0-9]{32}$',
            'RIPEMD160': r'^[a-f0-9]{40}$',
            'RIPEMD256': r'^[a-f0-9]{64}$',
            'RIPEMD320': r'^[a-f0-9]{80}$',
            'Whirlpool': r'^[a-f0-9]{128}$',
            'Tiger128,3': r'^[a-f0-9]{32}$',
            'Tiger160,3': r'^[a-f0-9]{40}$',
            'Tiger192,3': r'^[a-f0-9]{48}$',
            'Tiger128,4': r'^[a-f0-9]{32}$',
            'Tiger160,4': r'^[a-f0-9]{40}$',
            'Tiger192,4': r'^[a-f0-9]{48}$',
            'Snefru': r'^[a-f0-9]+$',
            'GOST': r'^[a-f0-9]+$',
            'Adler32': r'^[a-f0-9]{8}$',
            'CRC32': r'^[a-f0-9]{8}$',
            'CRC32B': r'^[a-f0-9]{8}$',
            'FCS32': r'^[a-f0-9]{8}$',
            'GHash32_3': r'^[a-f0-9]{8}$',
            'GHash32_5': r'^[a-f0-9]{8}$',
            'FNV132': r'^[a-f0-9]{8}$',
            'Fletcher32': r'^[a-f0-9]{8}$',
            'Joaat': r'^[a-f0-9]{8}$',
            'ELF32': r'^[a-f0-9]{8}$',
            'XOR32': r'^[a-f0-9]{8}$',
            'Dahua': r'^[a-f0-9]{8}$',
            # Add more patterns for other hash types as needed
        }
        algorithms = []
        # Iterate over patterns and check if the hash matches
        for algorithm, pattern in hash_patterns.items():
            if match(pattern, hash, IGNORECASE):
                algorithms.append(algorithm)

        if algorithms:
            return {"status": "success", "types": algorithms}      #found
        return {"status": "failed", "types": "None"}         #not found

if __name__ == '__main__':

    detected_algorithms = HashIdentifier().getData(input("Enter a hash to be identified: "))
    if detected_algorithms:
        print("Detected hash algorithms:", detected_algorithms)
    else:
        print("No matching hash algorithm found.")
