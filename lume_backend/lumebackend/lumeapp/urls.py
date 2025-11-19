from django.urls import path, include
from rest_framework import routers
from .views import PostViewSet, UploadImageView, UploadVideoView

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('upload/image/', UploadImageView.as_view(), name='upload-image'),
    path('upload/video/', UploadVideoView.as_view(), name='upload-video'),
]
