const express = require("express");
const User = require("../models/user.js");
const router = express.Router();

router.get("/current_user", (req, res) => {
  if (!!req.user) {
    return res
      .json({
        name: req.user.name,
        layout: req.user.layout,
      })
      .end();
  }
  res.status(204).end();
});

router.post("/write", async (req, res) => {
  let id;
  if (req.user) {
    id = req.user._id;
  }
  const { layout } = req.body;
  console.log(id);
  const newUser = await User.updateOne(
    { _id: id },
    {
      layout,
    }
  );
  console.log(newUser);

  return res.status(200).end();
});

module.exports = router;
