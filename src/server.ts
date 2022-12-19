import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';
import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 60 * 60 * 2, // 2 hours
});

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

  if (cache.has(url as string)) {
    const cached = cache.get(url as string);
    res.status(200).json(cached).end();
    return;
  }

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

    const payload = {
      ...metadata,
      image: getImageFromMetadata(metadata),
    };

    cache.set(url as string, payload);

    res.json(payload).end();
  } catch (e) {
    res.json(e).end();
  }
});

const app = express();

app.use(cors());

app.use('/api', router);

export const handler = app;
