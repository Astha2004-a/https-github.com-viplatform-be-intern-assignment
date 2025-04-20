import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, ManyToOne, OneToMany
} from 'typeorm';
import { User } from './User';
import { Like } from './Like';
import { PostHashtag } from './PostHashtag';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => User, user => user.posts)
  author: User;

  @OneToMany(() => Like, like => like.post)
  likes: Like[];

  @OneToMany(() => PostHashtag, postHashtag => postHashtag.post)
  hashtags: PostHashtag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, user => user.likes)
  user: User;

  @ManyToOne(() => Post, post => post.likes)
  post: Post;

  @CreateDateColumn()
  createdAt: Date;
}
@Entity('follows')
export class Follow {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, user => user.following)
  follower: User;

  @ManyToOne(() => User, user => user.followers)
  following: User;

  @CreateDateColumn()
  createdAt: Date;
}
@Entity('hashtags')
export class Hashtag {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  tag: string;

  @OneToMany(() => PostHashtag, postHashtag => postHashtag.hashtag)
  posts: PostHashtag[];
}
@Entity('post_hashtags')
export class PostHashtag {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Post, post => post.hashtags)
  post: Post;

  @ManyToOne(() => Hashtag, hashtag => hashtag.posts)
  hashtag: Hashtag;
}

@Entity('activity_logs')
export class ActivityLog {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, user => user.activityLogs)
  user: User;

  @Column({ type: 'varchar', length: 100 })
  type: string; // e.g., 'post', 'like', 'follow', 'unfollow'

  @Column('text', { nullable: true })
  details: string;

  @CreateDateColumn()
  createdAt: Date;
}
