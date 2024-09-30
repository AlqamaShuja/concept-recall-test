const { faker } = require('@faker-js/faker');
const { User, Post, Follower } = require('../models');

const randomDateWithinLast10Days = () => {
  const now = new Date();
  const pastDate = new Date();
  pastDate.setDate(now.getDate() - 10);
  return new Date(pastDate.getTime() + Math.random() * (now.getTime() - pastDate.getTime()));
};

const checkAndSeedDatabase = async () => {
  try {
    const userCount = await User.count();
    const postCount = await Post.count();

    if (userCount === 0 || postCount === 0) {
      console.log('Tables are empty, seeding the database...');
      const users = [];
      for (let i = 0; i < 300; i++) {
        const createdAt = randomDateWithinLast10Days();
        const updatedAt = randomDateWithinLast10Days();
        users.push({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          avatar: faker.image.avatar(),
          createdAt,
          updatedAt,
        });
      }
      const createdUsers = await User.bulkCreate(users, { returning: true });

      const posts = [];
      createdUsers.forEach(user => {
        const numberOfPosts = Math.floor(Math.random() * (64 - 20 + 1)) + 20;

        for (let j = 0; j < numberOfPosts; j++) {
          const createdAt = randomDateWithinLast10Days();
          const updatedAt = randomDateWithinLast10Days();
          posts.push({
            content: faker.lorem.sentence() + " & " + faker.lorem.sentence(),
            userId: user.id,
            createdAt,
            updatedAt,
          });
        }
      });
      await Post.bulkCreate(posts);

      const followers = [];
      createdUsers.forEach(user => {
        const followerCount = Math.floor(Math.random() * 9) + 2;

        for (let j = 0; j < followerCount; j++) {
          let followerId;
          do {
            followerId = Math.floor(Math.random() * createdUsers.length) + 1;
          } while (
            followerId === user.id ||
            followers.some(f => f.followerId === followerId && f.followingId === user.id)
          );

          const createdAt = randomDateWithinLast10Days();
          const updatedAt = randomDateWithinLast10Days();
          followers.push({
            followerId,
            followingId: user.id,
            createdAt,
            updatedAt,
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