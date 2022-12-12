import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

const router = express.Router();

type Metadata = { [k: string]: string };

const getImageFromMetadata = (metadata: Metadata) => {
  if (!!metadata['og:image']) {
    return metadata['og:image'];
  }

  if (!!metadata['twitter:image']) {
    return metadata['twitter:image'];
  }
};

router.get('/metadata', async (req, res) => {
  const { url } = req.query;
  try {
    const response = await fetch(url as string);
    const body = await response.text();
    const root = parse(body);

    const metatags = root.querySelectorAll('meta');

    const metadata = metatags.reduce<Metadata>((acc, curr) => {
      const name = curr.getAttribute('name') ?? curr.getAttribute('property');
      const content = curr.getAttribute('content');

      if (!name || !content) return acc;

      return {
        ...acc,
        [name]: content,
      };
    }, {});

    res
      .json({
        ...metadata,
        image: getImageFromMetadata(metadata),
      })
      .end();
  } catch (e) {
    res.json({}).end();
  }
});

const app = express();

app.use(cors());

app.use('/api', router);

export const handler = app;
