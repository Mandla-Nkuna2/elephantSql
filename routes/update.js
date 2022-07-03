const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.put("/api/persons/:id", async (req, res) => {
  try {
    const query = `
    UPDATE persons
    SET lastname = $2, firstname = $3,
    address = $4, city = $5
    WHERE personid = $1
    RETURNING *;
    `;

    const values = [
      req.params.id,
      req.body.lastname,
      req.body.firstname,
      req.body.address,
      req.body.city,
    ];

    const { rows } = await db.query(query, values);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
