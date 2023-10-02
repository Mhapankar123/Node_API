const users = require("../models/userSchema");
const moment = require("moment");
//We use moment for date

//The below method is of POST
exports.userPost = async (req, res) => {
  console.log(req.body);
  //Here we are getting what we have sent from postman

  const { firstName, lastName, email, mobile, gender } = req.body;

  if (!firstName || !lastName || !email || !mobile || !gender) {
    res.status(400).json({ error: "All inputs are required" });
  }

  try {
    const existingUser = await users.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
    } else {
      const date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      const userData = new users({
        firstName,
        lastName,
        email,
        mobile,
        gender,
        dateCreated: date,
        // Here we have not define key:value pair as the name
        //we used in const above is same of our userSchema
      });

      await userData.save(); // Save is a method to save data in database.
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(400).json(error);
    console.log("Catch Error", error);
  }
};

//The below method is of GET all the user
exports.getAllUsers = async (req, res) => {
  //Params are what we get by ID and query params are what search,filter,sort
  const search = req.query.search || "";
  const _gender = req.query.gender || "";
  const _sort = req.query.sort || "";
  const _page = req.query.page || "";
  const ITEM_PER_PAGE = 2;

  const query = {
    //Searching by firstname
    firstName: { $regex: search, $options: "i" }, //convert to case insensitive lowercase or uppercase it will search
  };

  if (_gender !== "All") {
    query.gender = _gender;
  }
  console.log(query);

  //Example   user/getAllUsers?search=laski&gender=male, will give us this

  try {
    const skip = (_page - 1) * ITEM_PER_PAGE; //(1-1) * 2 = 0 so skip 0 items for page 1 and so on
    const getTotalCount = await users.countDocuments(query);
    const pageCount = Math.ceil(getTotalCount / ITEM_PER_PAGE);

    const usersData = await users
      .find(query)
      .sort({
        firstName: 1,
        //to sort ascending we use 1 and to sort descending we use -1 for any of the field we need
      })
      .limit(ITEM_PER_PAGE)
      .skip(skip);

    res.status(200).json({
      pagination: {
        count: pageCount,
      },
      usersData,
    });
  } catch (error) {
    res.status(400).json(error);
    console.log("Catch Error", error);
  }
};

//Get User by id
exports.getUser = async (req, res) => {
  const { id } = req.params;
  //Here we used destructuring if not it would
  //be something like const id = req.params.id;

  try {
    const userData = await users.findOne({ _id: id }); //_id is from the database
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json(error);
    console.log("Catch Error", error);
  }
};

//Delete User
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await users.findByIdAndDelete({ _id: id }); //this is a mongodb query
    res.status(200).json(deleteUser);
  } catch (error) {
    res.status(400).json(error);
    console.log("Catch Error", error);
  }
};

//Update User
exports.updateUser = async (req, res) => {
  //In update we need id as well as whole object so we can replace
  //that particular object model
  const { id } = req.params;
  const { firstName, lastName, email, mobile, gender } = req.body;

  try {
    const _updateDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    const updateUser = await users.findByIdAndUpdate(
      { _id: id },
      {
        firstName,
        lastName,
        email,
        mobile,
        gender,
        dateUpdated: _updateDate,
      },
      { new: true } // this return use the updated value from the database, if not it will not returnt the updated value
    );
    await updateUser.save();
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(400).json(error);
    console.log("Catch Error", error);
  }
};
