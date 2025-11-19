from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    # Read-only frontend aliases
    description = serializers.CharField(source='excerpt', read_only=True)
    thumbnail = serializers.ImageField(source='cover_image', read_only=True)

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug',
            'excerpt', 'cover_image',        
            'description', 'thumbnail',      
            'content_json',
            'created_at', 'updated_at',
        ]
