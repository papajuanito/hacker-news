import express from 'express';
import urlMetadata from 'url-metadata';
import cors from 'cors';

const router = express.Router();

router.get('/metadata', async (req, res) => {
  const { url } = req.query;
  try {
    const metadata = await urlMetadata(url as string);

    res.json(metadata).end();
  } catch (e) {
    res.json({}).end();
  }
});

const app = express();

app.use(cors());

app.use('/api', router);

export const handler = app;
