from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    # Alias fields so React can use 'description' and 'thumbnail'
    description = serializers.CharField(source='excerpt')
    thumbnail = serializers.ImageField(source='cover_image')

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'slug', 'description', 'thumbnail',
            'content_json', 'created_at', 'updated_at'
        ]
