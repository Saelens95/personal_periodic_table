import math


# Classical Phyiscs Formulae
# -----------------------------------


# FIND FORCE
def force(mass, acceleration):
    return mass * acceleration


# FIND VELOCITY
def velocity(distance, time):
    return distance / time

# FIND ACCELERATION
def acceleration(change_velocity, time):
    return change_velocity / time

# FIND POTENTIAL ENERGY
def potential_energy(m, h, g=9.81):
    """Gravitational potential energy: PED = m * g * h
    m = mass (kg)
    g = gravitational acceleration
    h = height (m)
    
    """

    return m * g * h

# FIND KINETIC ENERGY
def kinetic_energy(mass, velocity):
    return 0.5 * mass * velocity**2


# KINEMATIC EQ 1
def kinematic_eq1(v0, a, t):
    """
    Basic kinematic equation: v = vo + a * t
    v0 = init. velocity (m/s)
    a = acceleration (m/s^2)
    t = time (s)
    v = final velocity (m/s)

    """

    return v0 + a * t

# KINEMATIC EQN 2
def kinematic_eq2(v0, a, t):
    """
    Pos.: s = v0*t + 0.5*a*t^2
    v0 = init. velocity (m/s)
    a = acceleration (m/s^2)
    t = time (s)

    """

    return v0 *t + 0.5 * a * t**2


# FIND GRAVITATIONAL FORCE
def gravitational_force(m1, m2, r, G=6.67430e-11):
    """

    Newton's Law of Universal Gravitation: F = G*m1*m2/r^2
    m1, m2 = masses (kg)
    r = distance between masses (m)
    G = Gravitational Constant
    
    """

    return G * m1 * m2 / r**2

# ----------------------------------------------