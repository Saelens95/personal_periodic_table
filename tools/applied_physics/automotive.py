import math
import os


# General Automotive Functions



# OBTAIN WHEEL SPEED BASED ON RPM AND WHEEL DIAMETER
def wheel_speed_from_rpm(rpm, wheel_diameter_inches):

    wheel_circumference = math.pi * wheel_diameter_inches
    inches_per_minute = rpm * wheel_circumference
    mph = inches_per_minute / 1056

    return mph

# ESTIMATE LINEAR SPEED OF KART
# This function asumes a simple drivetrain: engine -> gear reduction -> axle -> wheel -> ground
# If we know: engine RPM, gear ratio, wheel diameter --> we can estimate linear speed
def calculate_kart_speed(rpm, gear_ratio, wheel_diameter_inches):
    wheel_diameter_m = wheel_diameter_inches * 0.0254
    wheel_circumference = math.pi * wheel_diameter_m

    wheel_rpm = rpm / gear_ratio
    meters_per_minute = wheel_rpm * wheel_circumference
    meters_per_second = meters_per_minute / 60
    mph = meters_per_second * 2.237

    return round(mph,2)

