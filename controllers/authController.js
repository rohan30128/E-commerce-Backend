const User = require("../model/user-model");
const { hashPassword, comparePassword } = require("../helper/authHelper");
const JWT = require("jsonwebtoken");
const Order = require("../model/order-model");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or Password",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Emial is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

const registerController = async (req, res) => {
  try {
    const { name, email, phone, password, address, answer } = req.body;
    //validation
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }
    if (!address) {
      return res.send({ error: "Address is Required" });
    }
    if (!answer) {
      return res.send({ error: "Answer is Required" });
    }

    //check user
    const exisitingUser = await User.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashpassword = await hashPassword(password);
    //save
    const user = await User.create({
      name,
      email,
      phone,
      password: hashpassword,
      address,
      answer,
    });

    return res.status(200).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Regiastration",
      error,
    });
  }
};

const forgetPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({
        message: "Email is required ",
      });
    }
    if (!answer) {
      res.status(400).send({
        message: "answer is required ",
      });
    }
    if (!newPassword) {
      res.status(400).send({
        message: "New Password is required ",
      });
    }
    //check
    const user = await User.findOne({ email, answer });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//update profile
const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const user = await User.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while Updating profile",
    });
  }
};

//orders
const getOrderController = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting orders",
    });
  }
};

//get all orders
const getAllOrderController = async (req, res) => {
  try {
    const orders = await Order.find({})
    .populate("products", "-photo")
    .populate("buyer", "name")
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all orders",
    });
  }
};

//order status controller
const orderStatusController = async (req,res)=>{
  try {
    const { orderId} = req.params;
    const { status } = req.body;
    const orders = await Order.findByIdAndUpdate(orderId,{status},{new : true});
    res.json(orders);
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success : false,
      error,
      message : "Error while updating orders"
    })
  }
}

module.exports = {
  registerController,
  loginController,
  forgetPasswordController,
  updateProfileController,
  getOrderController,
  getAllOrderController,
  orderStatusController
};
