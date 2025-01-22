const connection = require("../utils/DatabaseConnect");

module.exports = {
    createAds: (req, res) => {
        const { subject, url, image } = req.body;
        const query = `
            INSERT INTO advertisings (subject, url, image)
            VALUES ('${subject}', '${url}', '${image}')
        `
        connection.query(query)
            .then(result => res.json({ message: "Advertising created" }))
            .catch(err => res.json({ message: err }))
    },
    getAds: (req, res) => {
        const query = `
            SELECT * FROM advertisings
        `
        connection.query(query)
            .then(result => res.json(result.rows))
            .catch(err => res.json(err))
    },
    getAdsById: (req, res) => {
        const id = req.params.id;
        const query = `
            SELECT * FROM advertisings WHERE id = $1
        `
        connection.query(query, [id])
            .then(result => res.json(result.rows))
            .catch(err => res.json(err))
    },
    updateAds: (req, res) => {
        const id = req.params.id;
        const { subject, url, image } = req.body;
        const query = `
            UPDATE advertisings SET subject = '${subject}', url = '${url}', image = '${image}' WHERE id = ${id}
        `
        connection.query(query)
            .then(result => res.json({ message: "Advertising updated" }))
            .catch(err => res.json({ message: err }))
    },
    deleteAds: (req, res) => {
        const id = req.params.id;
        const query = `
            DELETE FROM advertisings WHERE id = $1
        `
        connection.query(query, [id])
            .then(result => res.json({ message: "Advertising deleted" }))
            .catch(err => res.json({ message: err }))
    }
    
}