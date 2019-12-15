const Express = require("express");
const router = Express.Router();
const User = require("../models/User");

router.post("/new", async (req, res) => {
  const { name, password, role, email } = req.body;

  try {
    const user = new User({ name, password, role, email });
    console.log(user);

    const userDB = await user.save();

    res.status(200).json({ userDB });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

router.post("/update/:id", async (req, res) => {
  const { id } = req.params;

  const { name, password, role, email } = req.body;
  const userdata = { name, password, role, email };

  try {
    const options = {
      new: true,
      runValidators: true
    };

    const userDB = await User.findByIdAndUpdate(id, userdata, options);

    res.json({ userDB });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("/get/:name/:lastname", async (req, res) => {
  const { name, lastname } = req.params;
  try {
    const userDB = await User.find({ $and: [{ name }, { _id: lastname }], { password: 0 })
      .skip(4)
      .limit(10);

    const usersCount = await User.count({})
      .skip(4)
      .limit(10);

    res.json({ userDB, usersCount });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndUpdate(id, { state: false });
    res.json({ deletedUser });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
