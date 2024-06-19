from django.contrib import admin
# from .models import Driver, Ride
from .models import TaxiDetail, NewDriver, NewRideDetail, Earning

# admin.site.register(Driver)
# admin.site.register(Ride)

admin.site.register(TaxiDetail)
admin.site.register(NewDriver)
admin.site.register(NewRideDetail)
admin.site.register(Earning)