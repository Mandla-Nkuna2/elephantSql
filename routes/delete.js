const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.delete("/api/persons/:id", async (req, res) => {
  try {
    const query = ` 
    DELETE FROM persons
    WHERE personid = $1
    RETURNING *;
    `;

    const values = [req.params.id];
    await db.query(query, values);
    res.status(204).send(`${values[0]} deleted successfully`);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
