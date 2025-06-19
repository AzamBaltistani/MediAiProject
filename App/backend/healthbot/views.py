import os
import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from google import genai
from django.conf import settings

GEMINI_API_KEY = settings.GEMINI_API_KEY

class GeminiChatView(APIView):
    def post(self, request):
                
        history = "This is our history:\n"

        messages = request.data.get("messages", False)
        
        if not messages:
            return Response({"reply": "Please ask any question ..."}, status=400)
        
        for msg in messages:
            if msg['role'] == 'user':
                history += f"Me: {msg['text']}\n"
            elif msg['role'] == 'assistant':
                history += f"You: {msg['text']}\n"

        print(history)
        
        COMMAND_PROMPT = "Act like a doctor and give answer according, if you don't get the prompt just say i don't understand it. Here's our previous conversations and new question/command: "
        user_message = COMMAND_PROMPT + history
        
        try:
            client = genai.Client(api_key=GEMINI_API_KEY)

            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=user_message,
            )

            data = response.text
            return Response({"reply": data})
        except Exception as e:
            return Response({"error": str(e)}, status=500)
