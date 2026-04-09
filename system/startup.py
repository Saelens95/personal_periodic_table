import time

def authenticate():
    print("\nInitializing...\n")
    time.sleep(2)

    user_name = input('USERNAME: ')
    user_pass = input('PASSCODE: ')

    if user_name == "youthL" and user_pass == "fatBoy7926":
        print("\nWelcome, sir.\n")
        time.sleep(2)
        return True
    
    print("Access denied.")
    return False
