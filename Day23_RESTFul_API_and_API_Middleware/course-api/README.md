# Course Management API

A RESTful API for managing courses with built-in validation, rate limiting, and file-based persistence.

## Features

- ✅ **Full CRUD Operations** - Create, Read, Update, Delete courses
- ✅ **Input Validation** - Comprehensive validation using express-validator
- ✅ **Rate Limiting** - Protection against API abuse (5 requests/minute)
- ✅ **File-based Storage** - Data persistence using JSON files
- ✅ **RESTful Design** - Proper HTTP methods and status codes
- ✅ **Error Handling** - Centralized error handling middleware
- ✅ **API Versioning** - Versioned endpoints (/api/v1/)

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **express-validator** - Input validation
- **express-rate-limit** - Rate limiting middleware
- **File System** - JSON-based data persistence

## Project Structure

```
course-management-api/
├── data/
│   └── courses.json          # Auto-generated data file
├── middleware/
│   ├── validation.js         # Input validation rules
│   ├── errorHandler.js       # Centralized error handling
│   └── rateLimiter.js        # Rate limiting configuration
├── routes/
│   └── courses.js            # Course routes and handlers
├── utils/
│   └── fileStorage.js        # File-based storage utilities
├── server.js                 # Main application entry point
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## Installation

1. **Clone or create the project directory:**
```bash
mkdir course-management-api
cd course-management-api
```

2. **Create package.json and install dependencies:**
```bash
npm install
```

3. **Create the project structure:**
```bash
mkdir -p middleware routes utils data
```

4. **Create all the files** as described in the implementation sections.

## Quick Start

1. **Start the server:**
```bash
npm start
```

2. **Or start in development mode (with auto-restart):**
```bash
npm run dev
```

3. **The API will be available at:**
```
http://localhost:3000
```

## API Endpoints

### Health Check
- **GET** `/api/v1/health`
- **Response:** API status information

### Courses

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/courses` | Get all courses | No |
| GET | `/api/v1/courses/:id` | Get single course | No |
| POST | `/api/v1/courses` | Create new course | No |
| PUT | `/api/v1/courses/:id` | Update course | No |
| DELETE | `/api/v1/courses/:id` | Delete course | No |

## Usage Examples

### 1. Get All Courses
```bash
curl http://localhost:3000/api/v1/courses
```

### 2. Get Single Course
```bash
curl http://localhost:3000/api/v1/courses/1
```

### 3. Create a Course
```bash
curl -X POST http://localhost:3000/api/v1/courses   -H "Content-Type: application/json"   -d '{
    "name": "JavaScript Fundamentals",
    "duration": 8,
    "instructor": "John Doe",
    "price": 99.99,
    "description": "Learn JavaScript from scratch"
  }'
```

### 4. Update a Course
```bash
curl -X PUT http://localhost:3000/api/v1/courses/1   -H "Content-Type: application/json"   -d '{
    "duration": 10,
    "price": 129.99
  }'
```

### 5. Delete a Course
```bash
curl -X DELETE http://localhost:3000/api/v1/courses/1
```

## Validation Rules

### Course Creation/Update Validation:
- **name**: Required, 3-100 characters
- **duration**: Required, number between 1-52 weeks
- **instructor**: Optional, 2-50 characters
- **price**: Optional, positive number
- **description**: Optional

### Example Validation Error:
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "name",
      "message": "Course name is required",
      "value": ""
    },
    {
      "field": "duration",
      "message": "Duration must be a number between 1 and 52 weeks",
      "value": "invalid"
    }
  ]
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **General API**: 5 requests per minute per IP
- **Course Creation**: 3 requests per minute per IP

### Rate Limit Response:
```json
{
  "error": "Too many requests",
  "message": "You have exceeded the 5 requests per minute limit.",
  "retryAfter": "60 seconds"
}
```

## Testing Validation & Rate Limiting

### Test Validation:
```bash
curl -X POST http://localhost:3000/api/v1/courses   -H "Content-Type: application/json"   -d '{"duration": 8}'
```

```bash
curl -X POST http://localhost:3000/api/v1/courses   -H "Content-Type: application/json"   -d '{"name": "Test", "duration": "invalid"}'
```

### Test Rate Limiting:
```bash
for i in {1..6}; do curl -s http://localhost:3000/api/v1/courses; done
```

## Data Storage

The API uses file-based storage:

```json
[
  {
    "id": 1,
    "name": "JavaScript Fundamentals",
    "duration": 8,
    "instructor": "John Doe",
    "price": 99.99,
    "description": "Learn JavaScript from scratch",
    "createdAt": "2023-10-25T10:30:00.000Z",
    "updatedAt": "2023-10-25T10:35:00.000Z"
  }
]
```

## Error Handling

Consistent error responses:
- **400 Bad Request**
- **404 Not Found**
- **409 Conflict**
- **429 Too Many Requests**
- **500 Internal Server Error**

## Response Format

Success:
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {}
}
```

Error:
```json
{
  "success": false,
  "error": "Validation failed",
  "timestamp": "2023-10-25T10:30:00.000Z",
  "path": "/api/v1/courses"
}
```

## Production Considerations

- Replace JSON with DB
- Add authentication
- Add logging
- Add CORS
- Add env variables
- Enable HTTPS
- Add monitoring

## Troubleshooting

Common issues and fixes provided.

## License

MIT License

## Support

Happy Coding! 🚀
