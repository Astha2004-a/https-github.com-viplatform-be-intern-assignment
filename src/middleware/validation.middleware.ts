import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

/**
 * Middleware to validate request body against a Joi schema.
 * @param schema Joi.ObjectSchema - Joi validation schema for request body
 */
export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const options = {
      abortEarly: false,        // return all errors
      allowUnknown: false,      // disallow unknown keys
      stripUnknown: true        // remove unknown keys
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message.replace(/['"]/g, ''))
        .join(', ');
      return res.status(400).json({ message: errorMessage });
    }

    req.body = value; // update the body with sanitized and validated values
    next();
  };
};
