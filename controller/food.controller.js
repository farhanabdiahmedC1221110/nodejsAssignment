import {
  getAllFruidModel,
  getFruidByIdModel,
  createFruidModel,
    updateFruidModel,
    deleteFruidModel,
} from "../model/food.model.js";
export const getAllFruids = (req, res) => {
  getAllFruidModel((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(results);
  });
};

export const getFruidById = (req, res) => {
  const fruidId = req.params.id;
  getFruidByIdModel(fruidId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "fruid not found" });
    }
    res.json(results[0]);
  });
};

export const createFruid = (req, res) => {
  const body = req.body;
  createFruidModel(body, (err, results) => {
    console.log(body)
    if (err) {
      return res.status(500).json({ error: "Database insert error" });
    }
    res
      .status(201)
      .json({ message: "fruid created successfully", courseId: results.insertId });
  });
};


export const updateFruid = (req, res) => {
  const fruidId = req.params.id;
  const body = req.body;
  updateCourseModel(fruidId, body, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database update error" });
    }
    res.json({ message: "fruid updated successfully" });
  });
};

export const deleteFruid = (req, res) => {
  const deleteFruidModel = req.params.id;
  deleteFruid(fruidIdId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database delete error" });
    }
    res.json({ message: "fruid deleted successfully" });
  });
};