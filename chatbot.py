from openai import OpenAI   
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

print("Chatbot is running... (type 'exit' to quit)\n")

# Start Chat loop
while True:
    user_input = input("You: ")

    if user_input.lower() in ["exit", "quit"]:
      print("Bot: Goodbye!")
      break

    try:
      # send request to LLM
      response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
          {"role":"system", "content": "You are a helpful assistant"},
          {"role":"user", "content": user_input}
        ]
      )

      # extract and print the response
      answer = response.choices[0].message.content
      print("Bot:", answer)

    except Exception as e:
      print("Error:", e)
