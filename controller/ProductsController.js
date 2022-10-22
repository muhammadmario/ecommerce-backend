import { where } from "sequelize";
import Products from "../models/Products.js";
import Users from "../models/Users.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Products.findAll({
      include: [
        {
          model: Users,
          attributes: ["id", "name"],
        },
      ],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getProductById = async (req, res) => {
  const { id } = req.body;
  try {
    const product = await Products.findOne({
      where: {
        id: id,
      },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createProduct = async (req, res) => {
  const { userId, name, price, desc } = req.body;
  try {
    await Products.create({
      name,
      price,
      desc,
      userId,
    });
    res.status(201).json({ msg: "Product created success!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { userId, name, price, desc } = req.body;

  const product = await Products.findOne({
    where: {
      id: id,
    },
  });

  if (!product) return res.status(404).json({ msg: "product no found" });

  try {
    await Products.update(
      {
        name,
        price,
        desc,
        userId,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(201).json({ msg: "Product update success!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Products.findOne({
    where: {
      id: id,
    },
  });

  if (!product) return res.status(404).json({ msg: "product no found" });

  try {
    await Products.destroy({
      where: {
        id: id,
      },
    });
    res.status(201).json({ msg: "Product update success!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
