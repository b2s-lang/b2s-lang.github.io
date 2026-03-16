/**
 * Brain2Speech project page — audio samples table & copy BibTeX.
 *
 * TO ADD/EDIT AUDIO SAMPLES:
 * 1. Put audio files in assets/audio/ (e.g. .wav, .mp3).
 * 2. Edit AUDIO_COLUMNS (model/condition names).
 * 3. Edit AUDIO_SAMPLES: each item = one row; keys must match AUDIO_COLUMNS; values = paths (e.g. "assets/audio/gt_1.wav").
 * 4. Use null for a missing file — a placeholder will be shown.
 */

(function () {
  'use strict';

  // ——— Editable: column headers (Text transcript + 3 baselines + Brain2Speech-Net) ———
  var AUDIO_COLUMNS = ['Text transcript', 'NTS-Cascade (5-gram)', 'NTS-Cascade (5-gram + LLM)', 'DSU-baseline', 'Brain2Speech-Net'];

  var TRANSCRIPTS = [
    "the man's eyelids fluttered",
    "actually it makes sense to a certain extent",
    "so you travel a lot",
    "so rules we made in unabashed collusion",
    "it was nice talking to you dudley",
    "i'm kind of out of it right now",
    "that's what i was going to point out",
    "it was a great pleasure speaking with you",
    "most points at the end wins",
    "lived on a farm for sixty years"
  ];

  // ——— Editable: 10 samples; each row = one utterance with transcript + paths for audio columns ———
  var AUDIO_SAMPLES = [
    { rowLabel: '1', transcript: TRANSCRIPTS[0], 'NTS-Cascade (5-gram)': 'assets/audio/b1_1.wav', 'NTS-Cascade (5-gram + LLM)': 'assets/audio/b2_1.wav', 'DSU-baseline': 'assets/audio/b3_1.wav', 'Brain2Speech-Net': 'assets/audio/b2s_1.wav' },
    { rowLabel: '2', transcript: TRANSCRIPTS[1], 'NTS-Cascade (5-gram)': 'assets/audio/b1_2.wav', 'NTS-Cascade (5-gram + LLM)': 'assets/audio/b2_2.wav', 'DSU-baseline': 'assets/audio/b3_2.wav', 'Brain2Speech-Net': 'assets/audio/b2s_2.wav' },
    { rowLabel: '3', transcript: TRANSCRIPTS[2], 'NTS-Cascade (5-gram)': 'assets/audio/b1_3.wav', 'NTS-Cascade (5-gram + LLM)': 'assets/audio/b2_3.wav', 'DSU-baseline': 'assets/audio/b3_3.wav', 'Brain2Speech-Net': 'assets/audio/b2s_3.wav' },
    { rowLabel: '4', transcript: TRANSCRIPTS[3], 'NTS-Cascade (5-gram)': 'assets/audio/b1_4.wav', 'NTS-Cascade (5-gram + LLM)': 'assets/audio/b2_4.wav', 'DSU-baseline': 'assets/audio/b3_4.wav', 'Brain2Speech-Net': 'assets/audio/b2s_4.wav' },
    { rowLabel: '5', transcript: TRANSCRIPTS[4], 'NTS-Cascade (5-gram)': 'assets/audio/b1_5.wav', 'NTS-Cascade (5-gram + LLM)': 'assets/audio/b2_5.wav', 'DSU-baseline': 'assets/audio/b3_5.wav', 'Brain2Speech-Net': 'assets/audio/b2s_5.wav' },
    { rowLabel: '6', transcript: TRANSCRIPTS[5], 'NTS-Cascade (5-gram)': 'assets/audio/b1_6.wav', 'NTS-Cascade (5-gram + LLM)': 'assets/audio/b2_6.wav', 'DSU-baseline': 'assets/audio/b3_6.wav', 'Brain2Speech-Net': 'assets/audio/b2s_6.wav' },
    { rowLabel: '7', transcript: TRANSCRIPTS[6], 'NTS-Cascade (5-gram)': 'assets/audio/b1_7.wav', 'NTS-Cascade (5-gram + LLM)': 'assets/audio/b2_7.wav', 'DSU-baseline': 'assets/audio/b3_7.wav', 'Brain2Speech-Net': 'assets/audio/b2s_7.wav' },
    { rowLabel: '8', transcript: TRANSCRIPTS[7], 'NTS-Cascade (5-gram)': 'assets/audio/b1_8.wav', 'NTS-Cascade (5-gram + LLM)': 'assets/audio/b2_8.wav', 'DSU-baseline': 'assets/audio/b3_8.wav', 'Brain2Speech-Net': 'assets/audio/b2s_8.wav' },
    { rowLabel: '9', transcript: TRANSCRIPTS[8], 'NTS-Cascade (5-gram)': 'assets/audio/b1_9.wav', 'NTS-Cascade (5-gram + LLM)': 'assets/audio/b2_9.wav', 'DSU-baseline': 'assets/audio/b3_9.wav', 'Brain2Speech-Net': 'assets/audio/b2s_9.wav' },
    { rowLabel: '10', transcript: TRANSCRIPTS[9], 'NTS-Cascade (5-gram)': 'assets/audio/b1_10.wav', 'NTS-Cascade (5-gram + LLM)': 'assets/audio/b2_10.wav', 'DSU-baseline': 'assets/audio/b3_10.wav', 'Brain2Speech-Net': 'assets/audio/b2s_10.wav' }
  ];

  function buildAudioTable(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    var table = document.createElement('table');
    table.className = 'audio-table';
    table.setAttribute('role', 'table');

    var colgroup = document.createElement('colgroup');
    var colCorner = document.createElement('col');
    colCorner.className = 'col-label';
    colgroup.appendChild(colCorner);
    AUDIO_COLUMNS.forEach(function (col, c) {
      var colEl = document.createElement('col');
      colEl.className = col === 'Text transcript' ? 'col-transcript' : 'col-audio';
      colgroup.appendChild(colEl);
    });
    table.appendChild(colgroup);

    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');
    var corner = document.createElement('th');
    corner.className = 'audio-th audio-th-corner';
    corner.scope = 'col';
    corner.textContent = '';
    headerRow.appendChild(corner);
    AUDIO_COLUMNS.forEach(function (col) {
      var th = document.createElement('th');
      th.className = 'audio-th';
      th.scope = 'col';
      th.textContent = col;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement('tbody');
    AUDIO_SAMPLES.forEach(function (sample) {
      var tr = document.createElement('tr');
      var rowLabel = document.createElement('th');
      rowLabel.className = 'audio-th audio-th-row';
      rowLabel.scope = 'row';
      rowLabel.textContent = sample.rowLabel != null ? sample.rowLabel : '';
      tr.appendChild(rowLabel);
      AUDIO_COLUMNS.forEach(function (col) {
        var td = document.createElement('td');
        td.className = col === 'Text transcript' ? 'audio-td audio-td-transcript' : 'audio-td';
        if (col === 'Text transcript') {
          td.textContent = sample.transcript != null ? sample.transcript : '';
        } else {
          var path = sample[col];
          if (path) {
            var wrap = document.createElement('div');
            wrap.className = 'audio-player-wrap';
            var audio = document.createElement('audio');
            audio.controls = true;
            audio.preload = 'metadata';
            audio.setAttribute('aria-label', 'Audio: ' + col + ', sample ' + sample.rowLabel);
            var src = document.createElement('source');
            src.src = path;
            audio.appendChild(src);
            audio.addEventListener('error', function () {
              wrap.innerHTML = '';
              var fallback = document.createElement('span');
              fallback.className = 'audio-placeholder';
              fallback.textContent = 'Audio not found';
              wrap.appendChild(fallback);
            });
            wrap.appendChild(audio);
            td.appendChild(wrap);
          } else {
            var placeholder = document.createElement('div');
            placeholder.className = 'audio-placeholder';
            placeholder.textContent = 'Sample not available';
            td.appendChild(placeholder);
          }
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    container.appendChild(table);
  }

  function setupCopyBibtex(buttonId, sourceId) {
    var btn = document.getElementById(buttonId);
    var pre = document.getElementById(sourceId);
    if (!btn || !pre) return;
    var code = pre ? pre.querySelector('code') : null;
    btn.addEventListener('click', function () {
      var text = code ? code.textContent : (pre ? pre.textContent : '');
      if (!text) return;
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = 'Copied!';
        setTimeout(function () { btn.textContent = 'Copy BibTeX'; }, 2000);
      }).catch(function () {
        btn.textContent = 'Copy failed';
        setTimeout(function () { btn.textContent = 'Copy BibTeX'; }, 2000);
      });
    });
  }

  buildAudioTable('audio-table');
  setupCopyBibtex('copy-bibtex', 'bibtex-block');
})();
