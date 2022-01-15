const User = require("../models/User");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("./verifyToke");

//Create
///HJjhajklf
router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log(savedUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
//Create Or  Update Existing  User

router.put("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOneAndUpdate({ email } ,
      {
        $set: req.body,
      },
      { upsert: true, returnDocument: "after" }
    );
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
});

//Delete User
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Has been Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    res.status(200).json(user._doc);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL USER
router.get("/", async (req, res) => {
    console.log(req.body)
  try {
   const users =  await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err.message)
    res.status(500).json(err.message);
  }
});

module.exports = router;
