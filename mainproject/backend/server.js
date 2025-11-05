import express from 'express';
import cors from 'cors';
import {MongoClient} from 'mongodb';

const app = express();
app.use(cors());  //Enable Cross Origin
app.use(express.json()); //Enable JSON for transactions

const url = "mongodb+srv://admin:admin@cluster0.6etqpna.mongodb.net/?appName=Cluster0";
const dbName = "erp";
const client = new MongoClient(url); //Object for MongoDB

let db;

// Connect to MongoDB once when server starts
async function connectDB() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1); // Exit if DB connection fails
    }
}

connectDB();

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Testing service
app.get("/", (req, res) => {
    res.status(200).json("Hello World from Express JS");
});

// SIGN UP OPERATION
app.post("/signup", async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json("Request body is empty");
        }

        await db.collection("users").insertOne(req.body);
        res.status(200).json("Registered Successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
});


//LOGIN OPERATION
// LOGIN OPERATION
app.post("/login", async (req, res) => {
    try {
        const user = await db.collection("users").findOne({
            email: req.body.email,
            password: req.body.password
        });

        if (!user)
            return res.status(200).json("301::Invalid Credentials!");

        res.status(200).json("300::Login Success");
    } catch (err) {
        console.error(err);
        res.status(500).json("500::Internal Server Error");
    }
});

// FETCH USER'S FULL NAME
app.post("/getfullname", async (req, res) => {
    try {
        const user = await db.collection("users").findOne({ email: req.body.email });
        if (!user)
            return res.status(200).json("301::Invalid User!");

        const menus = [
            { mid: "M001", mtitle: "Users", micon: "user.png" },
            { mid: "M002", mtitle: "My Profile", micon: "profile.png" },
            { mid: "M003", mtitle: "Settings", micon: "settings.png" },
        ];

        res.status(200).json({
            user,
            menus: [
                { mid: "M001", mtitle: "Users", micon: "user.png" },
                { mid: "M002", mtitle: "My Profile", micon: "profile.png" },
                { mid: "M003", mtitle: "Settings", micon: "settings.png" }
            ]
        });
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
});


// mongodb+srv://admin:admin@cluster0.tbdmmt7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://admin:<db_password>@cluster0.j4wmui3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0