from django.urls import path, include
from .views import home, checkout, tracker

urlpatterns = [
    path('', home, name='home' ),
    path('checkout/', checkout, name='checkout' ),
    path('tracker/', tracker, name='tracker' )
] 