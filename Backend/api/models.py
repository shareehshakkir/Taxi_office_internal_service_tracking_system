from django.db import models
import string
import random

class unique_generator:

    def generate_unique_code_for_driverid():
        length = 8

        while True:
            driver_id = ''.join(random.choices(string.digits, k=length))
            if NewDriver.objects.filter(driver_id=driver_id).count() == 0:
                break

        return driver_id



    def generate_unique_code_for_rideid():
        length = 8

        while True:
            rideId = ''.join(random.choices(string.digits, k=length))
            if NewRideDetail.objects.filter(rideId=rideId).count() == 0:
                break

        return rideId

# Create your models here.


class NewDriver(models.Model):
    driver_id = models.IntegerField(max_length=10,primary_key=True, )
    driver_name = models.CharField(max_length=30, unique=False)
    driver_email = models.EmailField()
    driver_upi = models.CharField(max_length=15, unique=True)
    driver_phone = models.BigIntegerField(max_length=10)
    driver_dob = models.DateField(auto_now=False, auto_now_add=False, max_length=12)
    driver_status = models.CharField(max_length=20, default="available")

            
class TaxiDetail(models.Model):
    driver_id = models.OneToOneField(NewDriver,on_delete=models.CASCADE)
    taxi_num = models.CharField(max_length=10, primary_key=True)
    taxi_test_date = models.DateField(auto_now=False, auto_now_add=False, max_length=12)
    taxi_pollution_validity = models.DateField(auto_now=False, auto_now_add=False, max_length=12)
    taxi_insurance = models.DateField(auto_now=False, auto_now_add=False, max_length=12)
    taxi_type = models.CharField(max_length=10, default='')
    taxi_manufacturer = models.CharField(max_length=10, default='')
    taxi_model = models.CharField(max_length=10, default='')


class NewRideDetail(models.Model):
    rideId = models.IntegerField(max_length=10,default=unique_generator.generate_unique_code_for_rideid, primary_key=True)
    passenger_name = models.CharField(max_length=250)
    driver_id = models.ForeignKey(NewDriver, on_delete=models.CASCADE, default="", null=True)
    start_from = models.CharField(max_length=250)
    destination = models.CharField(max_length=250)
    requested_time = models.DateTimeField(auto_now_add=True)
    starting_time = models.DateTimeField(auto_now_add=False,null=True)
    reachedtime = models.DateTimeField(auto_now_add=False,null=True)
    status = models.CharField(max_length=20,default="requested")
    passenger_count = models.IntegerField(default=1)
    carpool = models.BooleanField(default=False)
    expectedDriverPay = models.IntegerField(default=0,max_length=7,null=True)
    carpoolPercent = models.IntegerField(default=0)
    passenger_count = models.IntegerField(default=0)

    




class Earning(models.Model):
    driver_id = models.OneToOneField(NewDriver,on_delete=models.CASCADE)
    total_earnings = models.IntegerField(default=int(0))
    total_rides = models.IntegerField(default=int(0))
    total_paid = models.IntegerField(default=int(0))
    total_pending = models.IntegerField(default=int(0))


'''class yellow_tripdata_2016_03(models.Model):
    VendorID = models.IntegerField()
    tpep_pickup_datetime = models.DateTimeField()
    tpep_dropoff_datetime = models.DateTimeField()
    passenger_count = models.IntegerField()
    trip_distance = models.FloatField()
    pickup_longitude = models.FloatField()
    pickup_latitude = models.FloatField()
    RatecodeID = models.IntegerField()
    store_and_fwd_flag = models.CharField(max_length=1)
    dropoff_longitude = models.FloatField()
    dropoff_latitude = models.FloatField()
    payment_type = models.IntegerField()
    fare_amount = models.FloatField()
    extra = models.FloatField()
    mta_tax = models.FloatField()
    tip_amount = models.FloatField()
    tolls_amount = models.FloatField()
    improvement_surcharge = models.FloatField()
    total_amount = models.FloatField()'''