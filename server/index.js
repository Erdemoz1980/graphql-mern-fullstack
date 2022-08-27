import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js';
import cors from 'cors';

dotenv.config();
connectDb();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:process.env.NODE_ENV = 'development'
}))

app.listen(port, () => console.log(`Server listenning on PORT:${port}`));

