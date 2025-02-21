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
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

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

from rest_framework.parsers import MultiPartParser, FormParser

class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser,JSONParser)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def perform_create(self, serializer):
        print("Data received:", self.request.data)
        print("Files received:", self.request.FILES)
        
        cover_image = self.request.FILES.get('cover_image')
        if cover_image:
            serializer.save(author=self.request.user, cover_image=cover_image)
        else:
            serializer.save(author=self.request.user)

    def destroy(self, request, *args, **kwargs):
        news = self.get_object()
        # Add permission check
        if news.author != request.user:
            return Response({"detail": "You do not have permission to delete this news."}, 
                          status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

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
        # Include the news ID in the data
        data = {
            'news': news.id,  # Add the news ID here
            'content': request.data.get('content')
        }
        
        serializer = CommentSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save(news=news, author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    