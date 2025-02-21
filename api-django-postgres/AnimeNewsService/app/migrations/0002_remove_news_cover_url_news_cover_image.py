# Generated by Django 4.2.19 on 2025-02-21 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='news',
            name='cover_url',
        ),
        migrations.AddField(
            model_name='news',
            name='cover_image',
            field=models.ImageField(blank=True, null=True, upload_to='news_covers/'),
        ),
    ]
