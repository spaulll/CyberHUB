import base64


class Decoder:
    
    def decode_message(self,encoded_message):
    # Decode the base64 encoded message
        decoded_message = base64.b64decode(encoded_message).decode('utf-8')
        return decoded_message

# Example encoded message from JavaScript code
encoded_message_from_js = "aGk="

# Decode the message
