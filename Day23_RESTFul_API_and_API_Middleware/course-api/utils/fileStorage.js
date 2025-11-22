const fs = require('fs').promises;
const path = require('path');

const dataDir = path.join(__dirname, '../data');
const coursesFile = path.join(dataDir, 'courses.json');

// Ensure data directory exists
const ensureDataDir = async () => {
    try {
        await fs.access(dataDir);
    } catch (error) {
        await fs.mkdir(dataDir, { recursive: true });
    }
};

// Read courses from file
const readCourses = async () => {
    try {
        await ensureDataDir();
        const data = await fs.readFile(coursesFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return empty array
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
};

// Write courses to file
const writeCourses = async (courses) => {
    await ensureDataDir();
    await fs.writeFile(coursesFile, JSON.stringify(courses, null, 2), 'utf8');
};

// Generate new ID
const generateNewId = (courses) => {
    if (courses.length === 0) return 1;
    const maxId = Math.max(...courses.map(course => course.id));
    return maxId + 1;
};

module.exports = {
    readCourses,
    writeCourses,
    generateNewId
};