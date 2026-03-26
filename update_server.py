# import pyautogui
# import time

# # safety pause before automation starts
# time.sleep(3)

# # open Start menu (Windows key)
# pyautogui.press('win')
# time.sleep(1)

# # type cmd
# pyautogui.write('cmd', interval=0.1)
# time.sleep(1)

# # open Command Prompt
# pyautogui.press('enter')
# time.sleep(2)

# # type command
# pyautogui.write('cd Downloads')
# pyautogui.press('enter')
# pyautogui.write('ssh -i "staWro.pem" ubuntu@ec2-3-235-48-168.compute-1.amazonaws.com')
# pyautogui.press('enter')
# pyautogui.write('sudo su')
# pyautogui.press('enter')
# pyautogui.write('cd sta_backend')
# pyautogui.press('enter')
# pyautogui.write('git pull origin main')
# pyautogui.press('enter')
# pyautogui.write('pm2 restart all')
# pyautogui.press('enter')
# pyautogui.write('pm2 logs')
# pyautogui.press('enter')










import pyautogui
import time

def type_and_enter(text, delay=0.5):
    pyautogui.write(text, interval=0.05)
    pyautogui.press('enter')
    time.sleep(delay)

time.sleep(3)

# Open CMD
pyautogui.press('win')
time.sleep(1)
pyautogui.write('cmd', interval=0.1)
time.sleep(1)
pyautogui.press('enter')
time.sleep(2)

# Go to Downloads
type_and_enter('cd Downloads')

servers = [
    'ssh -i "staWro.pem" ubuntu@ec2-13-62-50-230.eu-north-1.compute.amazonaws.com',
    'ssh -i "staWro.pem" ubuntu@ec2-13-62-231-214.eu-north-1.compute.amazonaws.com'
]

for server in servers:
    type_and_enter(server, delay=5)

    type_and_enter('sudo su', delay=1)
    type_and_enter('cd sta_backend', delay=1)
    type_and_enter('rm -r server.js', delay=1)
    type_and_enter('nano server.js', delay=2)
    pyautogui.hotkey('ctrl', 'v')
    # 🔥 NOW MANUALLY PASTE YOUR CODE HERE
    # 👉 After nano opens:
    # Press RIGHT CLICK or CTRL + SHIFT + V
    # Paste your server.js code
    # Then save:
    # CTRL + O → ENTER → CTRL + X
    time.sleep(5)
    pyautogui.hotkey('enter')

    time.sleep(30)  # ⏳ give yourself time to paste manually
    pyautogui.hotkey('ctrl', 's')
    pyautogui.hotkey('ctrl', 'x')

    type_and_enter('pm2 restart all', delay=10)
    type_and_enter('exit', delay=5)
    type_and_enter('exit', delay=5)