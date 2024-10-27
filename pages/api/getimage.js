import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const client = new MongoClient(process.env.MONGODB_URI);

        try {
            await client.connect();

            // Choose a name for your database
            const database = client.db("FindMySelf");

            // Choose a name for your collection
            const collection = database.collection("SampleImages");

            // Generate a random number between 1 and 886
            const randomNumber = Math.floor(Math.random() * 886) + 1;
            const imageName = `img${randomNumber}`; // Construct the image name

            // Fetch data from the collection where name matches the random image
            const allData = await collection.find({ name: imageName }).toArray();

            // Check if any data was returned
            if (allData.length > 0) {
                res.status(200).json(allData[0]); // Return the first matching document
            } else {
                res.status(404).json({ message: "Image not found." }); // Handle case when no image is found
            }
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(500).json({ message: "Something went wrong!" });
        } finally {
            await client.close(); // Ensure the client is closed
        }
    } else {
        res.status(405).json({ message: "Method not allowed!" });
    }
}
