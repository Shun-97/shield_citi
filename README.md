### InvESG by Team S.H.I.E.L.D.

MEMBERS:
Joel Seah Shang Hong
Lee Shun Hui
Leo Chong Rui, Brayden
Rohan Manoj Kuruvilla
Varunesh Balamuniappan
### Getting started
You need to have certain tools and packages installed in order to run the application.

Following the steps below from the prerequisites till the end of the installation guide is necessary in order for the application to run smoothly.

### Prerequisites
- Python 3.9 or later (https://www.python.org/downloads/)
- WampServer (https://www.wampserver.com/en/)
- Node.js (https://nodejs.org/en/download/)
- Visual Studio Code (https://code.visualstudio.com/download)

### Setting up

Setting up the local database
1. Start up WampServer
2. Launch your browser, type localhost/phpmyadmin in the address bar.
3. Enter the username: root, leave the password field blank and login.
4. Click on "Import" located on the top navigation bar, choose file and locate the .sql files. Click "Go" to execute the SQL statement.

Installing the necessary packages
1. Open Visual Studio Code
2. Click on "File" > "Open Folder" and locate the shield_citi folder, and open it.
3. Click on Terminal > New Terminal. In the Terminal, ensure you are in the same folder as the requirements.txt, type: "pip install -r requirements.txt"

### How to run the application
Running the application locally
1. Start up WampServer
2. Open Visual Studio Code, then open the LMS folder.
3. Open a new terminal (Terminal > New Terminal) within VS code.
4. Within the terminal, navigate to backend/microservice or backend/complexmicroservice folder , then type python <any file name>.py to start the backend server.
5. Now navigate to the shield_citi folder in the terminal, then type "npm start" to start the Node.js server which will host your frontend.
6. If you have problem starting up the Node.js server. Type "npm install" in the terminal and try again. Make sure you are in the shield_citi folder

### PRESENTATION DECK URL

URL : https://docs.google.com/presentation/d/16fbAEHExZjlt4-oDwTSMSIqC5U-QkvhE/edit?usp=sharing&ouid=117177132329753680289&rtpof=true&sd=true