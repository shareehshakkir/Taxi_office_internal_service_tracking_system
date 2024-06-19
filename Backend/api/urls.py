from django.urls import include, path
from . import views
urlpatterns = [
    #path('viewdriver', views.DriverView.as_view()),
    path('viewdriver',views.getViewDriver),

    path('driver/<int:driver_id>/me', views.updatedriverdetails),

    #path('createdriver', views.CreateDriverView.as_view()),
    path('createdriver',views.CreateDriverView),

    #path('viewtaxi',views.TaxiView.as_view()),
    path('viewtaxi',views.getViewTaxiDetails),

    path('viewalltaxi',views.getViewAllTaxiDetails),

    #path('createtaxi',views.CreateTaxiView.as_view()),
    path('createtaxi',views.CreateTaxiView),

    #path('received', views.ReceivedView.as_view()),
    path('received',views.getViewSingleReceived),

    path('allreceived',views.getViewAllReceived),
         
    path('rides/<str:rideId>',views.received_ride_details_view),
    #path('completedrides', views.CompletedRideView.as_view()),
    path('completedrides',views.getViewCompleted),

    path('allcompletedrides',views.getAllViewCompleted),

    #path('<str:rideId>/completedrides', views.CompletedRideDetailsView.as_view()),
    
    #path('cancelledrides', views.CancelledRideView.as_view()),
    path('cancelledrides',views.getViewCancelled),

    path('allcancelledrides',views.getAllViewCancelled),

    #path('/<str:rideId>/cancelledrides',views.CancelledRideDetailsView.as_view()),

    path('earnings', views.Earnings_of_single_driver),

    path('earningsadmin',views.Earnings_of_all_drivers),

    #path('ongoingrides', views.OngoingRideView.as_view()),
    path('ongoingrides',views.getViewOngoing),

    path('allongoingrides',views.getAllViewOngoing),

    #path('<str:driver_id>/updatedriverdetails',views.updatedriverdetails),

    #path('createnewride',views.CreateNewRideView.as_view()),
    path('createnewride',views.CreateNewRideView),

    #path('dashboard',views.DriverDashboardView.as_view()),
    path('dashboard',views.getDriverViewDashboard),

    path('admindashboard',views.getAdminViewDashboard),

    path('rides/<int:ride_id>/update-status/', views.update_ride_status, name='update_ride_status'),

    path('drivers/<int:driver_id>/update-status/', views.update_driver_status, name='update_driver_status'),

    path('admin/drivers/<int:driver_id>/change-availability/', views.change_driver_availability, name='change_driver_availability'),

    path('admin/drivers/<int:driver_id>/delete-or-disable/', views.delete_or_disable_driver, name='delete_or_disable_driver'),

    path('admin/drivers/list/', views.list_all_drivers, name='list_all_drivers'),

    path('admin/drivers/list/<int:driver_id>', views.list_single_driver, name='list_single_driver'),
    
    path('api/update-driver-profile/', views.update_driver_profile, name='update-driver-profile'),

    path('retention/',views.get_retention, name = 'retention' )


]


# Driver login
# Dashboard
# Received
# New ride
# Driver sign up
# Driver profile
# Completed ride
# 		->details
# Ongoing ride
# Earnings
# Canceled


# Admin login
# Dashboard
# Profile
# Received requests
# 		-> details
# Cars and Drivers
# Earnings
# Canceled
# Completed
# 		-> details

'''from django.urls import path
from .views import (
    DriverView,
    DriverDetailView,
    PassengerView,
    PassengerDetailView,
    RideView,
    RideDetailView,
    EarningsView,
    OngoingRideView,
)

urlpatterns = [
    path('drivers/', DriverView.as_view(), name='driver_list'),
    path('drivers/<int:pk>/', DriverDetailView.as_view(), name='driver_detail'),
    #path('passengers/', PassengerView.as_view(), name='passenger_list'),
    #path('passengers/<int:pk>/', PassengerDetailView.as_view(), name='passenger_detail'),
    path('rides/', RideView.as_view(), name='ride_list'),
    path('rides/<int:pk>/', RideDetailView.as_view(), name='ride_detail'),
    path('earnings/', EarningsView.as_view(), name='earnings_list'),
    path('ongoing-rides/', OngoingRideView.as_view(), name='ongoing_rides_list'),
]
'''
