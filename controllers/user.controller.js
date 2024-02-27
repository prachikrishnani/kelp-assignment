const { addUsersQuery, getDistributionQuery } = require('../queries/user.query')

const addUsersController = async (req, res, next) => {
    try {
        const csvFile = req.files.csvFile;
        if (!csvFile) {
            return res.status(400).json({ error: ' CSV file is required.' });
        }
        // Read CSV file directly from memory
        const data = csvFile.data.toString('utf8');
        const lines = data.trim().split('\n');
        const headers = lines.shift().split(',');
        const jsonData = lines.map(line => {
            const values = line.split(',');
            const obj = {};
            headers.forEach((header, index) => {
                obj[header.trim()] = values[index] ? values[index].trim() : '';
            });
            return obj;
        });
        const response = await addUsersQuery(jsonData)
        return res.json({message:'Users added successfully'});
    } catch (error) {
        console.log(error);
    }
}

const getDistributionController = async (req, res, next) => {
    try {
        const response = await getDistributionQuery()
        return res.json(response);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { addUsersController, getDistributionController }