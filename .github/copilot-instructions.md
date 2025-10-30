# REST API Project Instructions

This document provides essential information for AI agents working with this REST API project.

## Project Architecture

This is a Node.js-based REST API project with the following major components:

- Express.js web server (`mongodb.js`)
- Basic HTTP server (`server.js`)
- MongoDB integration for data persistence

### Key Files and Their Purposes

- `mongodb.js`: Main application file containing:
  - MongoDB connection setup
  - Express server configuration
  - Student data model schema
  - API routes
- `server.js`: Basic HTTP server implementation
- `package.json`: Project dependencies and scripts

## Development Setup

### Dependencies
The project uses:
- Express.js (^5.1.0) for REST API implementation
- Mongoose for MongoDB interaction
- Node.js HTTP module

### Local Development
1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

## Data Models

### Student Model
Located in `mongodb.js`, the Student schema includes:
```javascript
{
    name: String,
    usn: String,
    email: String,
    isRegistered: Boolean,
    contact: Number
}
```

## Server Configuration

- MongoDB server runs on Atlas cloud platform
- Express API server runs on port 4000
- Basic HTTP server runs on port 3000

## Coding Patterns

### MongoDB Connection
Always use the following pattern for database connections:
```javascript
mongoose.connect(connectDB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))
```

### Route Handlers
Follow the Express.js route handler pattern:
```javascript
app.get('/', (req, res) => {
    res.send("response")
    console.log("route accessed");
})
```

## Integration Points
- MongoDB Atlas for database (connection string in `mongodb.js`)
- HTTP interfaces on ports 3000 and 4000