const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://abdul_js:0818720ajayi@task-manager.q947l4g.mongodb.net/?appName=Task-manager";

async function Database() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    await deleteManyData(client, new Date("2019-03-06"));
  } catch (error) {
    console.log("error", error);
  } finally {
    await client.close();
  }
}

Database();

async function findManyData(
  client,
  {
    minimumNumberOfBathrooms = 0,
    minimumNumberOfBed = 0,
    maximumNumberOfData = 5,
  } = {},
) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .find({
      bedrooms: { $gte: minimumNumberOfBed },
      bathrooms: { $gte: minimumNumberOfBathrooms },
    })
    .sort({ last_review: -1 })
    .limit(maximumNumberOfData)
    .toArray();
  result.forEach((item) => {
    console.log(item.name);
    console.log(item.beds);
    console.log(item.bedrooms);
    console.log(item.bathrooms);
    // console.log(item.accomodates);
  });
}

async function updateDatabase(client, nameOfListing, newListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateOne(
      { name: nameOfListing },
      { $set: { newListing } },
      { upsert: true },
    );
  if (result.upsertedCount > 0) {
    console.log(
      `one document was modified with the id of ${result.upsertedId}`,
    );
  } else {
    console.log(`${result.modifiedCount} were/are counted`);
  }
}

async function updateManyData(client) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateMany(
      { protect_type: { $exists: false } },
      { $set: { protect_type: "unkonwn" } },
    );
  console.log(`this is the number of result matched ${result.matchedCount}`);
}

async function createDatabase(client, newListing) {
  const data = await client
    .db("Task-manager")
    .collection("tasks")
    .insertOne(newListing);
  console.log(data.insertedId);
}

async function deleteManyData(client, date) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .deleteMany({
      last_scraped: { $lt: date },
    });
  console.log(result.deletedCount);
}

async function deleteData(client, listing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .deleteOne({ name: listing });
  console.log(result.deletedCount);
}

async function createMulitpleData(client, newListings) {
  const result = await client
    .db("Task-manager")
    .collection("task")
    .insertMany(newListings);
  console.log(result);
}
async function findData(client, listing) {
  const result = await client
    .db("Task-manager")
    .collection("task")
    .findOne({ name: listing });
  if (result) {
    console.log(result);
  } else {
    console.log("no result found");
  }
}
async function getDatabaseLists(client) {
  const databaselist = await client.db().admin().listDatabases();
  databaselist.databases.forEach((db) => {
    console.log(db.name);
  });
}
