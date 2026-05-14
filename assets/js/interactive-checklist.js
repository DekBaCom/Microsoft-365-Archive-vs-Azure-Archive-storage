(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var pageKey = window.location.pathname;

    // Find all lists that contain disabled checkboxes (rendered from Markdown task lists)
    var allLists = document.querySelectorAll('ul, ol');
    var taskLists = [];

    allLists.forEach(function (list) {
      if (list.querySelector('input[type="checkbox"]')) {
        taskLists.push(list);
      }
    });

    if (taskLists.length === 0) return;

    taskLists.forEach(function (taskList, listIndex) {
      var checkboxes = taskList.querySelectorAll('input[type="checkbox"]');

      checkboxes.forEach(function (checkbox, checkIndex) {
        var key = 'checklist::' + pageKey + '::' + listIndex + '::' + checkIndex;

        // Enable interaction
        checkbox.removeAttribute('disabled');

        // Restore saved state
        if (localStorage.getItem(key) === 'true') {
          checkbox.checked = true;
          applyStyle(checkbox);
        }

        // Persist on change
        checkbox.addEventListener('change', function () {
          localStorage.setItem(key, checkbox.checked ? 'true' : 'false');
          applyStyle(checkbox);
          updateProgress(progressEl, taskList);
        });
      });

      // --- Controls container ---
      var controls = document.createElement('div');
      controls.className = 'checklist-controls';

      // Progress badge
      var progressEl = document.createElement('span');
      progressEl.className = 'checklist-progress';
      updateProgress(progressEl, taskList);

      // Export button
      var exportBtn = document.createElement('button');
      exportBtn.className = 'checklist-export-btn';
      exportBtn.setAttribute('type', 'button');
      exportBtn.textContent = '📥 Export CSV';
      exportBtn.addEventListener('click', function () {
        exportCSV(taskList, listIndex, pageKey);
      });

      // Reset button
      var resetBtn = document.createElement('button');
      resetBtn.className = 'checklist-reset-btn';
      resetBtn.setAttribute('type', 'button');
      resetBtn.textContent = '🔄 Reset';
      resetBtn.addEventListener('click', function () {
        var cbs = taskList.querySelectorAll('input[type="checkbox"]');
        cbs.forEach(function (cb, ci) {
          var k = 'checklist::' + pageKey + '::' + listIndex + '::' + ci;
          cb.checked = false;
          localStorage.setItem(k, 'false');
          applyStyle(cb);
        });
        updateProgress(progressEl, taskList);
      });

      controls.appendChild(progressEl);
      controls.appendChild(exportBtn);
      controls.appendChild(resetBtn);
      taskList.parentNode.insertBefore(controls, taskList.nextSibling);
    });

    // --- Helpers ---

    function applyStyle(checkbox) {
      var li = checkbox.closest('li');
      if (!li) return;
      if (checkbox.checked) {
        li.classList.add('task-item-checked');
      } else {
        li.classList.remove('task-item-checked');
      }
    }

    function updateProgress(el, taskList) {
      var total = taskList.querySelectorAll('input[type="checkbox"]').length;
      var checked = taskList.querySelectorAll('input[type="checkbox"]:checked').length;
      var pct = total > 0 ? Math.round((checked / total) * 100) : 0;
      el.textContent = checked + '/' + total + ' รายการ (' + pct + '%)';
    }

    function getPrecedingHeading(element) {
      var el = element.previousElementSibling;
      while (el) {
        if (/^H[1-6]$/.test(el.tagName)) return el.textContent.trim();
        el = el.previousElementSibling;
      }
      var h1 = document.querySelector('h1');
      return h1 ? h1.textContent.trim() : 'Checklist';
    }

    function exportCSV(taskList, listIndex, pageKey) {
      var checkboxes = taskList.querySelectorAll('input[type="checkbox"]');
      var heading = getPrecedingHeading(taskList);
      var now = new Date().toLocaleDateString('th-TH', {
        year: 'numeric', month: 'long', day: 'numeric'
      });

      var rows = [
        ['หัวข้อ', heading],
        ['วันที่', now],
        ['URL', window.location.href],
        ['', ''],
        ['#', 'รายการ', 'สถานะ']
      ];

      checkboxes.forEach(function (cb, i) {
        var li = cb.closest('li');
        var text = li ? li.textContent.trim() : '';
        var status = cb.checked ? '✓ เสร็จแล้ว' : '○ ยังไม่ได้ทำ';
        rows.push([i + 1, text, status]);
      });

      var total = checkboxes.length;
      var checked = taskList.querySelectorAll('input[type="checkbox"]:checked').length;
      rows.push(['', '', '']);
      rows.push(['สรุป', checked + '/' + total + ' รายการ', Math.round((checked / total) * 100) + '%']);

      var csv = rows.map(function (row) {
        return row.map(function (cell) {
          return '"' + String(cell).replace(/"/g, '""') + '"';
        }).join(',');
      }).join('\r\n');

      // BOM for Excel Thai character support
      var blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      var safeName = heading.replace(/[^\w฀-๿]/g, '_').substring(0, 40);
      a.download = 'checklist_' + safeName + '.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  });
})();
