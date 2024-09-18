FindYourItem
FindYourItem is a web application designed to help users report lost and found items. Users can submit reports about items they've lost or found and view items reported by others. The application features user authentication and session management to ensure that only logged-in users can submit reports.

Table of Contents
Features
Technologies Used
Installation
Usage
Folder Structure
Contributing
License
Features
User Authentication: Users must sign up and log in to submit reports.
Submit Reports: Report lost or found items, including descriptions and images.
View Reports: Browse items reported as lost or found.
Search Functionality: Search for items by name.
Session Management: Users remain logged in until they log out.
Technologies Used
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express
Database: MySQL
File Uploads: Multer
Authentication: BcryptJS
Session Management: Express-Session
Installation
To get started with FindYourItem, follow these steps:

Clone the Repository:

bash
Copy code
git clone https://github.com/yourusername/findyouritems.git
Navigate to the Project Directory:

bash
Copy code
cd findyouritems
Install Dependencies:

bash
Copy code
npm install
Set Up the Database:

Create a MySQL database named findyouritem and set up the necessary tables. You can use the SQL schema provided in the database folder.

Configure Environment Variables:

Create a .env file in the root directory and add the following environment variables:

makefile
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=findyouritem
SESSION_SECRET=your_secret_key
Run the Application:

bash
Copy code
npm start
Access the Application:

Open your browser and navigate to http://localhost:3000.

Usage
Sign Up: Create an account by visiting the signup page.
Log In: Access the login page and enter your credentials.
Submit a Report: Navigate to the report pages to submit lost or found items.
View Reports: Browse the home page to view reported items and use the search functionality to find specific items.
Folder Structure
public/ – Contains static files (HTML, CSS, JS)
index.html – Home page
login.html – Login page
signup.html – Signup page
lost-report.html – Lost item report form
found-item.html – Found item report form
styles.css – CSS styles
uploads/ – Directory for uploaded images
app.js – Main server file
package.json – Project dependencies and scripts
README.md – This file
Contributing
Feel free to submit issues or pull requests if you have suggestions or improvements. Please ensure that your changes do not break existing functionality.

License
This project is licensed under the MIT License. See the LICENSE file for details.
