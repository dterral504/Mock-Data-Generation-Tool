from rest_framework import routers
from .api import LeadViewSet

router = routers.DefaultRouter()
router.register('api/generator', LeadViewSet, 'generator')

urlpatterns = router.urls