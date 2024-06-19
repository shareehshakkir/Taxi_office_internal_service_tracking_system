from rest_framework import serializers
# from .models import Driver, Ride
from .models import TaxiDetail, NewDriver, NewRideDetail, Earning





# class TaxiDetails(serializers.Serializer):
#     taxi_num = serializers.CharField(max_length=15), 
#     taxi_test_date = serializers.DateField(),
#     taxi_pollution_validity = serializers.DateField(),
#     taxi_insurance = serializers.DateField(),
#     taxi_type = serializers.CharField(max_length=15),
#     taxi_model = serializers.CharField(max_length=15),

# class DriverWithTaxiDetails(serializers.ModelSerializer):
#     taxi_det = TaxiDetails(many=True)

#     class Meta:
#         model = NewDriver
#         fields = ('driver_id', 'driver_name', 'driver_email', 'driver_phone',  'driver_status', 'driver_upi','taxi_det')
#         depth = 1





# class NewDriverSerializer(serializers.ModelSerializer):
#     driver_id = serializers.CharField(max_length=10, default=generate_unique_code)
#     driver_name = serializers.CharField(max_length=30, default="")
#     driver_email = serializers.CharField(max_length=50)
#     driver_phone = serializers.CharField(max_length=11)
#     driver_upi = serializers.CharField(max_length=15, default='')
#     taxi_num = serializers.PrimaryKeyRelatedField(queryset=TaxiDetails.objects.all())
#     taxi_test_date = serializers.DateField()
#     taxi_pollution_validity = serializers.DateField()
#     taxi_insurance = serializers.DateField()
#     taxi_type = serializers.CharField(max_length=10, default='')
#     taxi_model = serializers.CharField(max_length=10, default='')

#     class Meta:
#         model = NewDriver
#         fields = ('driver_id', 'driver_name', 'driver_email', 'driver_phone', 'driver_upi', 'taxi_num',
#                   'taxi_test_date', 'taxi_pollution_validity', 'taxi_insurance', 'taxi_type', 'taxi_model')





class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewDriver
        fields = ('driver_id', 'driver_name', 'driver_email', 'driver_phone',  'driver_status', 'driver_upi',)




class CreateDriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewDriver
        fields = ('driver_name', 'driver_email', 'driver_phone', 'driver_status', 'driver_upi','driver_dob')

class CreateTaxiDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxiDetail
        fields = ('taxi_num','taxi_test_date','taxi_pollution_validity','taxi_insurance','taxi_type','taxi_manufacturer','taxi_model','driver_id')
        extra_kwargs = {
             'driver_id': {'write_only': True},
        }

class CreateNewRideSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewRideDetail
        fields = ('rideId','passenger_name','start_from', 'destination','status')
        # extra_kwargs = {
        #     'rideId': {'read_only': True},
        # }

       

class ReceivedSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewRideDetail
        fields = ('rideId','passenger_name', 'start_from', 'destination',
                  'requested_time', 'status','carpool','carpoolPercent','expectedDriverPay','starting_time','reachedtime')
        extra_kwargs = {
             'rideId': {'read_only': True},}
        
        


# class CompletedRideSerializer(serializers.ModelSerializer):
#     driver = serializers.StringRelatedField()

#     def get_driver_name(self, obj):
#         # Retrieve the driver name from the related NewDriver model
#         return obj.driver_id.driver_name
#     class Meta:
#         model = NewRideDetail
#         fields = ('rideId', 'passenger_name', 'start_from',
#                   'destination', 'reachedtime', 'status','driver_name')



class CompletedRideSerializer(serializers.ModelSerializer):
    # driver_name = serializers.SerializerMethodField()

    # def get_driver_name(self, obj):
    #     # Retrieve the driver name from the related NewDriver model
    #     return obj.driver_id.driver_name

    driver_name = serializers.CharField(source='driver_id.driver_name')


    class Meta:
        model = NewRideDetail
        fields = ('rideId', 'passenger_name', 'start_from','starting_time',
                  'destination', 'reachedtime', 'status', 'driver_name','expectedDriverPay','carpoolPercent')
        # Exclude the 'driver' field from the serialized output
        # extra_kwargs = {
        #     'driver': {'write_only': True},
        # }




class EarningsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Earning
        fields = ('total_rides', 'total_earnings',
                  'total_paid', 'total_pending')


class OngoingRideSerializer(serializers.ModelSerializer):
    
    driver_name = serializers.CharField(source='driver_id.driver_name')
    class Meta:
        model = NewRideDetail
        fields = ('rideId','passenger_name', 'start_from', 'destination', 'starting_time',
                  'expectedDriverPay', 'status', 'carpoolPercent','driver_name')

class CancelledRideSerializer(serializers.ModelSerializer):
    driver_name = serializers.CharField(source='driver_id.driver_name')
    class Meta:
        model = NewRideDetail
        fields = ('rideId', 'passenger_name', 'start_from',
                  'destination', 'status','driver_name')
    
# class DriverDashboardSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Earning
#         fields = ('driver_id','total_earnings','total_rides')



class DailyTotalsSerializer(serializers.Serializer):
    date = serializers.DateField()
    total_rides = serializers.IntegerField()
    total_earnings = serializers.FloatField()

class DriverDataSerializer(serializers.Serializer):
    driver_id = serializers.CharField()
    driver_name = serializers.CharField()
    total_rides = serializers.IntegerField()
    total_earnings = serializers.FloatField()


class AdminDashboardSerializer(serializers.Serializer):
    drivers = serializers.DictField()
    daily_totals = serializers.DictField()
    max_rides_day = serializers.CharField()  # Add this field
    max_rides_driver = serializers.DictField()
    def to_representation(self, instance):
        # Override the to_representation method to include the max_rides_day field

        # Get the serialized data from the parent serializer
        data = super().to_representation(instance)

        # Add the max_rides_day field
        data['max_rides_day'] = instance['max_rides_day']

        return data

class DriverDashboardSerializer(serializers.Serializer):
    driver_id = serializers.CharField()
    driver_name = serializers.CharField()
    total_rides = serializers.IntegerField()
    total_earnings = serializers.FloatField()
    daily_totals = DailyTotalsSerializer(many=True)

class NewRideDetailSerializer(serializers.ModelSerializer):
    driver = DriverSerializer()  # Assuming you have a NewDriverSerializer

    class Meta:
        model = NewRideDetail
        fields = ('rideId', 'passenger_name', 'start_from', 'destination', 'requested_time', 'status', 'driver')