from django.db import models
from django.contrib.auth.models import User  
from tinymce.models import HTMLField

# Create your models here.
class News(models.Model):
    title = models.CharField(max_length=200)
    content = HTMLField()   # Rich text editor for formatted content
    cover_url = models.URLField(max_length=500)  # For image thumbnail
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='authored_news'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "News"
        ordering = ['-created_at']  # Newest first

    def __str__(self):
        return self.title

class Like(models.Model):
    news = models.ForeignKey(
        News,
        on_delete=models.CASCADE,
        related_name='likes'
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='liked_news'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['news', 'user']  # Each user can like a news article only once

    def __str__(self):
        return f"{self.user.username} likes {self.news.title}"

class Comment(models.Model):
    news = models.ForeignKey(
        News,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='user_comments'
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']  # Newest comments first

    def __str__(self):
        return f"Comment by {self.author.username} on {self.news.title}"