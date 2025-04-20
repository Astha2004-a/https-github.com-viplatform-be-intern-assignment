import { DataSource } from 'typeorm';
import { User } from './entities/User'; // Import your entities here
import { Post } from './entities/Post';  // Import other entities similarly
import { Like } from './entities/Like';
import { Follow } from './entities/Follow';
import { Hashtag } from './entities/Hashtag';
import { PostHashtag } from './entities/PostHashtag';
import { ActivityLog } from './entities/ActivityLog'; // ActivityLog entity

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite', // You can choose a custom path if needed
  synchronize: false, // Do not use synchronize: true in production, always use migrations
  logging: true, // Set to false in production
  entities: [
    User,
    Post,
    Like,
    Follow,
    Hashtag,
    PostHashtag,
    ActivityLog, // Add your entities to this list
  ],
  subscribers: [], // You can add any event subscribers if needed
  migrations: ['src/migrations/**/*.ts'], // Path to migration files
});
