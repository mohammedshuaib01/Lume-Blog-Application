from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .models import Post
from .serializers import PostSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os

# ----------------- Post ViewSet -----------------
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    lookup_field = 'slug'

    # Optional: update content only (for editor autosave)
    @action(detail=True, methods=['patch'])
    def content(self, request, pk=None):
        post = self.get_object()
        post.content_html = request.data.get('content_html', post.content_html)
        post.content_json = request.data.get('content_json', post.content_json)
        post.save()
        return Response(PostSerializer(post).data)

# ----------------- File upload endpoints -----------------
class UploadImageView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        file_obj = request.FILES.get('image') or request.FILES.get('file')
        if not file_obj:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
        save_path = os.path.join('uploads', 'images', file_obj.name)
        path = default_storage.save(save_path, ContentFile(file_obj.read()))
        url = settings.MEDIA_URL + path
        full_url = request.build_absolute_uri(url)
        return Response({'url': full_url}, status=status.HTTP_201_CREATED)

class UploadVideoView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        file_obj = request.FILES.get('video') or request.FILES.get('file')
        if not file_obj:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
        save_path = os.path.join('uploads', 'videos', file_obj.name)
        path = default_storage.save(save_path, ContentFile(file_obj.read()))
        url = settings.MEDIA_URL + path
        full_url = request.build_absolute_uri(url)
        return Response({'url': full_url}, status=status.HTTP_201_CREATED)w
