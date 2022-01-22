const User = require("../model/model");

//* create new user
exports.create = async (req, res) => {
  //* validate req
  if (!req.body) {
    res.status(400).send({ message: "contant can't be empty" });
    return;
  }

  //* new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //* save in db
  try {
    await user.save();
    res.status(201).send({ massage: "user create successfully" });
  } catch (err) {
    res.status(500).send({
      massage:
        err.massage || "some error occurred whilw creating a create operation",
    });
  }
};

//* return all or single user

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    User.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ massage: `not found user with id ${id}` });
        } else res.send(data);
      })
      .catch((err) => {
        res.status(500).send({ massage: `Error returning user with id ${id}` });
      });
  } else {
    User.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send;
        ({
          massage:
            err.massage || "Error occurred while returning user information",
        });
      });
  }
};

//* update a user

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      massage: "data to update can't be empty",
    });
  }

  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          massage: `cannot update user with ${id}, maybe user not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        massage: "Error update user information",
      });
    });
};

//* delete a user

exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ massage: `cannot delete with id ${id}, maybe id is wrong` });
      } else {
        res.send({
          massage: "user was deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ massage: `could not delete user with id ${id}` });
    });
};
