from rest_framework import serializers
from django.contrib.auth.models import User
from .models import News, Like, Comment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'news', 'author', 'content', 'created_at', 'updated_at')
        read_only_fields = ('author',)

class NewsSerializer(serializers.ModelSerializer):
    cover_image = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)
    author = UserSerializer(read_only=True)
    class Meta:
        model = News
        fields = [
            'id', 'title', 'content', 'cover_image', 
            'author', 'created_at', 'updated_at',
            'likes_count', 'is_liked', 'comments'
        ]
        read_only_fields = ['author', 'created_at', 'updated_at']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.cover_image:
            representation['cover_image'] = instance.cover_image.url
        return representation

    def get_cover_image(self, obj):
        if obj.cover_image:
            return obj.cover_image.url  # This returns the relative path like '/media/news_covers/poster.png'
        return None

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False