// ==========================================
// MongoDB Schema Design — Online Retail Platform
// ==========================================

// Use or create database
use('onlineRetailDB');

// ------------------------------
// 1. PRODUCTS COLLECTION
// ------------------------------
db.createCollection("products");

// Sample Product Documents
db.products.insertMany([
    {
        name: "Samsung Galaxy S23",
        category: "Mobile Phones",
        description: "5G smartphone with 256GB storage and 8GB RAM",
        price: 69999,
        stock: 45,
        brand: "Samsung",
        specifications: {
            color: "Phantom Black",
            screenSize: "6.1 inches",
            battery: "3900 mAh"
        },
        createdAt: new Date("2025-02-10T10:00:00Z"),
        updatedAt: new Date("2025-03-05T14:00:00Z")
    },
    {
        name: "Men's Cotton T-Shirt",
        category: "Clothing",
        description: "Regular fit 100% cotton t-shirt",
        price: 799,
        stock: 150,
        brand: "H&M",
        specifications: {
            size: ["S", "M", "L", "XL"],
            color: "Navy Blue"
        },
        createdAt: new Date("2025-02-15T09:30:00Z"),
        updatedAt: new Date("2025-02-15T09:30:00Z")
    }
]);

// ------------------------------
// 2. USERS COLLECTION
// ------------------------------
db.createCollection("users");

// Sample User Documents
db.users.insertMany([
    {
        username: "piyush_k",
        email: "piyush@example.com",
        passwordHash: "$2b$10$Q29tQmFySGFzaFRlc3QxMjM0", // hashed password
        role: "customer",
        createdAt: new Date("2025-02-05T08:45:00Z"),
        lastLogin: new Date("2025-03-10T11:45:00Z")
    },
    {
        username: "admin_user",
        email: "admin@example.com",
        passwordHash: "$2b$10$Q29tQmFySGFzaFRlc3QxMjM0",
        role: "admin",
        createdAt: new Date("2025-01-15T08:00:00Z"),
        lastLogin: new Date("2025-03-08T09:00:00Z")
    }
]);

// ------------------------------
// 3. ORDERS COLLECTION
// ------------------------------
db.createCollection("orders");

// Get sample product and user IDs dynamically
const samsungId = db.products.findOne({ name: "Samsung Galaxy S23" })._id;
const tshirtId = db.products.findOne({ name: "Men's Cotton T-Shirt" })._id;
const userId = db.users.findOne({ username: "piyush_k" })._id;

// Sample Order Documents
db.orders.insertMany([
    {
        userId: userId,
        orderDate: new Date("2025-03-10T12:00:00Z"),
        products: [
            { productId: samsungId, quantity: 1, priceAtPurchase: 69999 },
            { productId: tshirtId, quantity: 2, priceAtPurchase: 799 }
        ],
        totalAmount: 71597,
        status: "Delivered",
        paymentMethod: "UPI",
        shippingAddress: {
            street: "221B Baker Street",
            city: "Mumbai",
            state: "Maharashtra",
            postalCode: "400001",
            country: "India"
        }
    }
]);

// ------------------------------
// 4. INDEXES
// ------------------------------
db.products.createIndex({ category: 1 });
db.products.createIndex({ name: 1 });
db.orders.createIndex({ userId: 1 });
db.users.createIndex({ email: 1 }, { unique: true });

// ------------------------------
// 5. SAMPLE QUERIES
// ------------------------------

// a) Retrieve all products in a category
print("---- Products in 'Mobile Phones' category ----");
printjson(db.products.find({ category: "Mobile Phones" }).toArray());

// b) Find product by name (case-insensitive)
print("---- Search for Samsung products ----");
printjson(db.products.find({ name: /Samsung/i }).toArray());

// c) Retrieve all orders for a specific user
print("---- Orders for user 'piyush_k' ----");
printjson(db.orders.find({ userId: userId }).toArray());

// d) Find all users registered after a specific date
print("---- Users registered after Feb 1, 2025 ----");
printjson(db.users.find({ createdAt: { $gte: new Date("2025-02-01") } }).toArray());

// e) Retrieve orders with product details using aggregation
print("---- Orders with Product Details ----");
printjson(
    db.orders.aggregate([
        { $match: { userId: userId } },
        {
            $lookup: {
                from: "products",
                localField: "products.productId",
                foreignField: "_id",
                as: "productDetails"
            }
        }
    ]).toArray()
);

print("MongoDB setup complete. Collections created, sample data inserted, and queries executed successfully.");



