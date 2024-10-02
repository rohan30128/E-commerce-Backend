const Category = require("../model/category-model");
const slugify = require("slugify");

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exixt",
      });
    }
    const category = await Category.create({ name, slug: slugify(name) });
    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

//update category controller
const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while Updating Category",
    });
  }
};

//get all category
const categoryController = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).send({
      success: true,
      message: "All category list",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all users",
    });
  }
};

//get single category

const singleCategoryController = async (req, res) => {
  try {
    const category = await Category.findOne({slug : req.params.slug});
    res.status(200).send({
      success : true,
      message : "Get Single category success",
      category
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single category",
    });
  }
};

//delete category
const deleteCategoryController = async (req,res)=>{
  try {
    const {id} = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).send({
      success : true,
      message : "Category Deleted Successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success : false,
      message : "Error while deleting category",
      error
    })
  }
}

module.exports = {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryController
};
