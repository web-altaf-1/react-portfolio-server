const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId, } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;

// middleware 
app.use(cors({ origin: '*' }));
app.options('*', cors());

app.use(express.json());

const uri = `mongodb+srv://${process.env.Create_React_App_Username}:${process.env.Create_React_App_Password}@cluster0.erceo3u.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        await client.connect();
        console.log('database connected');
        const projectsCollection = client.db("data").collection("projects");



        app.get('/all-project', async (req, res) => {
            const query = {};
            const projects = projectsCollection.find(query)
            const data = await projects.toArray();
            res.send(data)
        });

        app.get('/all-project/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };

            const service = await projectsCollection.findOne(query);
            res.send(service);

        });


    }
    finally {

    }
}
run().catch(console.dir)





app.get('/', (req, res) => {
    res.send('Server was running !!')
})


app.listen(port, () => {
    console.log('listening to the port', port);
})