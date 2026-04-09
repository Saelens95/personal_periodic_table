import re

from tools.classical_physics_eqns import*
from tools.electric_circuit_eqns import*
from knowledge_system.knowledge_loader import load_knowledge
from knowledge_system.knowledge_search import search_knowledge
from tools.applied_physics.automotive import calculate_kart_speed, wheel_speed_from_rpm
from tools.open_periodic_table import open_periodic_table
physics_knowledge = load_knowledge("knowledge/physics")


# TOOL MAP
tool_map = {
    "ohms_law": ohms_law,
    "power": power,
    "force": force,
    "velocity": velocity,
    "acceleration": acceleration,
    "kinetic_energy": kinetic_energy,
    "potential_energy": potential_energy,
    }

# NUMBER EXTRACTION
def extract_numbers(text):
    nums = re.findall("r[-+]?\d*\.\d+|\d+", text)
    return [float(n) for n in nums]

# CALCULATION DETECTION
def detect_calculation(text):
    text = text.lower()

    # Electronics
    if any(k in text for k in ["ohm", "resistor", "voltage", "current"]):
        return "ohms_law"
    
    if any(k in text for k in ["power", "watt"]):
        return "power"
    
    # Classical Physics
    if any(k in text for k in ["force", "newton"]):
        return "force"
    
    if any(k in text for k in ["velocity", "speed", "magnitude", "direction"]):
        return "velocity"
    
    if any(k in text for k in ["acceleration"]):
        return "acceleration"
    
    if any(k in text for k in ["kinetic energy"]):
        return "kinetic_energy"
    
    if any(k in text for k in ["potential energy", "height"]):
        return "potential_energy"
    

# TOOL EXECUTION
def run_tool(calc_type, numbers):

    if calc_type not in tool_map:
        return "Tool not found."
    
    func = tool_map[calc_type]

    try:
        result = func(*numbers[:2])
        return f"Result: {result}"
    except Exception as e:
        return f"Error: {str(e)}"
    
    
# MAIN HANDLER
def handle_physics(user_input):

    input_lower = user_input.lower()

    # Periodic Table Trigger
    if any (k in input_lower for k in ["periodic table", "elements", "atoms"]):
       return open_periodic_table()
        

    calc_type = detect_calculation(user_input)
    numbers = extract_numbers(user_input)

    # IF IT'S A CALCULATION
    if calc_type and len(numbers) >= 2:
        return run_tool(calc_type, numbers)
    
    # OTHERWISE SEARCH KNOWLEDGE
    results = search_knowledge(user_input, physics_knowledge)

    if results:
        response = "I found this in your physics notes:\n"
        for path, content in results:
            response += f"\n--- {path} ---\n{content}\n"

        return response
    
    return "No relevant physics information found."
        

    # # Electronics / Circuits Search
    # if any(k in input for k in ["ohm", "resistor", "voltage", "current", "capacitor", "power"]):
    #     # For now just an example: return knowledge snippet if available!

    #     snippet = search_knowledge(user_input, physics_knowledge)
    #     return snippet if snippet else "Electronics concept not found in knowledge base."
    
    # # Automotive / Kinematics
    # elif any(k in input_lower for k in ["wheel", "kart", "cart","speed", "rpm", "engine", "acceleration", "steering", "crankshaft", "powerstroke"]):

    #     return "Automotive physics calculation placeholder"

    # # Classical Physics
    # else:
    #     snippet = search_knowledge(user_input, physics_knowledge)
    #     return snippet if snippet else "Physics concept not found in knowledge base."


