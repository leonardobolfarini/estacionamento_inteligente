function calculateOccupancyRate(total, occupied) {
  return occupied / total;
}

function getRecommendation(fromSector, sectors) {
  const current = sectors[fromSector];

  if (!current) return null;

  const occupancyRate = calculateOccupancyRate(
    current.total,
    current.occupied
  );

  if (occupancyRate < 0.9) {
    return null;
  }

  const candidates = Object.entries(sectors)
    .filter(([name]) => name !== fromSector)
    .map(([name, data]) => ({
      name,
      free: data.total - data.occupied,
      occupancy: data.occupied / data.total
    }))
    .filter(s => s.occupancy < 0.9);

  if (candidates.length === 0) return null;

  candidates.sort((a, b) => b.free - a.free);

  const best = candidates[0];

  return {
    fromSector,
    recommendedSector: best.name,
    reason: `Sector ${fromSector} at ${(occupancyRate * 100).toFixed(0)}% occupancy; Sector ${best.name} has ${best.free} free spots`,
    ts: new Date().toISOString()
  };
}

module.exports = { getRecommendation };
