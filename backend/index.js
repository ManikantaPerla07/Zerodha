require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // ✅ Fix: Correct package name
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

if (!uri) {
    console.error("❌ MONGO_URL not set in .env");
    process.exit(1);
}

const app = express();

// ✅ Fix: use() instead of use*()
app.use(cors());
app.use(bodyParser.json());

app.get('/addHoldings', async (req, res) => {
    const tempHoldings = [
        { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
        { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
        { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%" },
        { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
        { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
        { name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
        { name: "M&M", qty: 2, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%", isLoss: true },
        { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
        { name: "SBIN", qty: 4, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%", isLoss: true },
        { name: "SGBMAY29", qty: 2, avg: 4727.0, price: 4719.0, net: "-0.17%", day: "+0.15%" },
        { name: "TATAPOWER", qty: 5, avg: 104.2, price: 124.15, net: "+19.15%", day: "-0.24%", isLoss: true },
        { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%", isLoss: true },
        { name: "WIPRO", qty: 4, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%" }
    ];

    try {
        await HoldingsModel.insertMany(tempHoldings);
        res.send("✅ Holdings added successfully!");
    } catch (err) {
        console.error("❌ Error adding holdings:", err);
        res.status(500).send("Error adding holdings");
    }
});

app.get("/addPositions", async (req, res) => {
    const tempPositions = [
        {
            Product: "CNC",
            name: "INFY",
            qty: 10,
            avg: 1550.5,
            price: 1575.3,
            net: "+247.00",
            day: "+1.61%",
            isLoss: false
        },
        {
            Product: "MIS",
            name: "TCS",
            qty: 5,
            avg: 3200.0,
            price: 3190.0,
            net: "-50.00",
            day: "-0.31%",
            isLoss: true
        }
    ];

    try {
        await PositionsModel.insertMany(tempPositions);
        res.send("✅ Positions added successfully!");
    } catch (err) {
        console.error("❌ Error adding positions:", err);
        res.status(500).send("Error adding positions");
    }
});

app.get("/addOrders", async (req, res) => {
    const tempOrders = [
        {
            name: "INFY",
            qty: 5,
            price: 1575.3,
            mode: "BUY"
        },
        {
            name: "TCS",
            qty: 5,
            price: 3190.0,
            mode: "SELL"
        }
    ];

    try {
        await OrdersModel.insertMany(tempOrders);
        res.send("✅ Orders added successfully!");
    } catch (err) {
        console.error("❌ Error adding orders:", err);
        res.status(500).send("Error adding orders");
    }
});

app.get('/allHoldings', async (req, res) => {
    try {
        const allHoldings = await HoldingsModel.find({});
        res.json(allHoldings);
    } catch (err) {
        res.status(500).send("Error fetching holdings");
    }
});

app.get('/allPositions', async (req, res) => {
    try {
        const allPositions = await PositionsModel.find({});
        res.json(allPositions);
    } catch (err) {
        res.status(500).send("Error fetching positions");
    }
});

app.get('/allOrders', async (req, res) => {
    try {
        const allOrders = await OrdersModel.find({});
        res.json(allOrders);
    } catch (err) {
        res.status(500).send("Error fetching orders");
    }
});

app.post('/newOrder',async(req,res)=>{
    let newOrder = new OrdersModel({
        name : req.body.name,
        qty : req.body.name,
        price : req.body.price,
        mode : req.body.mode,
    })
    newOrder.save();
    res.send("Order saved!");
});


// Mongo connection & server start
app.listen(PORT, async () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ DB connected!");
    } catch (error) {
        console.error("❌ DB connection error:", error.message);
    }
});

process.on('unhandledRejection', err => {
    console.error("Unhandled rejection:", err);
    process.exit(1);
});
