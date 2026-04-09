from modes.philosophy_mode import handle_philosophy
from modes.physics_mode import handle_physics
from system.startup import authenticate
import time
import random
from tools.open_periodic_table import open_periodic_table

boot_lines = [
    "Locating personal preferences...",
    "Accessing stored profile...",
    "Reconstructing context..."
]

def detect_mode(user_input):

    physics_keywords = [
        "speed", "rpm", "engine", "experiment",
        "velocity", "acceleration", "position", "physics",
        "engineering", "calculate", "force", "energy", "voltage", 
        "current", "resistor", "distance", "time", "mass", "gravity",
        "spacetime","quantum", "mechanics", "wavefunction", "eigenvector", "eigenvalue", 
        "newton", "einstein", "planck"
        ]
    
    
    input_lower = user_input.lower()

    for word in physics_keywords:
        if word in input_lower:
            return "physics"
        
    return "philosophy"
    

def main():

    if not authenticate():
        return
    

    print(random.choice(boot_lines))
    time.sleep(2)
    print("\nProfile loaded.\n")
    time.sleep(1)
    print("\nI am now online and awaiting input.\n\n")

    while True:

        user_input = input(">>")

        if user_input.lower() in ["exit", "quit"]:
            print("\nShutting down for now.\n")
            break

        mode = detect_mode(user_input)

        if mode == "physics":
            response = handle_physics(user_input)
        else:
            response = handle_philosophy(user_input)

        print("\n", response, "\n")

if __name__ == "__main__":
    main() 
