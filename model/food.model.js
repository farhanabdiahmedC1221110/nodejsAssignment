import db from "../config/db.js";

export const getAllFruidModel = (callback) => {
  const query = "SELECT * FROM fruids";
  db.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

export const getFruidByIdModel = (fruidId, callback) => {
  const query = "SELECT * FROM fruids WHERE id = ?";
  db.query(query, [fruidId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

export const createFruidModel = (data, callback) => {
  const query = "INSERT INTO fruid(name,price,stock) values(?,?,?)";
  db.query(query, [data.name, data.price,data.stock], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

export const updateFruidModel = (fruidId, data, callback) => {
  const query = "UPDATE fruids SET name = ?, price = ?, stock=? WHERE id = ?";
  db.query(
    query,
    [data.name, data.price, data.stock, fruidId],
    (err, results) => {
      if (err) {
        return callback(err, null);
        }
        callback(null, results);
    }
    );
};
export const deleteFruidModel = (fruideId, callback) => {
  const query = "DELETE FROM fruids WHERE id = ?";
    db.query(query, [fruideId], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  }
    );
};