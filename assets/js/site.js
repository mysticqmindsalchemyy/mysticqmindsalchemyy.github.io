/* Mysticq Minds Alchemyy — shared script for Insights pages */
(function () {
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ── Mobile menu ── */
  var toggle = document.getElementById('siteNavToggle');
  var links = document.getElementById('siteNavLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) { toggle.click(); toggle.focus(); }
    });
  }

  /* ── About dropdown (click/tap + keyboard; hover handled in CSS) ── */
  document.querySelectorAll('.has-sub').forEach(function (item) {
    var btn = item.querySelector('.sub-toggle');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function (e) {
      if (!item.contains(e.target)) { item.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    });
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { item.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    });
  });

  /* ── Weekly tarot: if the newest reading's week has ended, say "Latest" instead of "This week" ── */
  document.querySelectorAll('[data-week-end]').forEach(function (box) {
    var end = Number(box.getAttribute('data-week-end'));
    if (!end || Date.now() / 1000 < end) return;
    box.querySelectorAll('[data-stale-text]').forEach(function (el) { el.textContent = el.getAttribute('data-stale-text'); });
    if (box.hasAttribute('data-stale-text')) box.textContent = box.getAttribute('data-stale-text');
    box.querySelectorAll('.stale-note').forEach(function (n) { n.hidden = false; });
  });

  /* ── Weekly tarot: open the week chosen in the selector ── */
  var weekSelect = document.getElementById('weekSelect');
  if (weekSelect) {
    weekSelect.addEventListener('change', function () {
      if (weekSelect.value) window.location.href = weekSelect.value;
    });
  }

  /* ── Mystic Musings: filter by topic ── */
  var chips = document.querySelectorAll('.filter-chip');
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var f = chip.getAttribute('data-filter');
        chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
        document.querySelectorAll('.post-item').forEach(function (item) {
          item.hidden = !(f === 'all' || item.getAttribute('data-cat') === f);
        });
      });
    });
  }

  /* ── Numerology helpers ── */
  function reduce(n) {
    var steps = [];
    while (n > 9) {
      var digits = String(n).split('');
      var sum = digits.reduce(function (a, d) { return a + Number(d); }, 0);
      steps.push(digits.join(' + ') + ' = ' + sum);
      n = sum;
    }
    return { value: n, steps: steps };
  }

  var MULANK = {
    1: { planet: 'the Sun (Surya)', traits: 'A natural leader: independent, ambitious and original.', strengths: 'Confidence, initiative, determination.', watch: 'Ego, impatience and wanting control.' },
    2: { planet: 'the Moon (Chandra)', traits: 'Gentle, intuitive and deeply caring, a natural peacemaker.', strengths: 'Empathy, diplomacy, creativity.', watch: 'Mood swings, overthinking and self-doubt.' },
    3: { planet: 'Jupiter (Guru)', traits: 'Wise, optimistic and expressive, a born guide and teacher.', strengths: 'Knowledge, positivity, communication.', watch: 'Overcommitting and being too idealistic.' },
    4: { planet: 'Rahu', traits: 'Unconventional, hardworking and systematic, you see things differently.', strengths: 'Discipline, practicality, fresh thinking.', watch: 'Sudden ups and downs and stubbornness.' },
    5: { planet: 'Mercury (Budh)', traits: 'Quick-witted, adaptable and curious, you love variety and people.', strengths: 'Communication, business sense, versatility.', watch: 'Restlessness and scattered focus.' },
    6: { planet: 'Venus (Shukra)', traits: 'Loving, graceful and responsible, you create harmony and beauty.', strengths: 'Care, charm, artistic sense.', watch: 'People-pleasing and over-indulgence.' },
    7: { planet: 'Ketu', traits: 'Spiritual, analytical and introspective, you seek deeper truths.', strengths: 'Intuition, research, inner wisdom.', watch: 'Isolation and emotional detachment.' },
    8: { planet: 'Saturn (Shani)', traits: 'Patient, disciplined and resilient, success comes through perseverance.', strengths: 'Endurance, responsibility, fairness.', watch: 'Delays, pessimism and carrying burdens alone.' },
    9: { planet: 'Mars (Mangal)', traits: 'Courageous, energetic and compassionate, a protector at heart.', strengths: 'Bravery, drive, generosity.', watch: 'Anger and acting on impulse.' }
  };

  /* ── Mulank calculator ── */
  var calc = document.getElementById('mulankCalc');
  if (calc) {
    var input = document.getElementById('dobInput');
    var btn = document.getElementById('calcBtn');
    var err = document.getElementById('calcError');
    var result = document.getElementById('calcResult');

    function show() {
      err.textContent = '';
      var v = input.value; // YYYY-MM-DD
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) { err.textContent = 'Please choose your full date of birth.'; result.hidden = true; return; }
      var parts = v.split('-');
      var day = Number(parts[2]);
      var mul = reduce(day);
      var allDigits = (parts[2] + parts[1] + parts[0]).split('');
      var total = allDigits.reduce(function (a, d) { return a + Number(d); }, 0);
      var bhag = reduce(total);
      var info = MULANK[mul.value];

      document.getElementById('resNumber').textContent = mul.value;
      document.getElementById('resPlanet').textContent = info.planet;
      var sfx = (day % 100 >= 11 && day % 100 <= 13) ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[day % 10] || 'th');
      var born = 'Born on the ' + day + sfx;
      document.getElementById('resWorking').textContent = mul.steps.length
        ? born + ': ' + mul.steps.join(' → ') + ' → Mulank ' + mul.value
        : born + ' → Mulank ' + mul.value;
      document.getElementById('resTraits').textContent = info.traits;
      document.getElementById('resStrengths').textContent = info.strengths;
      document.getElementById('resWatch').textContent = info.watch;
      document.getElementById('resBhagyank').textContent = bhag.value;
      var working = allDigits.join(' + ') + ' = ' + total;
      bhag.steps.forEach(function (s) { working += ' → ' + s; });
      document.getElementById('resBhagyankWorking').textContent = working;

      var weekly = document.getElementById('resWeekly');
      if (weekly) weekly.href = weekly.href.split('#')[0] + '#mulank-' + mul.value;

      result.hidden = false;
      store.set('myma-mulank-dob', String(mul.value));
      result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    btn.addEventListener('click', show);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') show(); });
  }

  /* ── Weekly tarot: "jump to your Mulank" chips + pinned mini bar ── */
  var jump = document.getElementById('mulankJump');
  if (jump) {
    var chipWrap = document.getElementById('mulankJumpChips');
    var mini = document.getElementById('mulankMini');
    var miniWrap = document.getElementById('mulankMiniChips');
    // Only a Mulank worked out with the calculator counts as "yours"
    var saved = store.get('myma-mulank-dob');
    try { window.localStorage.removeItem('myma-mulank'); } catch (e) {}
    var cards = [];

    function makeChip(n, small) {
      var a = document.createElement('a');
      a.href = '#mulank-' + n;
      a.className = (small ? 'mini-chip' : 'jump-chip') + (saved === n ? ' is-yours' : '');
      a.textContent = n;
      a.setAttribute('aria-label', 'Mulank ' + n);
      a.setAttribute('data-n', n);
      return a;
    }

    document.querySelectorAll('.post-body h2').forEach(function (h) {
      var m = h.textContent.match(/mulank\s*([1-9])/i);
      if (!m) return;
      var n = m[1];
      var section = document.createElement('section');
      section.className = 'mulank-card';
      section.id = 'mulank-' + n;
      section.setAttribute('data-n', n);
      h.parentNode.insertBefore(section, h);
      var node = h;
      while (node && !(node !== h && node.tagName === 'H2')) {
        var next = node.nextSibling;
        section.appendChild(node);
        node = next;
      }
      if (saved === n) {
        section.classList.add('is-yours');
        var tag = document.createElement('span');
        tag.className = 'yours-tag';
        tag.textContent = 'Your Mulank';
        h.appendChild(tag);
      }
      chipWrap.appendChild(makeChip(n, false));
      if (miniWrap) miniWrap.appendChild(makeChip(n, true));
      cards.push(section);
    });

    if (cards.length) {
      jump.hidden = false;

      if (mini && 'IntersectionObserver' in window) {
        // Show the slim number bar once the big 1–9 buttons scroll out of view,
        // and hide it again after the last Mulank card.
        var jumpVisible = true, pastEnd = false;
        var navH = function () { return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80; };
        function updateMini() {
          var show = !jumpVisible && !pastEnd;
          mini.hidden = false;
          mini.classList.toggle('show', show);
          document.body.classList.toggle('mini-on', show);
        }
        new IntersectionObserver(function (e) {
          jumpVisible = e[0].isIntersecting || e[0].boundingClientRect.top > 0;
          updateMini();
        }, { rootMargin: '-' + navH() + 'px 0px 0px 0px' }).observe(jump);

        new IntersectionObserver(function (e) {
          var last = e[0];
          pastEnd = !last.isIntersecting && last.boundingClientRect.bottom < navH();
          updateMini();
        }).observe(cards[cards.length - 1]);

        // Highlight the Mulank currently being read
        var current = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            var n = en.target.getAttribute('data-n');
            miniWrap.querySelectorAll('.mini-chip').forEach(function (c) {
              c.classList.toggle('is-current', c.getAttribute('data-n') === n);
            });
          });
        }, { rootMargin: '-40% 0px -55% 0px' });
        cards.forEach(function (c) { current.observe(c); });
      }
    }
  }
})();
