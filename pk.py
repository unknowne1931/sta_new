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

# safety pause
time.sleep(3)

# open CMD
pyautogui.press('win')
time.sleep(1)
pyautogui.write('cmd', interval=0.1)
time.sleep(1)
pyautogui.press('enter')
time.sleep(2)

# go to Downloads
type_and_enter('cd Downloads')

# SSH targets (ADD MORE HERE)
servers = [
    'ssh -i "staWro.pem" ubuntu@ec2-3-235-48-168.compute-1.amazonaws.com',
    'ssh -i "staWro.pem" ubuntu@ec2-3-80-143-168.compute-1.amazonaws.com',
    'ssh -i "staWro.pem" ubuntu@ec2-54-226-44-181.compute-1.amazonaws.com',
    'ssh -i "staWro.pem" ubuntu@ec2-54-227-42-233.compute-1.amazonaws.com',
    'ssh -i "staWro.pem" ubuntu@ec2-3-236-82-166.compute-1.amazonaws.com',
    'ssh -i "staWro.pem" ubuntu@ec2-98-92-98-34.compute-1.amazonaws.com',
    'ssh -i "staWro.pem" ubuntu@ec2-3-234-214-34.compute-1.amazonaws.com',
    'ssh -i "staWro.pem" ubuntu@ec2-44-192-71-70.compute-1.amazonaws.com'
]

for server in servers:
    type_and_enter(server, delay=5)   # wait for SSH login

    type_and_enter('sudo su', delay=1)
    type_and_enter('cd sta_backend', delay=1)
    type_and_enter('git pull origin main', delay=2)
    type_and_enter('pm2 restart all', delay=2)
    type_and_enter('exit', delay=1)   # exit root
    type_and_enter('exit', delay=2)   # exit SSH
