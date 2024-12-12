from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Note
from .serializers import NoteSerializer


class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)


class SignupView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        # Check if user already exists
        if User.objects.filter(username=username).exists():
            return Response({"error": "User already exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the user
        user = User.objects.create_user(username=username, password=password)
        return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)
