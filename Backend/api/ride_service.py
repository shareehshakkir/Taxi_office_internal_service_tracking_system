import random
from .models import NewDriver, NewRideDetail

def assign_driver_to_ride(ride_id):
    # Step 1: Retrieve the ride instance
    ride = NewRideDetail.objects.get(rideId=ride_id)
  

    while True:
        # Step 2: Retrieve list of available drivers
        available_drivers = NewDriver.objects.filter(driver_status="available")
        

        if available_drivers.exists():
            # Step 3: Select a random driver from the available drivers
            driver = random.choice(available_drivers)
            # print(driver)
            
            # ride.driver_id = driver
            # ride.status = "accepted"
            # print(ride.driver_id)
            
            # ride.save()
            return driver
        else:
            # Step 4: No more available drivers, exit the loop without assigning the ride
            # ride.status = "unassigned"
            # ride.save()
            return 0

