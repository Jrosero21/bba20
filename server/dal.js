const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGO_URL || 'mongodb://db:27017/myproject';  // Ensure 'db' is the service name
let db = null;

// Connect to MongoDB
async function connectToDb() {
    if (db) {
        return db;
    }
    try {
        const client = await MongoClient.connect(url);  // Removed useUnifiedTopology
        console.log("Connected successfully to MongoDB server");
        db = client.db('myproject');
        return db;
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        throw err;
    }
}

// Create user account
async function create(name, email, password) {
    try {
        const db = await connectToDb();
        const collection = db.collection('users');  // Use your collection name here
        const doc = { name, email, password, balance: 0 };
        await collection.insertOne(doc);
        console.log("User created:", doc);
        return doc;
    } catch (err) {
        console.error("Error creating user:", err);
        throw err;  // Ensure errors are propagated
    }
}

// Find user account
async function find(email) {
    try {
        const db = await connectToDb();
        const customers = await db.collection('users').find({ email }).toArray();
        return customers;
    } catch (err) {
        throw err;
    }
}


// Find one user by email
async function findOne(email) {
    try {
        const db = await connectToDb();
        const customer = await db.collection('users').findOne({ email });
        console.log("User found:", customer);
        return customer;
    } catch (err) {
        console.error("Error finding one user:", err);
        throw err;  // Ensure errors are propagated
    }
}

/// Update amount (deposit/withdraw)
async function update(email, amount) {
    try {
        const db = await connectToDb();

        // Normalize the email to lowercase for consistent querying
        const normalizedEmail = email.toLowerCase();

        console.log(`Querying for user with email: ${normalizedEmail}`);

        // Check if the user exists before updating
        const existingUser = await db.collection('users').findOne({ email: normalizedEmail });
        
        if (!existingUser) {
            console.error(`User with email ${normalizedEmail} not found`);
            throw new Error('User not found');
        }

        console.log(`User found: ${JSON.stringify(existingUser)}`);

        // Proceed with updating the balance
        const updateResult = await db.collection('users').findOneAndUpdate(
            { email: normalizedEmail },
            { $inc: { balance: amount } },
            {
                returnDocument: 'after',  // Correct option for MongoDB >= 4.x
                upsert: false  // Prevent creation of a new document if the user doesn't exist
            }
        );

        // Check if the update result has a value (the updated document)
        if (!updateResult.value) {
            console.log("findOneAndUpdate did not return the updated user. Fetching the user manually...");
            // Fallback: Fetch the updated user manually
            const updatedUser = await db.collection('users').findOne({ email: normalizedEmail });

            if (!updatedUser) {
                throw new Error('Failed to retrieve updated user after update');
            }

            console.log("User updated (fallback):", updatedUser);
            return updatedUser;  // Return the updated user object with the new balance
        }

        console.log("User updated:", updateResult.value);
        return updateResult.value;  // Return the updated user object with the new balance

    } catch (err) {
        console.error("Error updating user balance:", err);
        throw err;  // Ensure errors are propagated
    }
}


// Get all users
async function all() {
    try {
        const db = await connectToDb();
        const customers = await db.collection('users').find({}).toArray();
        console.log("All users:", customers);
        return customers;
    } catch (err) {
        console.error("Error retrieving all users:", err);
        throw err;  // Ensure errors are propagated
    }
}

module.exports = { connectToDb, create, findOne, find, update, all };
