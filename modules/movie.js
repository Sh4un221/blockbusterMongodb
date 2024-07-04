export function countDVDCopies(db) {
  return db.collection('movies').aggregate([
    { $unwind: "$format" },
    { $match: { "format.name": "dvd" } },
    {
      $group: {
        _id: null,
        totalCopies: { $sum: "$format.copies" }
      }
    }
  ]).toArray();
}

export function listAllGenres(db) {
  return db.collection('movies').aggregate([
    { $unwind: "$genre" },
    {
      $group: {
        _id: null,
        genres: { $addToSet: "$genre" }
      }
    },
    {
      $project: {
        _id: 0,
        genres: 1
      }
    }
  ]).toArray();
}

export function calculateTotalDVDValue(db) {
  return db.collection('movies').aggregate([
    { $unwind: "$format" },
    { $match: { "format.name": "dvd" } },
    {
      $group: {
        _id: null,
        totalValue: { $sum: { $multiply: ["$format.copies", "$format.value"] } }
      }
    },
    {
      $project: {
        _id: 0,
        totalValue: 1
      }
    }
  ]).toArray();
}

export function findMoviesByActor(db, actorId) {
  return db.collection('movies').aggregate([
    {
      $match: {
        "character.id_actor": actorId
      }
    },
    {
      $project: {
        _id: 0,
        name: 1
      }
    }
  ]).toArray();
}

export function findMoviesWithMainActors(db) {
  return db.collection('movies').aggregate([
    {
      $match: {
        "character.rol": "principal"
      }
    },
    {
      $project: {
        _id: 0,
        name: 1,
        "character.apodo": 1
      }
    }
  ]).toArray();
}

export function countTotalAwards(db) {
  return db.collection('movies').aggregate([
    { $unwind: "$awards" },
    {
      $group: {
        _id: null,
        totalAwards: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        totalAwards: 1
      }
    }
  ]).toArray();
}

export function findMoviesByActorAndFormat(db, actorId, format) {
  return db.collection('movies').aggregate([
    {
      $match: {
        "character.id_actor": actorId,
        "format.name": format
      }
    },
    {
      $project: {
        _id: 0,
        name: 1,
        "format": {
          $filter: {
            input: "$format",
            as: "f",
            cond: { $eq: ["$$f.name", format] }
          }
        }
      }
    }
  ]).toArray();
}

export function findSciFiMoviesByActor(db, actorId) {
  return db.collection('movies').aggregate([
    {
      $match: {
        genre: "Ciencia Ficción",
        "character.id_actor": actorId
      }
    },
    {
      $project: {
        _id: 0,
        name: 1
      }
    }
  ]).toArray();
}

export function findMovieWithMostDVDCopies(db) {
  return db.collection('movies').aggregate([
    { $unwind: "$format" },
    { $match: { "format.name": "dvd" } },
    { $sort: { "format.copies": -1 } },
    { $limit: 1 },
    {
      $project: {
        _id: 0,
        name: 1,
        copies: "$format.copies"
      }
    }
  ]).toArray();
}

export function calculateTotalBlurayValue(db) {
  return db.collection('movies').aggregate([
    { $unwind: "$format" },
    { $match: { "format.name": "Bluray" } },
    {
      $group: {
        _id: null,
        totalValue: { $sum: { $multiply: ["$format.copies", "$format.value"] } }
      }
    },
    {
      $project: {
        _id: 0,
        totalValue: 1
      }
    }
  ]).toArray();
}

export function FindMoviesWithActorID2Participating(db) {
  return db.collection('movies').aggregate(    [
      {
        $match: {
          "character.id_actor": 2
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          character: {
            $filter: {
              input: "$character",
              as: "c",
              cond: { $eq: ["$$c.id_actor", 2] }
            }
          }
        }
      }
    ]).toArray();
}