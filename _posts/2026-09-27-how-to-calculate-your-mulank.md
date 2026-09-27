---
title: "How to Calculate Your Mulank (Root Number) — Free Calculator"
category: Numerology
permalink: /mulank-calculator/
description: "Find your Mulank in seconds. Enter your date of birth to discover your root number (1–9), its ruling planet, your strengths and what to watch for."
---

Your **Mulank**, or root number, comes from the day you were born. In Indian numerology it is the number that shapes your natural personality: how you think, react and relate to the world. It is also the number used in our **weekly tarot readings**, so knowing it helps you find the guidance meant for you.

<div class="calc" id="mulankCalc">
  <p class="calc-label">✦ Mulank Calculator ✦</p>
  <label class="calc-field" for="dobInput">Your date of birth</label>
  <div class="calc-row">
    <input type="date" id="dobInput" min="1900-01-01" max="2100-12-31" required>
    <button type="button" class="btn-primary" id="calcBtn">Reveal my Mulank</button>
  </div>
  <p class="calc-error" id="calcError" role="alert"></p>

  <div class="calc-result" id="calcResult" hidden aria-live="polite">
    <div class="calc-number-wrap">
      <span class="calc-number" id="resNumber">1</span>
      <span class="calc-caption">Your Mulank</span>
    </div>
    <div class="calc-detail">
      <p class="calc-planet">Ruled by <strong id="resPlanet"></strong></p>
      <p class="calc-working" id="resWorking"></p>
      <p><strong>Your nature:</strong> <span id="resTraits"></span></p>
      <p><strong>Your strengths:</strong> <span id="resStrengths"></span></p>
      <p><strong>Watch out for:</strong> <span id="resWatch"></span></p>
      <p class="calc-bhagyank">Your <strong>Bhagyank</strong> (destiny number) is <strong id="resBhagyank"></strong>, calculated as <span id="resBhagyankWorking"></span>.</p>
      <div class="calc-actions">
        {% assign tarot_posts = site.posts | where: "category", "Weekly Tarot" %}
        {% if tarot_posts.size > 0 %}<a class="btn-primary" id="resWeekly" href="{{ tarot_posts.first.url | relative_url }}">Read this week's reading for you</a>{% endif %}
        <a class="btn-ghost" href="{{ '/#book' | relative_url }}">Get a full numerology reading</a>
      </div>
    </div>
  </div>
</div>

## How to calculate your Mulank yourself

It takes one simple step: **add the digits of the day you were born until you get a single number from 1 to 9.** The month and year are not used.

| Born on | Working | Mulank |
|---|---|---|
| 7th | 7 | **7** |
| 14th | 1 + 4 = 5 | **5** |
| 28th | 2 + 8 = 10 → 1 + 0 = 1 | **1** |
| 29th | 2 + 9 = 11 → 1 + 1 = 2 | **2** |
{: .calc-table}

So everyone born on the 1st, 10th, 19th or 28th of any month has **Mulank 1**, everyone born on the 2nd, 11th, 20th or 29th has **Mulank 2**, and so on.

## Mulank and its ruling planet

| Mulank | Born on | Ruling planet | Key energy |
|---|---|---|---|
| 1 | 1, 10, 19, 28 | Sun (Surya) | Leadership, independence, ambition |
| 2 | 2, 11, 20, 29 | Moon (Chandra) | Sensitivity, intuition, harmony |
| 3 | 3, 12, 21, 30 | Jupiter (Guru) | Wisdom, optimism, expression |
| 4 | 4, 13, 22, 31 | Rahu | Originality, hard work, change |
| 5 | 5, 14, 23 | Mercury (Budh) | Communication, adaptability, business |
| 6 | 6, 15, 24 | Venus (Shukra) | Love, beauty, responsibility |
| 7 | 7, 16, 25 | Ketu | Spirituality, analysis, inner wisdom |
| 8 | 8, 17, 26 | Saturn (Shani) | Discipline, patience, perseverance |
| 9 | 9, 18, 27 | Mars (Mangal) | Courage, energy, compassion |
{: .calc-table}

## Mulank vs Bhagyank: what's the difference?

Your **Mulank** (root number) describes *who you are*: your personality, instincts and how others experience you. Your **Bhagyank** (destiny number) is calculated from your *complete* date of birth and describes *where life is leading you*: your purpose, lessons and the path that unfolds over time.

For example, for 28 August 1990: Mulank = 2 + 8 = 10 → **1**, and Bhagyank = 2 + 8 + 0 + 8 + 1 + 9 + 9 + 0 = 37 → 3 + 7 = 10 → **1**.

## What your number can't tell you on its own

Your Mulank is a starting point, not the whole story. A complete reading looks at how your Mulank, Bhagyank, name number and even your mobile number work together, and whether they support or pull against each other. That's where the real insight lies.
