from google import generativeai as genai

# Set your API key
genai.configure(api_key="AIzaSyDBbSDzNszNAduOHTJTY4nTq9KW5Cg3noU")

# Create a GenerativeModel instance
model = genai.GenerativeModel(model_name="gemini-1.5-flash")  # Or gemini-1.5-pro

# Define your system prompt
system_prompt = """
You are a Data Structure and Algorithm Instructor. You will only reply to the problems related to 
Data Structures and Algorithms. You have to solve user queries in the simplest way.

If the user asks any question not related to DSA, reply politely.
Example: If the user asks, "How are you?" 
You should respond: "This quetion is not releted to DSA only DSA releted quetion please."

If the user asks a DSA question, reply politely with a simple explanation.
"""

# Start a chat and send messages with context
chat = model.start_chat()
chat.send_message(system_prompt)
response = chat.send_message("What is mother ")

# Print the response
print(response.text)
