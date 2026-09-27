# How to publish your weekly tarot reading

You only ever create ONE new file per week. Everything else
(Weekly Tarot page, Mystic Musings page, homepage banner, sitemap) updates itself.

## Every week (about 5 minutes)

1. On GitHub, open your repository and click the **_posts** folder.
2. Click **Add file → Create new file**.
3. Name the file with today's date and a short title, all lowercase,
   words joined with hyphens, ending in .md, for example:

       2026-10-04-weekly-tarot-4-10-oct-2026.md

   The date at the start (YYYY-MM-DD) is the publish date.
4. Open **_templates/weekly-tarot-TEMPLATE.md**, click the copy icon,
   and paste everything into your new file.
5. Change the dates in the top section, then write your reading:
   - Keep the three dashes (---) at the top and after "description".
   - Keep each heading exactly like this: ## Mulank 1 — Card Name
     (the website uses "Mulank" + the number to build the 1–9 buttons).
6. Click **Commit changes**. Your post is live in 1–2 minutes at
   www.mystic-mind-alchemy.com/weekly-tarot/ (this week) and /musings/ (all posts)

## Adding a picture (optional)

1. Upload the image into the **assets/img** folder (keep file names
   simple, e.g. star-card.jpg, under 500 KB).
2. In your post, add this line where the picture should appear:

       ![The Star card](/assets/img/star-card.jpg)

## Writing tips

- **bold** → **text**      *italics* → *text*
- A blank line starts a new paragraph.
- To fix a typo later, open the post in _posts, click the pencil,
  edit, and commit again.

## Other kinds of posts

Use the same steps, but start from this shorter top section:

    ---
    title: "Your post title"
    category: Numerology
    description: "One or two sentences that appear in Google and on the Mystic Musings page."
    ---

Categories in use: Weekly Tarot, Numerology. You can add new ones
such as Reiki or Coaching — the Mystic Musings page creates a filter
button for each category automatically.
