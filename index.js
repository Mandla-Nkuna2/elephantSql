const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/database");
const create = require("./routes/create");
const read = require("./routes/read");
const deleteRoute = require("./routes/delete");
const update = require("./routes/update");

const port = process.env.PORT || 8081;

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log("My middleware");
  next();
});

app.use("/create", create);
app.use("/read", read);
app.use("/delete", deleteRoute);
app.use("/update", update);

app.get("/api/persons", async (req, res) => {
  try {
    const query = `
    SELECT * FROM persons
    ORDER BY personid;
    `;
    const { rows } = await db.query(query);
    res.json({ results: rows.length, rows });
    // const rows = [
    //   {
    //     address: "Address",
    //     city: "City",
    //     firstname: "FirstName",
    //     lastname: "LastName",
    //     personid: 101,
    //   },
    //   {
    //     address: "Address",
    //     city: "City",
    //     firstname: "FirstName",
    //     lastname: "LastName",
    //     personid: 102,
    //   },
    // ];
    // res.json({ results: rows.length, rows });
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
