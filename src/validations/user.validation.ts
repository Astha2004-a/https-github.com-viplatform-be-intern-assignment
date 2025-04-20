
  import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json({ errors });
    }
    next();
  };
};
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

const userRepo = AppDataSource.getRepository(User);

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = userRepo.create(req.body);
    await userRepo.save(user);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userRepo.findOneBy({ id: parseInt(id) });
    if (!user) return res.status(404).json({ error: 'User not found' });

    userRepo.merge(user, req.body);
    await userRepo.save(user);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update user' });
  }
};
import { Router } from 'express';
import { createUser, updateUser } from '../controllers/userController';
import { validateRequest } from '../middleware/validateRequest';
import { createUserSchema, updateUserSchema } from '../validators/userValidator';

const router = Router();

router.post('/', validateRequest(createUserSchema), createUser);
router.put('/:id', validateRequest(updateUserSchema), updateUser);

export default router;
import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

// ... error handling, db connection, etc.

export default app;
