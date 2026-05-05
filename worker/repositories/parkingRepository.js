const db = require("../db/db");

async function getSectorsStatus() {
  const result = await db.query(`
    SELECT sector,
           COUNT(*) as total,
           SUM(CASE WHEN status = 'OCCUPIED' THEN 1 ELSE 0 END) as occupied
    FROM parking_spots
    GROUP BY sector
  `);

  const sectors = {};

  result.rows.forEach(row => {
    sectors[row.sector] = {
      total: parseInt(row.total),
      occupied: parseInt(row.occupied)
    };
  });

  return sectors;
}

async function saveRecommendation(rec) {
  await db.query(
    `INSERT INTO recommendations_log 
     (from_sector, recommended_sector, reason, ts)
     VALUES ($1, $2, $3, $4)`,
    [
      rec.fromSector,
      rec.recommendedSector,
      rec.reason,
      rec.ts
    ]
  );
}

module.exports = {
  getSectorsStatus,
  saveRecommendation
};
