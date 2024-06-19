from django.urls import path
from . import views 
from .views import MyTokenObtainPairView,RegisterUser

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
	path('',views.getRoutes),
	path('notes', views.getNotes),

	path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/',RegisterUser.as_view(), name='register_user'),
    path('update-user-password/', views.update_user_password, name='update-user-password'),

]
