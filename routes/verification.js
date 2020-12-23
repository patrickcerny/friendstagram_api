const express = require("express");
const router = express.Router();
const User = require("../models/Post");
const bcrypt = require("bcrypt");

router.post("/:servername", async (req, res) => {
  try {
    const query = { username: req.params.server };
    const user = await User.findOne(query);

    if (user) {
      const passwordCompare = await bcrypt.compare(
        String(req.body.password),
        String(user.info.password)
      );

      if (req.body.username === user.username && passwordCompare) {
        res.status(200).send(user);
      } else {
        res.status(401).send();
      }
    } else {
      res.status(404).send();
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});
module.exports = router;
