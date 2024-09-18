🎉 FindYourItems

FindYourItems is your go-to web application for reporting lost and found items. Whether you’ve misplaced something valuable or found an item that someone else is looking for, this app has you covered!

🌟 Features

🔐 User Authentication: Sign up, log in, and keep your reports secure.

📋 Submit Reports: Easily report lost or found items with descriptions and images.

🔍 Search Functionality: Find specific items using our search feature.

📜 View Reports: Browse through lost and found items reported by others.

🔒 Persistent Sessions: Stay logged in while you browse or submit reports.

🛠️ Technologies Used

Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express
Database: MySQL
File Uploads: Multer
Authentication: BcryptJS
Session Management: Express-Session


Visuals:
![Screenshot 2024-03-06 144003](https://github.com/user-attachments/assets/a845f6c1-99ba-45df-974a-2875e9e65371)
![Screenshot 2024-03-06 143744](https://github.com/user-attachments/assets/a72aef0b-37e5-419c-a6a1-4e5eba9bcdd0)



🚀 Installation

Get started with FindYourItem in just a few steps:

Clone the Repository:
git clone https://github.com/gauravdgreat/findyouritems.git

Navigate to the Project Directory:

cd findyouritems

Install Dependencies:

npm install

Set Up the Database:

Create a MySQL database named findyouritem and set up the necessary tables using the SQL schema provided.

Configure Environment Variables:

Create a .env file in the root directory and add the following environment variables:

dotenv
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=findyouritem
SESSION_SECRET=your_secret_key
Run the Application:
npm start
Access the Application:

Open your browser and navigate to http://localhost:3000.

💻 Usage
Sign Up: Head to the signup page to create your account.

Log In: Access the login page to enter your credentials.

Submit a Report: Visit the Home/index page to submit details about lost or found items.

View Reports: Browse the home page to view reported items and use the search feature to find specific items.

📁 Folder Structure

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

🤝 Contributing

We welcome contributions! If you have suggestions or improvements, please submit issues or pull requests. Ensure that your changes don’t break existing functionality.

📝 License

This project is licensed under the MIT License. See the LICENSE file for details.

