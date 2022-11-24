import express from 'express';
import urlMetadata from 'url-metadata';
import cors from 'cors';

const PORT = 3000;

const router = express.Router();

router.get('/metadata', async (req, res) => {
  const { url } = req.query;
  const metadata = await urlMetadata(url as string);
  res.json(metadata).end();
});

const app = express();

app.use(cors());

app.use('/api', router);

export const handler = app;
