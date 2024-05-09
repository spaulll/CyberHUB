import random
import string
import math
import sqlite3
from icecream import ic

class RSAEncryption:
    def __init__(self):
        self.__p, self.__q = self.generate_distinct_primes()
        self.__n, self.__e, self.__d = self.generate_keys()
        self.__random_string = self.get_or_generate_random_string()
        ic(self.__p, self.__q,self.__n, self.__e, self.__d,self.__random_string)
 
    def get_or_generate_random_string(self):
        conn = sqlite3.connect("database.db")
        cursor = conn.cursor()
        
        # Check if random string exists in the database
        cursor.execute("SELECT randomstring FROM CipherData")
        existing_random_strings = cursor.fetchall()
        if existing_random_strings:
            random_string = self.generate_random_string()
            while random_string in existing_random_strings:
                random_string = self.generate_random_string()
            return random_string
        else:
            return self.generate_random_string()

    def encrypt(self, message, rail_fence_key):
        # Encrypt message using Rail Fence Cipher
        rail_fence_cipher = RailFenceCipher(rail_fence_key)
        rail_fence_encrypted = rail_fence_cipher.encrypt(message)
        
        # Encrypt Rail Fence encrypted message using RSA
        rsa_encrypted_integers = [pow(ord(char), self.__e, self.__n) for char in rail_fence_encrypted]
        self.storeto_DB(rsa_encrypted_integers)
        
        return rail_fence_encrypted, rsa_encrypted_integers
    
    def storeto_DB(self,encrypted_message):
        # Establish a connection to the SQLite database file
        conn = sqlite3.connect("database.db")
        cursor = conn.cursor()  
        self._encrypted=' '.join(map(str, encrypted_message))
        
        # Insert data into the table using parameterized query
        insert_query = "INSERT INTO CipherData (encrypted, randomstring, keyN, keyE, keyD) VALUES (?, ?, ?, ?, ?)"
        data = (self._encrypted, self.__random_string, self.__n, self.__e, self.__d)
        cursor.execute(insert_query, data)
        print("Inserted")

        # Commit changes to the database
        conn.commit()

        # Close the cursor and connection
        cursor.close()
        conn.close()  

    def decrypt(self, rsa_encrypted_integers, rail_fence_key):
        # Decrypt RSA encrypted message
        rsa_decrypted = ''.join([chr(pow(char, self.__d, self.__n)) for char in rsa_encrypted_integers])
        
        # Decrypt RSA decrypted message using Rail Fence Cipher
        rail_fence_cipher = RailFenceCipher(rail_fence_key)
        rail_fence_decrypted = rail_fence_cipher.decrypt(rsa_decrypted)
        
        return rail_fence_decrypted

    def generate_keys(self):
        n = self.__p * self.__q
        phi_n = (self.__p - 1) * (self.__q - 1)
        e, d = self.generate_public_private_exponents(phi_n)
        return n, e, d

    def generate_public_private_exponents(self, phi_n):
        while True:
            e = random.randint(phi_n // 2, phi_n)
            if math.gcd(e, phi_n) == 1:
                d = self.modinv(e, phi_n)
                return e, d

    def modinv(self, a, m):
        m0, x0, x1 = m, 0, 1
        while a > 1:
            q = a // m
            m, a = a % m, m
            x0, x1 = x1 - q * x0, x0
        return x1 + m0 if x1 < 0 else x1

    def generate_distinct_primes(self):
        while True:
            p = self.generate_random_prime(100, 1000)
            q = self.generate_random_prime(100, 1000)
            if p != q:
                return p, q

    def is_prime(self, n):
        if n <= 1:
            return False
        for i in range(2, int(n**0.5) + 1):
            if n % i == 0:
                return False
        return True

    def generate_random_prime(self, a, b):
        while True:
            n = random.randint(a, b)
            if self.is_prime(n):
                return n

    def generate_random_string(self):
        return ''.join(random.choice(string.ascii_letters + string.digits + "@#$&") for _ in range(random.randint(30, 40)))

    # Method to access random string
    def get_random_string(self):
        return self.__random_string

    # Methods to access private variables
    def get_n(self):
        return self.__n

    def get_e(self):
        return self.__e

    def get_q(self):
        return self.__q

class RailFenceCipher:
    def __init__(self, key):
        self.key = key

    def encrypt(self, plaintext):
        num_columns = len(plaintext)
        num_rows = self.key
        matrix = [['' for _ in range(num_columns)] for _ in range(num_rows)]
        
        # Generate the rail fence matrix
        direction, row = 1, 0
        for j in range(num_columns):
            matrix[row][j] = plaintext[j]
            row += direction

            if row == 0 or row == self.key - 1:
                direction *= -1
        
        # Generate the ciphertext
        cipher = ''
        for i in range(self.key):
            for j in range(num_columns):
                if matrix[i][j] != '':
                    cipher += matrix[i][j]
        return cipher

    def decrypt(self, ciphertext):
        num_columns = len(ciphertext)
        num_rows = self.key
        matrix = [['' for _ in range(num_columns)] for _ in range(num_rows)]
        
        # Reconstruct the rail fence matrix
        direction, row = 1, 0
        for j in range(num_columns):
            matrix[row][j] = '*'
            row += direction

            if row == 0 or row == self.key - 1:
                direction *= -1
        
        # Fill the matrix with ciphertext characters
        index = 0
        for i in range(self.key):
            for j in range(num_columns):
                if matrix[i][j] == '*':
                    matrix[i][j] = ciphertext[index]
                    index += 1
        
        # Reconstruct plaintext from the matrix
        plaintext = ''
        direction, row = 1, 0
        for j in range(num_columns):
            plaintext += matrix[row][j]
            row += direction

            if row == 0 or row == self.key - 1:
                direction *= -1
        return plaintext

def initDB():
    # Establish a connection to the SQLite database file
    conn = sqlite3.connect("database.db")

    # Create a cursor object to execute SQL commands
    cursor = conn.cursor()

    # Create the CipherData table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS CipherData (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            encrypted VARCHAR(200),
            randomstring VARCHAR(200),
            keyN INT,
            keyE INT,
            keyD INT,
            UNIQUE(encrypted)
        )
    ''')

    # Commit changes to the database
    conn.commit()

    # Close the cursor and connection
    cursor.close()
    conn.close()

if __name__ == '__main__':

    # Initialize the DB
    initDB()
    
    # Instantiate the RSAEncryption class
    rsa = RSAEncryption()

    # Example usage:
    message = input("Enter the message: ")
    rail_fence_key = 2

    # Encrypt message using RSA and Rail Fence Cipher
    rail_fence_encrypted, rsa_encrypted_integers = rsa.encrypt(message, rail_fence_key)

    # Get the random string from RSAEncryption class
    random_string = rsa.get_random_string()

    print("Encrypted message after Rail Fence:", rail_fence_encrypted)
    print("Random string:", random_string)
    print("Encrypted message after RSA (as integers):", rsa_encrypted_integers)

    # Decrypt message using RSA and Rail Fence Cipher
    rail_fence_decrypted = rsa.decrypt(rsa_encrypted_integers, rail_fence_key)

    print("Decrypted message:", rail_fence_decrypted)
