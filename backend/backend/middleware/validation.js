import Joi from "joi";

// Job validation schema
const jobSchema = Joi.object({
  type: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.object({
    type: Joi.string().default("Point"),
    coordinates: Joi.array().items(Joi.number()).length(2).required(),
  }).required(),
  price: Joi.number().positive().required(), // Non-negative pricing
});

// Service validation schema
const serviceSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  tags: Joi.array().items(Joi.string()).optional(),
  images: Joi.array().items(Joi.string().uri()).optional(), // Appropriate formatting for images
});

// Validate job
export const validateJob = (job) => {
  return jobSchema.validate(job);
};

// Validate service
export const validateService = (service) => {
  return serviceSchema.validate(service);
};

// Job validation middleware
export const validateJobMiddleware = (req, res, next) => {
  const { error } = validateJob(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  next();
};

// Service validation middleware
export const validateServiceMiddleware = (req, res, next) => {
  const { error } = validateService(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  next();
};
