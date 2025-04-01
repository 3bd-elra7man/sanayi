import { Service } from "../models/service.model.js";
import { User } from "../models/user.model.js";

// Create Service (Craftsman only)
export const createService = async (req, res) => {
  const { title, description, price, tags, images, category } = req.body;
  const { userId } = req;

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== "Craftsman") {
      return res.status(403).json({
        success: false,
        message: "Only craftsmen can create services",
      });
    }

    const newService = new Service({
      craftsman_id: userId,
      title,
      description,
      price,
      category,
      tags,
      images,
    });

    await newService.save();
    res
      .status(201)
      .json({ success: true, message: "Service created", service: newService });
  } catch (error) {
    console.error("Error in createService: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Service (Craftsman only)
export const updateService = async (req, res) => {
  const { serviceId } = req.params;
  const { title, description, price, tags, images, category } = req.body;
  const { userId } = req;

  try {
    const service = await Service.findById(serviceId);
    if (
      !service ||
      service.craftsman_id.toString() !== userId ||
      service.deleted
    ) {
      return res.status(403).json({
        success: false,
        message: "Service not found or access denied",
      });
    }

    service.title = title || service.title;
    service.description = description || service.description;
    service.price = price || service.price;
    service.category = category || service.category;
    service.tags = tags || service.tags;
    service.images = images || service.images;

    await service.save();
    res
      .status(200)
      .json({ success: true, message: "Service updated", service });
  } catch (error) {
    console.error("Error in updateService: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete Service (Craftsman only - Soft Delete)
export const deleteService = async (req, res) => {
  const { serviceId } = req.params;
  const { userId } = req;

  try {
    const service = await Service.findById(serviceId);
    if (
      !service ||
      service.craftsman_id.toString() !== userId ||
      service.deleted
    ) {
      return res.status(403).json({
        success: false,
        message: "Service not found or access denied",
      });
    }

    service.deleted = true;
    await service.save();
    res.status(200).json({ success: true, message: "Service soft-deleted" });
  } catch (error) {
    console.error("Error in deleteService: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// List Services with optional filters
export const listServices = async (req, res) => {
  const { tags, minPrice, maxPrice, category } = req.query;

  try {
    const query = { deleted: false };
    if (tags) query.tags = { $in: tags.split(",") };
    if (minPrice) query.price = { ...query.price, $gte: parseFloat(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: parseFloat(maxPrice) };
    if (category) query.category = category;

    const services = await Service.find(query);
    res.status(200).json({ success: true, services });
  } catch (error) {
    console.error("Error in listServices: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
