import ollama
from datetime import datetime

print("Chatbot (LLaMA3) is running... (type 'exit' to quit)\n")


# Start Chat loop
while True:
    user_input = input("You: ")
    print("Input sent at", datetime.now())
    if user_input.lower() in ["exit", "quit"]:
      print("Bot: Goodbye!")
      break

    try:
      # send request to LLM
      response = ollama.chat(
        model="llama3",
        messages=[
          {"role":"system", "content": "You are a helpful assistant"},
          {"role":"user", "content": user_input}
        ]
      )
      # extract and print the response
      print("Response receive at", datetime.now())
      print("Bot:", response['message']['content'])
      
    except Exception as e:
      print("Error:", e)
