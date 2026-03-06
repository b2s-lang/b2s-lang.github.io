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

  // ——— Editable: column headers (models/conditions) ———
  var AUDIO_COLUMNS = ['Ground Truth', 'Baseline 1', 'Baseline 2', 'Brain2Speech-Net'];

  // ——— Editable: rows = utterances; each key in row must exist in AUDIO_COLUMNS; value = path or null ———
  var AUDIO_SAMPLES = [
    { rowLabel: '1', 'Ground Truth': 'assets/audio/gt_1.wav', 'Baseline 1': 'assets/audio/b1_1.wav', 'Baseline 2': 'assets/audio/b2_1.wav', 'Brain2Speech-Net': 'assets/audio/b2s_1.wav' },
    { rowLabel: '2', 'Ground Truth': 'assets/audio/gt_2.wav', 'Baseline 1': 'assets/audio/b1_2.wav', 'Baseline 2': 'assets/audio/b2_2.wav', 'Brain2Speech-Net': 'assets/audio/b2s_2.wav' },
    { rowLabel: '3', 'Ground Truth': null, 'Baseline 1': null, 'Baseline 2': null, 'Brain2Speech-Net': null }
  ];

  function buildAudioTable(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var numUtterances = AUDIO_SAMPLES.length;
    var table = document.createElement('div');
    table.className = 'audio-table';
    table.style.gridTemplateColumns = 'minmax(10rem, 1fr) repeat(' + numUtterances + ', minmax(200px, 1fr))';

    // Header row: empty corner + utterance labels (1, 2, 3, ...)
    var headerRow = document.createElement('div');
    headerRow.className = 'audio-row audio-row-header';
    headerRow.setAttribute('role', 'row');
    var emptyCell = document.createElement('div');
    emptyCell.className = 'audio-cell audio-cell-label';
    emptyCell.setAttribute('role', 'columnheader');
    emptyCell.textContent = '';
    headerRow.appendChild(emptyCell);
    for (var u = 0; u < numUtterances; u++) {
      var th = document.createElement('div');
      th.className = 'audio-cell';
      th.setAttribute('role', 'columnheader');
      th.textContent = AUDIO_SAMPLES[u].rowLabel != null ? String(AUDIO_SAMPLES[u].rowLabel) : '';
      headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    // Data rows: one per model; first cell = model name (dark), then one cell per utterance
    AUDIO_COLUMNS.forEach(function (modelName) {
      var tr = document.createElement('div');
      tr.className = 'audio-row';
      tr.setAttribute('role', 'row');
      var labelCell = document.createElement('div');
      labelCell.className = 'audio-cell audio-cell-model';
      labelCell.setAttribute('role', 'rowheader');
      labelCell.textContent = modelName;
      tr.appendChild(labelCell);
      AUDIO_SAMPLES.forEach(function (sample, uIndex) {
        var cell = document.createElement('div');
        cell.className = 'audio-cell';
        var path = sample[modelName];
        if (path) {
          var wrap = document.createElement('div');
          wrap.className = 'audio-player-wrap';
          var audio = document.createElement('audio');
          audio.controls = true;
          audio.preload = 'metadata';
          audio.setAttribute('aria-label', 'Audio: ' + modelName + ', sample ' + (sample.rowLabel != null ? sample.rowLabel : (uIndex + 1)));
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
          cell.appendChild(wrap);
        } else {
          var placeholder = document.createElement('div');
          placeholder.className = 'audio-placeholder';
          placeholder.textContent = 'Sample not available';
          cell.appendChild(placeholder);
        }
        tr.appendChild(cell);
      });
      table.appendChild(tr);
    });

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
