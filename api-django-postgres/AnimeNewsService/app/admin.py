from django.contrib import admin
from .models import News, Like, Comment

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at', 'updated_at')
    search_fields = ('title', 'content')
    list_filter = ('created_at', 'author')

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('news', 'user', 'created_at')
    list_filter = ('created_at', 'user')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('news', 'author', 'content', 'created_at')
    search_fields = ('content',)
    list_filter = ('created_at', 'author')