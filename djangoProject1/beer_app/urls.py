from django.urls import path
from .views import main_page, search_page, list_page, beer_page
# app_name will help us do a reverse look-up latter.
urlpatterns = [
    path('main/', main_page),
    path('main/search/', search_page),
    path('main/search/list/', list_page),
    path('<int:id>/<str:name>/', beer_page),
    path('<int:id>/<str:name>/<int:grade>/', beer_page)
]