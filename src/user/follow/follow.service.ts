import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
@Injectable()
export class FollowService {
constructor(
@InjectRepository(User)
private readonly userRepository: Repository<User>,
) {}

// Follow a user
async follow(followerId: number, userId: number) {
if (followerId === userId) {
    throw new ConflictException('You cannot follow yourself');
}

const follower = await this.userRepository.findOne({ where: { id: followerId } });
const userToFollow = await this.userRepository.findOne({ where: { id: userId } });

if (!follower || !userToFollow) {
    throw new NotFoundException('User not found');
}

// Check if already following
if (follower.following.some((user) => user.id === userId)) {
    throw new ConflictException('You are already following this user');
}

// Add user to follower's following and follower to user's followers
follower.following.push(userToFollow);
userToFollow.followers.push(follower);

// Save the changes to both users
await this.userRepository.save(follower);
await this.userRepository.save(userToFollow);

return { message: `You are now following user with ID ${userId}` };
}

// Unfollow a user
async unfollow(followerId: number, userId: number) {
const follower = await this.userRepository.findOne({ where: { id: followerId } });
const userToUnfollow = await this.userRepository.findOne({ where: { id: userId } });

if (!follower || !userToUnfollow) {
    throw new NotFoundException('User not found');
}

// Check if not already following
if (!follower.following.some((user) => user.id === userId)) {
    throw new ConflictException('You are not following this user');
}

// Remove user from follower's following and follower from user's followers
follower.following = follower.following.filter((user) => user.id !== userId);
userToUnfollow.followers = userToUnfollow.followers.filter((user) => user.id !== followerId);

// Save the changes to both users
await this.userRepository.save(follower);
await this.userRepository.save(userToUnfollow);

return { message: `You have unfollowed user with ID ${userId}` };
}

// Get all followers of a user
async getFollowers(userId: number) {
const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['followers'] });

if (!user) {
        throw new NotFoundException('User not found');
    }

    return user.followers;
}

// Get all users that a user is following
async getFollowing(userId: number) {
const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['following'] });

    if (!user) {
        throw new NotFoundException('User not found');
    }

    return user.following;
}
}
