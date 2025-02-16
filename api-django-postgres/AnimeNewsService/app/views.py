from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import get_object_or_404
from .models import News, Like, Comment
from .serializers import NewsSerializer, CommentSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User

@api_view(['POST'])
def register(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email', '')
        
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
            
        user = User.objects.create_user(username=username, password=password, email=email)
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['POST'])
    def like(self, request, pk=None):
        news = self.get_object()
        user = request.user
        
        if Like.objects.filter(news=news, user=user).exists():
            Like.objects.filter(news=news, user=user).delete()
            return Response({'status': 'unliked'})
        else:
            Like.objects.create(news=news, user=user)
            return Response({'status': 'liked'})

    @action(detail=True, methods=['POST'])
    def comment(self, request, pk=None):
        news = self.get_object()
        serializer = CommentSerializer(data={
            'news': news.id,  # Add the news ID
            'content': request.data.get('content')
        })
        
        if serializer.is_valid():
            serializer.save(news=news, author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    