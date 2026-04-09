# Basic electric circuit formulae for applied physics

def ohms_law(V=None, I=None, R=None):

    """

    Ohm's Law: V = I * R
    You can provide any two values tp calc. the third

    Usage:
    - ohws_law(V=5, R=10) --> returns I
    - ohws_law(I=0.5, R=10) --> returns V
    
    """

    if V is None:
        return I * R
    elif I is None:
        return V / R
    elif R is None:
        return V / I
    else:
        raise ValueError("Provide only two of V, I, R to calc. the third")
    
def power(V=None, I=None, R=None):

    """
    
    Electrical Power formulae:
    - P = V * I
    - P = I^2 * R
    - P = V^2 / R
    
    Provide two known variables to calc. P
    
    """

    if V is not None and R is not None:
        return V * I
    elif I is not None and R is not None:
        return I**2 * R
    elif V is not None and R is not None:
        return V**2 / R
    else:
        raise ValueError("Provide enough variables to calc. power.")
        
def capacitor_energy(C, V):

    """
    energy stored in a capacitor: E = 0.5 * C * V^2
    C = Capacitance in Farads
    V = Voltage in Volts
    
    """

    return 0.5 * C * V**2

def series_resistance(*resistors):

    """
    
    Total resistance for resistors in series: R_total = R1 + R2 + ...
    
    """

    return sum(resistors)

    
def parallel_resistance(resistors):

    """
    Total resistance for resistors in parallel: 1/R1 + 1/R2 + ...
    
    """

    inv_total = sum(1 / r for r in resistors)
    if inv_total == 0:
        return float('inf')
    
    return 1 / inv_total