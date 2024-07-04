import DatabaseConnection from './utils/databaseConection.js'; 
import * as movieQueries from './modules/movie.js';
import * as actorQueries from './modules/actor.js';



async function runQueries() {
  const dbConnection = new DatabaseConnection('mongodb+srv://fabian2211882:BrubUvYfe6s1ezgA@mongodatabase.rkeidbv.mongodb.net/');
  await dbConnection.connect();
  const db = dbConnection.getDb();

  console.log("Connected successfully to server");

  try {
    // Movie queries
    console.log("\n--- Movie Queries ---");

    console.log("\n1. Count DVD Copies:");
    console.log(await movieQueries.countDVDCopies(db));

    console.log("\n2. List All Genres:");
    console.log(await movieQueries.listAllGenres(db));

    console.log("\n3. Calculate Total DVD Value:");
    console.log(await movieQueries.calculateTotalDVDValue(db));

    console.log("\n4. Find Movies by Actor (ID: 1):");
    console.log(await movieQueries.findMoviesByActor(db, 1));

    console.log("\n5. Find Movies with Main Actors:");
    console.log(await movieQueries.findMoviesWithMainActors(db));

    console.log("\n6. Count Total Awards:");
    console.log(await movieQueries.countTotalAwards(db));

    console.log("\n7. Find Movies by Actor and Format (Actor ID: 1, Format: 'Bluray'):");
    console.log(await movieQueries.findMoviesByActorAndFormat(db, 1, 'Bluray'));

    console.log("\n8. Find Sci-Fi Movies by Actor (ID: 3):");
    console.log(await movieQueries.findSciFiMoviesByActor(db, 3));

    console.log("\n9. Find Movie with Most DVD Copies:");
    console.log(await movieQueries.findMovieWithMostDVDCopies(db));

    console.log("\n10. Calculate Total Blu-ray Value:");
    console.log(await movieQueries.calculateTotalBlurayValue(db));

    console.log("\n11. Find Movies with Actor ID 1:");
    console.log(await movieQueries.findMoviesByActor(db,1));

    console.log("\n12. Find Movies with Actor ID 2:");
    console.log(await movieQueries.findMoviesByActor(db,2));

    // Actor queries
    console.log("\n--- Actor Queries ---");

    console.log("\n13. Find Oscar Winners:");
    console.log(await actorQueries.findOscarWinners(db));

    console.log("\n14. Count Awards by Actor:");
    console.log(await actorQueries.countAwardsByActor(db));

    console.log("\n15. Find Actors Born After 1980:");
    console.log(await actorQueries.findActorsBornAfter1980(db));

    console.log("\n16. Find Actor with Most Awards:");
    console.log(await actorQueries.findActorWithMostAwards(db));

    console.log("\n17. Count Total Actors:");
    console.log(await actorQueries.countTotalActors(db));

    console.log("\n18. Calculate Average Age of Actors:");
    console.log(await actorQueries.calculateAverageAge(db));

    console.log("\n19. Find Actors with Instagram:");
    console.log(await actorQueries.findActorsWithInstagram(db));

    console.log("\n20. Find Actors with Awards After 2015:");
    console.log(await actorQueries.findActorsWithAwardsAfter2015(db));

  } catch (e) {
    console.error(e);
  } finally {
    await dbConnection.close();
    console.log("Disconnected from server");
  }
}

runQueries().catch(console.error);
