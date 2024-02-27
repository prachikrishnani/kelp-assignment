const pool = require('../connectDB/connectDb')

const addUsersQuery = async (JSONData) => {
    try {
        const usersData = JSONData
        let insertStatements = "INSERT INTO public.users (name, age, address, additional_info) VALUES ";
        usersData.forEach(user => {
            const name = JSON.stringify({ "first_name": user.first_name, "last_name": user.last_name });
            const address = JSON.stringify({ "city": user.city });
            const additionalInfo = JSON.stringify({ "gender": user.gender });
            insertStatements += `(
              '${name}'::jsonb,
              ${user.age},
              '${address}'::jsonb,
              '${additionalInfo}'::jsonb
            ), `;
        });

        
        insertStatements = insertStatements.slice(0, -2); // for Removing extra commo added in last from from line 16

        const response = await pool.query(insertStatements);
        return response.rows;
    } catch (error) {
        console.log(error);
    }
}

const getDistributionQuery = async () => {
    try {
        const response = await pool.query(
            `WITH age_categories AS (
                SELECT 
                    CASE 
                        WHEN age < 20 THEN 'less than 20'
                        WHEN age >= 20 AND age <= 40 THEN '20-40'
                        WHEN age > 40 AND age <= 60 THEN '40-60'
                        ELSE 'greater than 60'
                    END AS category
                FROM 
                    users
            )
            SELECT 
                category,
                COUNT(*) AS count,
                ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) AS percentage
            FROM 
                age_categories
            GROUP BY 
                category
            ORDER BY 
                category;`
        )
        return response.rows;
    } catch (error) {
        console.log(error);
    }
}
module.exports = { addUsersQuery ,getDistributionQuery}