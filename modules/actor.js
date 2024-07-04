export function findOscarWinners(db) {
  return db.collection('actors').aggregate([
    {
      $match: {
        $expr: { $gt: [{ $size: "$awards" }, 0] },
        "awards.name": "Oscar Award"
      }
    },
    { $project: { _id: 0, full_name: 1 } }
  ]).toArray();
}

export function countAwardsByActor(db) {
  return db.collection('actors').aggregate([
    {
      $match: { $expr: { $gt: [{ $size: "$awards" }, 0] } }
    },
    {
      $project: {
        _id: 0,
        full_name: 1,
        size: { $size: "$awards" }
      }
    }
  ]).toArray();
}

export function findActorsBornAfter1980(db) {
  return db.collection('actors').aggregate([
    {
      $match: { $expr: { $gt: ["$date_of_birth", "1980"] } }
    },
    {
      $project: {
        _id: 0,
        full_name: 1,
        date_of_birth: 1
      }
    }
  ]).toArray();
}

export function findActorWithMostAwards(db) {
  return db.collection('actors').aggregate([
    {
      $addFields: { numAwards: { $size: "$awards" } }
    },
    { $sort: { numAwards: -1 } },
    { $limit: 1 },
    {
      $project: {
        _id: 0,
        full_name: 1,
        numAwards: 1
      }
    }
  ]).toArray();
}

export function countTotalActors(db) {
  return db.collection('actors').aggregate([
    { $count: "totalActores" }
  ]).toArray();
}

export function calculateAverageAge(db) {
  return db.collection('actors').aggregate([
    {
      $addFields: {
        age: {
          $subtract: [
            { $year: new Date() },
            { $toInt: { $substr: ["$date_of_birth", 0, 4] } }
          ]
        }
      }
    },
    {
      $group: {
        _id: null,
        averageAge: { $avg: "$age" }
      }
    },
    {
      $project: {
        _id: 0,
        averageAge: 1
      }
    }
  ]).toArray();
}

export function findActorsWithInstagram(db) {
  return db.collection('actors').aggregate([
    {
      $match: {
        "social_media.instagram": { $exists: true, $ne: "" }
      }
    },
    {
      $project: {
        _id: 0,
        full_name: 1,
        instagram: "$social_media.instagram"
      }
    }
  ]).toArray();
}

export function findActorsWithAwardsAfter2015(db) {
  return db.collection('actors').aggregate([
    {
      $match: {
        "awards.year": { $gt: 2015 }
      }
    },
    {
      $project: {
        _id: 0,
        full_name: 1,
        awards: {
          $filter: {
            input: "$awards",
            as: "award",
            cond: { $gt: ["$$award.year", 2015] }
          }
        }
      }
    }
  ]).toArray();
}