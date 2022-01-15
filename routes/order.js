const Order = require("../models/Order");
const router = require("express").Router();
//Create

router.post("/", async (req, res) => {
    console.log(req.body);
  const newOrder = new Order({
   userId: req.body.userId,
   email: req.body.email,
    productId: req.body.productId,
    amount: req.body.amount,
    address: req.body.address,
    name: req.body.name,
    phone: req.body.phone
  });
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
    console.log(savedOrder);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
// Find  Existing  Order

router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const order = await Order.findOne({ email });
    res.status(200).json(order);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
});

//Delete Order
router.delete("/:email", async (req, res) => {
  try {
    await Order.findByIdAndDelete({req.params.email});
    res.status(200).json("Order Has been Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
    const query = req.query.new;
    try {
      const users = query
        ? await Order.find().sort({ _id: -1 }).limit(5)
        : await Order.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports = router;