# Blog upload pipeline

Paste your full "upload these blogs" message into:

`user-upload-raw.txt`

Then run from project root:

```bash
node scripts/split-user-blogs.mjs
node scripts/convert-blog-text.mjs --inline
```

This inlines all 6 blogs (IDs 226–231) into `src/data/blogsData.ts` with proper HTML.
