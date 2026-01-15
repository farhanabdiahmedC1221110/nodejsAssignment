import Order from "../model/orderModel.js";
import Food from "../model/foodModel.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { customer, items, deliveryAddress, notes } = req.body;

    // Validate items and get fresh prices
    const validatedItems = [];
    for (const item of items) {
      const food = await Food.findById(item.food);
      if (!food) {
        return res.status(404).json({ message: `Food item not found: ${item.food}` });
      }
      if (!food.available) {
        return res.status(400).json({ message: `Food item not available: ${food.name}` });
      }
      validatedItems.push({
        food: item.food,
        quantity: item.quantity,
        priceAtTime: food.price,
      });
    }

    const order = new Order({
      customer,
      items: validatedItems,
      deliveryAddress,
      notes,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email")
      .populate("items.food", "name price");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "name email")
      .populate("items.food", "name price");

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};