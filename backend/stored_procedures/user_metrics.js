const { Sequelize } = require('sequelize');
const { sequelize } = require('../models');

const createUserMetricsStoredProcedure = async () => {
  const procedureExistsQuery = `
    SELECT COUNT(*)
    FROM pg_proc
    WHERE proname = 'get_overall_app_metrics';
  `;

  const result = await sequelize.query(procedureExistsQuery, { type: Sequelize.QueryTypes.SELECT });
  
  const procedureExists = parseInt(result[0].count) > 0;

  if (!procedureExists) {
    console.log('Creating stored procedure...');
    const createProcedureQuery = `
      CREATE OR REPLACE FUNCTION get_overall_app_metrics()
        RETURNS TABLE(total_users INT, total_posts INT, total_followers INT, total_followings INT)
        AS $$
        BEGIN
            RETURN QUERY
            SELECT
                (SELECT COUNT(*)::INT FROM "Users") AS total_users,
                (SELECT COUNT(*)::INT FROM "Posts") AS total_posts,
                (SELECT COUNT(DISTINCT "followerId")::INT FROM "Followers") AS total_followers,
                (SELECT COUNT(DISTINCT "followingId")::INT FROM "Followers") AS total_followings;
        END;
        $$ LANGUAGE plpgsql;
    `;
    await sequelize.query(createProcedureQuery);
    console.log('Stored procedure created successfully.');
  } else {
    console.log('Stored procedure already exists. Skipping creation.');
  }
};

module.exports = createUserMetricsStoredProcedure;