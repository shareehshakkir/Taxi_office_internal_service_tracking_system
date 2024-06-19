from datetime import date, timedelta
from django.utils import timezone
from django.shortcuts import render
from rest_framework import generics, status
from .serializers import DriverSerializer,CreateDriverSerializer, CreateTaxiDetailSerializer,ReceivedSerializer, CompletedRideSerializer, EarningsSerializer, OngoingRideSerializer, CancelledRideSerializer, CreateNewRideSerializer, DriverDashboardSerializer, AdminDashboardSerializer,NewRideDetailSerializer

from api.mlmodel.predict import predict_fare_amount,predict_carpool_percentage

from .models import NewDriver, TaxiDetail,NewRideDetail,Earning
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .ride_service import assign_driver_to_ride

from django.shortcuts import get_object_or_404
from django.http import JsonResponse

import jwt
from django.conf import settings
from django.http import JsonResponse, Http404


def get_driver_id(request):
    
    auth_header = request.headers.get('Authorization')
    if auth_header:
        
        token = auth_header.split(' ')[1]

        try:
            
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
           
            driver_id = payload['driver_id']
            return driver_id
        except jwt.ExpiredSignatureError:
            return JsonResponse({'error': 'Token expired.'}, status=401)
        except jwt.InvalidTokenError:
            return JsonResponse({'error': 'Invalid token.'}, status=401)
    else:
        return JsonResponse({'error': 'Authorization header not found.'}, status=401)


# Create your views here.


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllViewDriver(request):
    drivers = NewDriver.objects.all()
    serializer = DriverSerializer(drivers, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getViewDriver(request):

    driver_id_view_driver = get_driver_id(request)
    drivers = NewDriver.objects.filter(driver_id=driver_id_view_driver).first()
    serializer = DriverSerializer(drivers, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def CreateDriverView(request):
    driver_id = get_driver_id(request)  
    
    serializer = CreateDriverSerializer(data=request.data)
    if serializer.is_valid():
        new_driver = serializer.save(driver_id=driver_id) 

       
        Earning.objects.create(driver_id=new_driver, total_earnings=0, total_rides=0, total_paid=0, total_pending=0)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def updatedriverdetails(request, driver_id):
    try:
        driver = NewDriver.objects.get(driver_id=driver_id)
    except NewDriver.DoesNotExist:
        raise Http404

    if request.method == 'GET':
        serializer = CreateDriverSerializer(driver)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CreateDriverSerializer(driver, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_driver(request, driver_id):
    try:
        driver = NewDriver.objects.get(driver_id=driver_id)
    except NewDriver.DoesNotExist:
        raise Http404

    driver.delete()

    return Response({'message': 'Driver deleted successfully'})


@api_view(['POST'])
def CreateTaxiView(request):
    driver_id_create_taxi = get_driver_id(request)
    print(driver_id_create_taxi)

    try:
        driver = NewDriver.objects.get(pk=driver_id_create_taxi)
    except NewDriver.DoesNotExist:
        raise Http404('Driver not found.')
    
    request.data['driver_id'] = driver.driver_id
    print(request.data)
    serializer = CreateTaxiDetailSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)



@api_view(['GET'])
@permission_classes([IsAdminUser])
def getViewAllTaxiDetails(request):
    taxi = TaxiDetail.objects.all()
    serailizer = CreateTaxiDetailSerializer(taxi, many=True)
    return Response(serailizer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getViewTaxiDetails(request):
    driver_id_view_taxi = get_driver_id(request)

    taxi = TaxiDetail.objects.filter(driver_id = driver_id_view_taxi).first()
    serailizer = CreateTaxiDetailSerializer(taxi)
    return Response(serailizer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getViewSingleReceived(request):
    driver_id_received = get_driver_id(request)
    driver = NewDriver.objects.get(driver_id=driver_id_received)
    
    received = NewRideDetail.objects.filter(driver_id = driver_id_received)
    serialized_data = []

    for ride in received:
        serialized_ride = ReceivedSerializer(ride).data
        serialized_ride['driver_name'] = driver.driver_name
        serialized_data.append(serialized_ride)

    return Response(serialized_data)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getViewAllReceived(request):
    received = NewRideDetail.objects.all()
    
    serialized_data = []

    for ride in received:
        driver = NewDriver.objects.get(driver_id = ride.driver_id.driver_id)
        serialized_ride = ReceivedSerializer(ride).data
        serialized_ride['driver_name'] = driver.driver_name
        serialized_data.append(serialized_ride)

    return Response(serialized_data)



# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getViewAllReceived(request):
#     received = NewRideDetail.objects.all()
    
#     serialized_data = NewRideDetailSerializer(received, many=True).data

#     return Response(serialized_data)







@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllViewCompleted(request):
    completed = NewRideDetail.objects.filter(status='reached')
    serailizer = CompletedRideSerializer(completed, many=True)
    return Response(serailizer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getViewCompleted(request):
    driver_id_view_completed = get_driver_id(request)
    completed = NewRideDetail.objects.filter(driver_id = driver_id_view_completed, status='reached')
    serailizer = CompletedRideSerializer(completed, many=True)
    return Response(serailizer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def received_ride_details_view(request, rideId):
    try:
        ride = NewRideDetail.objects.get(rideId=rideId)
        driver = NewDriver.objects.get(driver_id = ride.driver_id.driver_id)
        driver_name = driver.driver_name
        passenger_name = ride.passenger_name
        start_from = ride.start_from
        destination = ride.destination
        starting_time = ride.starting_time
        reachedtime = ride.reachedtime
        _status = ride.status
        _carpool = ride.carpool
        _expectedDriverPay = ride.expectedDriverPay
        _carpoolPercent = ride.carpoolPercent

        return Response({
            #'rideId': rideId,
            'passenger_name':passenger_name ,
            'driver_name': driver_name,
            'start_from': start_from,
            'destination': destination,
            'starting_time': starting_time,
            'reachedtime': reachedtime,
            'status': _status,
            'carpool': _carpool,
            'expectedDriverPay' : _expectedDriverPay,
            'carpoolPercent' : _carpoolPercent

        })
    except NewRideDetail.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllViewCancelled(request):
    cancelled = NewRideDetail.objects.filter(status='cancelled')
    serailizer = CancelledRideSerializer(cancelled, many=True)
    return Response(serailizer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getViewCancelled(request):
    driver_id_view_cancelled = get_driver_id(request)
    cancelled = NewRideDetail.objects.filter(driver_id = driver_id_view_cancelled,status='cancelled')
    serailizer = CancelledRideSerializer(cancelled, many=True)
    return Response(serailizer.data)




@api_view(['POST'])
def CreateNewRideView(request):
    serializer = CreateNewRideSerializer(data=request.data)
    if serializer.is_valid():
        ac = serializer.save()
        # print(serializer.validated_data)
        # print(
        # ride_id = serializer.validated_data['rideId']
        
        
        ride_id = ac.rideId
        #print(ride_id)
        
       



        ass_dri = assign_driver_to_ride(ride_id)
        ac.driver_id = ass_dri
        
       
        
        serializer.save()
       
        ride = NewRideDetail.objects.get(rideId = ride_id)
        print(ride.destination)
    
       
        ac.expectedDriverPay = predict_fare_amount(ride)
        ac.carpoolPercent = predict_carpool_percentage(ride)
        serializer.save()

        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Earnings_of_single_driver(request):
    try:
        driver_id_view_single_earnings = get_driver_id(request)
        driver = NewDriver.objects.get(driver_id = driver_id_view_single_earnings)
        driver_name = driver.driver_name

        earnings = Earning.objects.get(driver_id=driver_id_view_single_earnings)
        total_earnings = earnings.total_earnings
        total_rides = earnings.total_rides
        total_pending = earnings.total_pending
        total_paid = earnings.total_paid
        
        return Response({
                    'driver_id': driver_id_view_single_earnings,
                    'driver_name': driver_name,
                    'total_earnings': total_earnings,
                    'total_rides': total_rides,
                    'total_pending': total_pending,
                    'total_paid': total_paid
                })
    except NewDriver.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def Earnings_of_all_drivers(request):
    try:
        drivers = NewDriver.objects.all()

        earnings_data = []
        for driver in drivers:
            driver_id = driver.driver_id
            driver_name = driver.driver_name

            earnings = Earning.objects.get(driver_id=driver_id)
            total_earnings = earnings.total_earnings
            total_rides = earnings.total_rides
            total_pending = earnings.total_pending
            total_paid = earnings.total_paid

            earnings_data.append({
                'driver_id': driver_id,
                'driver_name': driver_name,
                'total_earnings': total_earnings,
                'total_rides': total_rides,
                'total_pending': total_pending,
                'total_paid': total_paid
            })

        return Response(earnings_data)
    except (NewDriver.DoesNotExist, Earning.DoesNotExist):
        return Response(status=status.HTTP_404_NOT_FOUND)





@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getViewOngoing(request):
    print("Fbg")
    driver_id_view_ongoing = get_driver_id(request)
    print(driver_id_view_ongoing)
    ongoing = NewRideDetail.objects.filter(driver_id = driver_id_view_ongoing)
    ongoing = ongoing.filter(status="ongoing")
    for x in ongoing:
        print(x.status)
    print(ongoing)
    serailizer = OngoingRideSerializer(ongoing, many=True)
    return Response(serailizer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllViewOngoing(request):
    ongoing = NewRideDetail.objects.filter(status='ongoing')
    serailizer = OngoingRideSerializer(ongoing,many = True)
    return Response(serailizer.data)



@api_view(['GET'])
def get_retention(request):
    co = [
        [40.780078358949893, -73.960673974467397],
        [40.646255785919898, -73.784883206389665],
        [40.770169181619735, -73.872255906701724],
        [40.725767414067676, -73.996344250052076],
        [40.755507681362332, -73.982438718280932],
    ]

    return Response(co)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAdminViewDashboard(request):
    # Calculate the date range for the previous three days
    today = date.today()
    three_days_ago = today - timedelta(days=3)

    # Initialize dictionaries to store driver information and daily totals
    driver_data = {}
    daily_totals = {}

    # Iterate over each driver
    drivers = NewDriver.objects.all()
    for driver in drivers:
        driver_id = driver.driver_id

        # Calculate the total rides and earnings for the driver
        rides = NewRideDetail.objects.filter(driver_id=driver_id)
        total_rides = rides.count()
        total_earnings = sum(int(ride.expectedDriverPay) or 0 for ride in rides)

        # Store the driver information in the dictionary
        driver_data[driver_id] = {
            'driver_id': driver_id,
            'driver_name': driver.driver_name,
            'total_rides': total_rides,
            'total_earnings': total_earnings
        }

        # Calculate the total rides and earnings for each day in the date range
        current_date = three_days_ago
        while current_date <= today:
            rides_per_day = rides.filter(requested_time__date=current_date)

            # Calculate total rides and earnings for the current day
            total_rides_per_day = rides_per_day.count()
            total_earnings_per_day = sum(int(ride.expectedDriverPay) or 0 for ride in rides_per_day)

            # Store the daily totals in the dictionary
            if current_date.strftime('%Y-%m-%d') not in daily_totals:
                daily_totals[current_date.strftime('%Y-%m-%d')] = {
                    'total_rides': 0,
                    'total_earnings': 0
                }
            daily_totals[current_date.strftime('%Y-%m-%d')]['total_rides'] += total_rides_per_day
            daily_totals[current_date.strftime('%Y-%m-%d')]['total_earnings'] += total_earnings_per_day

            current_date += timedelta(days=1)

    # Find the day with the highest number of rides
    max_rides_day = max(daily_totals, key=lambda k: daily_totals[k]['total_rides'])
    
    max_rides_driver_id = max(driver_data, key=lambda k: driver_data[k]['total_rides'])
    max_rides_driver = driver_data[max_rides_driver_id]

    # Add the day with the highest number of rides to the dashboard data
    dashboard_data = {
        'drivers': driver_data,
        'daily_totals': daily_totals,
        'max_rides_day': max_rides_day,
        'max_rides_driver': max_rides_driver
    }

    serializer = AdminDashboardSerializer(dashboard_data)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getDriverViewDashboard(request):
    driver_id_dashboard = get_driver_id(request)

    # Calculate the date range for the previous three days
    today = date.today()
    three_days_ago = today - timedelta(days=3)

    # Initialize a dictionary to store daily totals
    daily_totals = []

    # Calculate the total rides and earnings for each day in the date range
    current_date = three_days_ago
    while current_date <= today:
        
        rides = NewRideDetail.objects.filter(driver_id=driver_id_dashboard, requested_time__date=current_date)
        print(rides)
        print(current_date)
        # Calculate total rides and earnings for the current day
        total_rides = rides.count()
        total_earnings = sum(int(ride.expectedDriverPay) or 0 for ride in rides)

        # Store the daily totals in the dictionary
        daily_total = {
            'date': current_date.strftime('%Y-%m-%d'),
            'total_rides': total_rides,
            'total_earnings': total_earnings
        }

        daily_totals.append(daily_total)

        current_date += timedelta(days=1)

    # Retrieve the driver's information from NewDriver model
    driver = NewDriver.objects.get(driver_id=driver_id_dashboard)

    # Create the dashboard data dictionary
    dashboard_data = {
        'driver_id': driver.driver_id,
        'driver_name': driver.driver_name,
        'total_rides': sum(totals['total_rides'] for totals in daily_totals),
        'total_earnings': sum(totals['total_earnings'] for totals in daily_totals),
        'daily_totals': daily_totals
    }

    serializer = DriverDashboardSerializer(dashboard_data)
    return Response(serializer.data)




@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_ride_status(request, ride_id):
    ride = get_object_or_404(NewRideDetail, rideId=ride_id)
    driver = get_object_or_404(NewDriver, driver_id=ride.driver_id.driver_id)

    if request.method == 'PUT':
        status = request.data.get('status')

        if status == 'accepted':
            
            
            driver.driver_status = 'unavailable'
            driver.save()

            ride.status = status
            ride.starting_time = timezone.now()  # Set starting_time to the current date and time
            ride.save()

            return JsonResponse({'message': 'Ride status updated successfully.'})
        
        if status == 'taxi malfunction':
            
            driver.driver_status = 'unavailable'
            driver.save()
            ride.status = 'canceled'
            ride.save()

            return JsonResponse({'message': 'Ride status updated successfully.'})

        if status == 'delayed by user' or status == 'delayed by driver' or status == 'in-progress':
            
            ride.status = 'ongoing'
            ride.save()

            return JsonResponse({'message': 'Ride status updated successfully.'})

        if status == 'arrived':
            
            driver.driver_status = 'available'
            driver.save()
            ride.reachedtime = timezone.now()
            ride.status = status
            ride.save()

            # Update total earnings in Earning model
            driver_id = ride.driver_id
            expected_pay = ride.expectedDriverPay

            try:
                earning = Earning.objects.get(driver_id=driver_id)
                earning.total_earnings += int(expected_pay)
                earning.total_pending  += int(expected_pay)
                earning.total_rides += 1
                earning.save()
            except Earning.DoesNotExist:
                # Handle the case when Earning object does not exist for the driver
                # Create a new Earning object with the driver_id and expected_pay
                Earning.objects.create(
                    driver_id=driver_id, 
                    total_earnings=int(expected_pay),
                    total_pending = int(expected_pay),
                    total_rides = 1
                    )

            return JsonResponse({'message': 'Ride status updated successfully.'})

        else:
            ride.status = status
            ride.save()
            return JsonResponse({'message': 'Ride status updated successfully.'})
    return JsonResponse({'message': 'Invalid request method.'}, status=400)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_driver_status(request, driver_id):
    driver = get_object_or_404(NewDriver, driver_id=driver_id)

    if request.method == 'POST':
        status = request.POST.get('status')

        # Update the status of the driver
        driver.driver_status = status
        driver.save()

        return JsonResponse({'message': 'Driver status updated successfully.'})

    return JsonResponse({'message': 'Invalid request method.'}, status=400)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_driver_availability(request, driver_id):
    driver = get_object_or_404(NewDriver, driver_id=driver_id)

    if request.method == 'PUT':
        is_available = request.data.get('is_available')

        # Update the availability status of the driver
        driver.driver_status = 'available' if is_available == 'true' else 'unavailable'
        driver.save()

        return JsonResponse({'message': 'Driver availability status updated successfully.'})

    return JsonResponse({'message': 'Invalid request method.'}, status=400)



@api_view(['PUT'])
@permission_classes([IsAdminUser])
def delete_or_disable_driver(request, driver_id):
    driver = get_object_or_404(NewDriver, driver_id=driver_id)

    if request.method == 'PUT':
        # Check if the driver is involved in any ongoing rides
        ongoing_rides = NewRideDetail.objects.filter(driver_id=driver, status__in=['requested', 'accepted'])
        if ongoing_rides.exists():
            return JsonResponse({'message': 'Driver cannot be deleted or disabled while involved in ongoing rides.'}, status=400)

        # Delete or disable the driver based on the action specified
        action = request.data.get('action')
        if action == 'delete':
            driver.delete()
            return JsonResponse({'message': 'Driver deleted successfully.'})
        elif action == 'disable':
            driver.driver_status = 'unavailable'
            driver.save()
            return JsonResponse({'message': 'Driver disabled successfully.'})
        elif action == 'enable':
            driver.driver_status = 'available'
            driver.save()
            return JsonResponse({'message': 'Driver enabled successfully.'})
        else:
            return JsonResponse({'message': 'Invalid action specified.'}, status=400)

    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_all_drivers(request):
    drivers = NewDriver.objects.all()
    drivers_data = []

    for driver in drivers:
        taxi = TaxiDetail.objects.get(driver_id=driver)
        earn = Earning.objects.get(driver_id = driver)
        driver_data = {
            'driver_id': driver.driver_id,
            'driver_name': driver.driver_name,
            'driver_email': driver.driver_email,
            'driver_status': driver.driver_status,
            'driver_phone':driver.driver_phone,
            'driver_upi': driver.driver_upi,
            'total_rides':earn.total_rides,
            'total_earning':earn.total_earnings,
            'taxi_num': taxi.taxi_num,
            'taxi_test_date': taxi.taxi_test_date,
            'taxi_pollution_validity': taxi.taxi_pollution_validity,
            'taxi_insurance': taxi.taxi_insurance,
            'taxi_type': taxi.taxi_type,
            'taxi_manufacturer': taxi.taxi_manufacturer,
            'taxi_model': taxi.taxi_model,
        }
        drivers_data.append(driver_data)

    return JsonResponse({'drivers': drivers_data})



@api_view(['GET'])
@permission_classes([IsAdminUser])
def list_single_driver(request, driver_id):
    driver = NewDriver.objects.get(driver_id = driver_id)
    


    taxi = TaxiDetail.objects.get(driver_id=driver_id)
    earn = Earning.objects.get(driver_id = driver_id)
    driver_data = {
        'driver_id': driver.driver_id,
        'driver_name': driver.driver_name,
        'driver_email': driver.driver_email,
        'driver_status': driver.driver_status,
        'driver_phone':driver.driver_phone,
        'driver_upi': driver.driver_upi,
        'total_rides':earn.total_rides,
        'total_earning':earn.total_earnings,
        'taxi_num': taxi.taxi_num,
        'taxi_test_date': taxi.taxi_test_date,
        'taxi_pollution_validity': taxi.taxi_pollution_validity,
        'taxi_insurance': taxi.taxi_insurance,
        'taxi_type': taxi.taxi_type,
        'taxi_manufacturer': taxi.taxi_manufacturer,
        'taxi_model': taxi.taxi_model,
    }

    return JsonResponse({'drivers': driver_data})



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_driver_profile(request):
    driver_id = get_driver_id(request)

    try:
        driver = NewDriver.objects.get(driver_id=driver_id)
    except NewDriver.DoesNotExist:
        return JsonResponse({'error': 'Driver not found.'}, status=404)

    if request.method == 'PUT':
        serializer = CreateDriverSerializer(driver, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'Driver profile updated successfully.'})
        return JsonResponse(serializer.errors, status=400)

    return JsonResponse({'message': 'Invalid request method.'}, status=400)



# Dashboard

# New ride
# Driver sign up
# Driver profile


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