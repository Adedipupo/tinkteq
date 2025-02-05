
markdown
# TinkTeq - Real-Time Order Tracking API

This project implements an Express.js API for real-time order tracking using MongoDB for storage and Socket.IO for real-time updates.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or via a cloud service like MongoDB Atlas)

## Installation

1. **Clone the repository:**

   ```bash
   git clone [your-repository-url]
   cd tinkteq

Install dependencies:

[npm install]

Set up environment variables:

Create a .env file in the root directory of your project:

[MONGODB_URI]
[PORT]

Running the Application

Development Mode
To run the server in development mode with auto-restart on file changes:

bash
[npm run dev]

Production Mode
For production, start the server with:

bash
[npm start]

Project Structure
app.js: Main application file that sets up Express, connects to MongoDB, and initializes Socket.IO.
controller/: Contains controller logic for handling order operations.
model/: Defines the Mongoose schemas for the database models.
routes/: Defines the API routes.
socket/: Manages real-time communication with Socket.IO.


API Endpoints
POST /api/v1/order/create - Create a new order
GET /api/v1/order/:id - Retrieve an order by ID
PATCH /api/v1/order/:id - Update an order status

Testing with HTML
To test the real-time functionality:

Ensure your server is running on port you've configured.

Place your HTML file in the public directory:

Copy the provided HTML file into the public folder or ensure your server can serve it from where it's located.

Open the HTML in a browser:
Navigate to http://localhost:${PORT}/test_socket.html (assuming your HTML file is named test_socket.html).

Testing Steps:
Subscribe to an Order: Click the "Subscribe to Order" button and enter an order ID (you'll get this from the API response when you create an order or from the database).

Create/Update Orders via API: Use tools like Postman or curl:

Create Order: 
curl -X POST -H "Content-Type: application/json" -d '{"orderNumber":"ORD1234"}' http://localhost:port/api/v1/order/create
Update Order: 
bash
curl -X PATCH -H "Content-Type: application/json" -d '{"status":"dispatched"}' http://localhost:port/api/v1/order/{order_id}

Check for Updates: If everything is set up correctly, you should see updates in the browser immediately after updating the order via the API.


 