## Wolfchatter - Real-Time Map-Based Chat Application

#### This project is a real-time chat application where users can click on a map to create pins, start conversations at pinned locations, and send messages in real time. The tech stack includes Angular for the frontend, Node.js for the backend, PostgreSQL for data storage, and Socket.IO for real-time communication.

**Prerequisites**

Ensure you have the following installed on your system:
- Node.js (v18 or later)
- NPM (Comes with Node.js)
- Docker (for Docker Compose setup)
- Docker Compose (comes with Docker)

**Project Setup**

1. Clone the Repository

```
git clone https://github.com/yourusername/wolfchatter.git
cd wolfchatter
```

2. Install Dependencies

Backend Dependencies

```
cd backend
npm install
```
Frontend Dependencies

```
cd ../frontend
npm install
```

**Running the Application**

Normal Approach (Manual Setup)

1. Start the PostgreSQL Database

You will need to have PostgreSQL running on your local machine or set up a cloud-based instance (like AWS RDS).

PostgreSQL Configuration:

- User: postgres
- Password: password
- Database: wolfchatter
- Host: localhost
- Port: 5432
- Ensure the database and tables are created before running the backend (if not, the backend script will handle table creation).

2. Start the Backend

```
cd backend
npm start
```

The backend server will start at http://localhost:4000.

3. Start the Frontend

```
cd frontend
npm start
```

The frontend app will be available at http://localhost:4200.

Now, both the frontend and backend are running locally. You can open your browser and navigate to http://localhost:4200 to start using the app.


Docker Compose Approach

```
docker-compose up --build
```