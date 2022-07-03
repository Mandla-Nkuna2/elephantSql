const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.post("/api/persons", async (req, res) => {
  try {
    const query = `
    INSERT INTO persons(personid,lastname,firstname,address,city)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *;
    `;

    const values = [
      req.body.personid,
      req.body.lastname,
      req.body.firstname,
      req.body.address,
      req.body.city,
    ];

    const { rows } = await db.query(query, values);
    res.status(201).json(rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
