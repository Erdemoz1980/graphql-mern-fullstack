import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import cors from 'cors';

dotenv.config();

connectDB();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:process.env.NODE_ENV === 'development'
}))


app.listen(port, () => console.log(`Server is listenning on PORT:${process.env.port}`));
