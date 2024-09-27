const { faker } = require('@faker-js/faker');
const { User, Post, Follower } = require('../models');

const checkAndSeedDatabase = async () => {
  try {
    const userCount = await User.count();
    const postCount = await Post.count();

    if (userCount === 0 || postCount === 0) {
      console.log('Tables are empty, seeding the database...');

      // Seed users
      const users = [];
      for (let i = 0; i < 200; i++) {
        users.push({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          avatar: faker.image.avatar(),
        });
      }
      const createdUsers = await User.bulkCreate(users, { returning: true });

      // Seed posts for each user
      const posts = [];
      createdUsers.forEach(user => {
        for (let j = 0; j < 5; j++) {
          posts.push({
            content: faker.lorem.sentence(),
            userId: user.id,
          });
        }
      });
      await Post.bulkCreate(posts);

      // Seed followers (2 to 10 random followers for each user)
      const followers = [];
      createdUsers.forEach(user => {
        // Random number of followers for each user (between 2 and 10)
        const followerCount = Math.floor(Math.random() * 9) + 2; // Random number between 2 and 10

        // Assign random followers
        for (let j = 0; j < followerCount; j++) {
          let followerId;
          do {
            followerId = Math.floor(Math.random() * createdUsers.length) + 1;
          } while (followerId === user.id); // Ensure a user cannot follow themselves

          followers.push({
            followerId,
            followingId: user.id, // The current user being followed
          });
        }
      });
      await Follower.bulkCreate(followers);

      console.log('Database seeded successfully!');
    } else {
      console.log('User and Post tables already have data, skipping seeding.');
    }
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
};

module.exports = checkAndSeedDatabase;
