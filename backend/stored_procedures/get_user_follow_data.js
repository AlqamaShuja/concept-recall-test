const { Sequelize } = require('sequelize');
const { sequelize } = require('../models');

const getUserFollowDataStoredProcedure = async () => {
  const procedureExistsQuery = `
    SELECT COUNT(*)
    FROM pg_proc
    WHERE proname = 'get_user_follow_data';
  `;

  const result = await sequelize.query(procedureExistsQuery, { type: Sequelize.QueryTypes.SELECT });
  
  const procedureExists = parseInt(result[0].count) > 0;

  if (!procedureExists) {
    console.log('Creating stored procedure...');
    const createProcedureQuery = `
      CREATE OR REPLACE FUNCTION get_user_follow_data(user_id INT)
        RETURNS TABLE(total_followers INT, total_followings INT)
        LANGUAGE plpgsql
        AS $$
        BEGIN
          RETURN QUERY
          SELECT
            (SELECT COUNT(*)::INT FROM "Followers" WHERE "followingId" = user_id) AS total_followers,
            (SELECT COUNT(*)::INT FROM "Followers" WHERE "followerId" = user_id) AS total_followings;
        END;
      $$;
    `;
    await sequelize.query(createProcedureQuery);
    console.log('Stored procedure created successfully.');
  } else {
    console.log('Stored procedure already exists. Skipping creation.');
  }
};

module.exports = getUserFollowDataStoredProcedure;
