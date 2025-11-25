from django.db import models
from django.utils.text import slugify

class Post(models.Model):

    SLUG_CHOICE = [
        ('auto', 'Automatic'),
        ('manual', 'Manual'),
    ]

    title = models.CharField(max_length=255)
    slug_type = models.CharField(max_length=10, choices=SLUG_CHOICE, default='auto')
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    excerpt = models.TextField(blank=True)
    
    content_json = models.JSONField(blank=True, null=True)

    
    cover_image = models.ImageField(upload_to='posts/covers/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):

        # automatic slug
        if self.slug_type == 'auto':
            base = slugify(self.title)[:200]
            slug = base
            counter = 1

            # avoid duplicates
            while Post.objects.filter(slug=slug).exists():
                slug = f"{base}-{counter}"
                counter += 1
            self.slug = slug

        # manual slug
        else:
            if self.slug:
                base = slugify(self.slug)[:200]
                slug = base
                counter = 1
            # avoid duplicates
            while Post.objects.filter(slug=slug).exclude(id=self.id).exists():
                    slug = f"{base}-{counter}"
                    counter += 1

            self.slug = slug


        super().save(*args, **kwargs)

    def __str__(self): 
        return self.title
