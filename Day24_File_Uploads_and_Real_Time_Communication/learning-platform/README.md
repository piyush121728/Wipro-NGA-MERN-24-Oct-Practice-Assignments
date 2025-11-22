# Learning Platform 🎓

A modern web application for educational institutions featuring file uploads, course materials management, and real-time chat functionality between students and instructors.

![Learning Platform](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)
![Socket.io](https://img.shields.io/badge/Socket.io-4.x-orange.svg)

## ✨ Features

### 📁 File Management
- **Secure File Uploads** - Upload course materials (PDF, DOC, DOCX, PPT, PPTX, TXT)
- **File Validation** - Type checking and size limits (10MB max)
- **Materials Library** - Organized view of all course materials
- **One-Click Downloads** - Easy access to learning resources
- **File Management** - Delete unwanted materials

### 💬 Real-Time Communication
- **Live Chat Rooms** - Course-specific chat channels
- **User Roles** - Distinct styling for students and instructors
- **Typing Indicators** - See when others are typing
- **Instant Messaging** - Real-time message delivery
- **Multiple Rooms** - Separate spaces for different courses

### 🎨 Modern UI/UX
- **Bootstrap 5** - Responsive, mobile-first design
- **Professional Styling** - Clean, educational-themed interface
- **Interactive Elements** - Smooth animations and transitions
- **Accessibility** - Proper contrast and keyboard navigation

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. **Clone or download the project**
```bash
git clone <repository-url>
cd learning-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Access the application**
```
Open http://localhost:3000 in your browser
```

### Production Deployment
```bash
npm start
```

## 📁 Project Structure

```
learning-platform/
├── server.js                 # Main server file
├── package.json             # Dependencies and scripts
├── uploads/                 # File storage directory
│   └── (uploaded files)
└── public/                  # Frontend assets
    ├── index.html           # Main application page
    ├── app.js               # Client-side JavaScript
    ├── styles/
    │   └── custom.css       # Custom styles
    └── assets/              # Images and icons
```

## 🛠️ Technology Stack

### Backend
- **Express.js** - Web framework
- **Multer** - File upload middleware
- **Socket.io** - Real-time communication
- **Node.js** - Runtime environment

### Frontend
- **Bootstrap 5** - CSS framework
- **Socket.io Client** - Real-time client library
- **Vanilla JavaScript** - Client-side logic
- **Bootstrap Icons** - Icon library

## 📋 API Endpoints

### File Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/upload` | Upload course materials |
| `GET` | `/api/materials` | Get list of all materials |
| `DELETE` | `/api/materials/:filename` | Delete specific file |
| `GET` | `/materials/:filename` | Download file |

### WebSocket Events
| Event | Direction | Description |
|-------|-----------|-------------|
| `join_course` | Client → Server | Join a chat room |
| `send_message` | Client → Server | Send chat message |
| `new_message` | Server → Client | Receive new message |
| `typing_start` | Client → Server | Start typing indicator |
| `typing_stop` | Client → Server | Stop typing indicator |
| `user_joined` | Server → Client | User joined notification |
| `user_left` | Server → Client | User left notification |

## 🧪 Testing Guide

### Manual Testing Checklist

#### File Upload Features
- [ ] Upload PDF file (should work ✅)
- [ ] Upload DOC/DOCX file (should work ✅)
- [ ] Upload image file (should fail ❌)
- [ ] Upload file >10MB (should fail ❌)
- [ ] Upload without selecting file (should warn ❌)

#### Materials Management
- [ ] View materials list after upload
- [ ] Download uploaded files
- [ ] Delete files with confirmation
- [ ] Refresh materials list

#### Real-Time Chat
- [ ] Join chat room with user credentials
- [ ] Send and receive messages instantly
- [ ] See typing indicators
- [ ] Test multiple chat rooms
- [ ] Verify user join/leave notifications

### Multi-User Testing
1. **Open multiple browser windows**
2. **Join the same course with different users**
3. **Test real-time message synchronization**
4. **Verify typing indicators work across clients**

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## ⚙️ Configuration

### Environment Variables
Create a `.env` file for configuration:

```env
PORT=3000
NODE_ENV=development
UPLOAD_LIMIT=10MB
ALLOWED_FILE_TYPES=.pdf,.doc,.docx,.txt,.ppt,.pptx
```

### File Upload Settings
- **Max File Size**: 10MB
- **Allowed Types**: PDF, DOC, DOCX, PPT, PPTX, TXT
- **Storage**: Local file system (`/uploads`)

## 🔒 Security Features

- **File Type Validation** - Prevents malicious uploads
- **Filename Sanitization** - Prevents path traversal attacks
- **Size Limits** - Prevents DoS attacks
- **Input Validation** - Client and server-side checks
- **CORS Configuration** - Controlled cross-origin requests

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📞 Support

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process using port 3000
   npx kill-port 3000
   ```

2. **File upload fails**
   - Check file type and size
   - Verify uploads directory permissions

3. **Chat not working**
   - Check WebSocket connection in browser console
   - Verify Socket.io server is running

### Debugging
Enable debug mode by checking browser console for:
- Socket connection status
- Network request errors
- JavaScript exceptions

## 🎯 Usage Examples

### For Instructors
1. Upload course syllabus and materials
2. Create chat rooms for each course
3. Communicate with students in real-time
4. Manage course content

### For Students
1. Download learning materials
2. Join course-specific chat rooms
3. Ask questions and get instant responses
4. Collaborate with peers

## 🔄 Future Enhancements

- [ ] User authentication and authorization
- [ ] Database integration for persistence
- [ ] File categorization and search
- [ ] Message history storage
- [ ] File preview functionality
- [ ] Cloud storage integration (AWS S3, Azure Blob)
- [ ] Mobile app development
- [ ] Video conferencing integration

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Bootstrap team for the excellent CSS framework
- Socket.io for real-time communication capabilities
- Express.js and Node.js communities

---

**Happy Learning!** 🎉

For questions or support, please check the debugging section or create an issue in the project repository.