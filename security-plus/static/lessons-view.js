/* ------------------------------------------------------------------ *
 * EZLessons — standalone renderer for the PBQ lesson content, ported
 * to the Nocturne design system.
 *
 * Reads window.PBQ_DATA.lessons (array OR object map) and turns a
 * lesson's `blocks` array into an HTML string. Pure string building:
 * it never touches the DOM and never attaches listeners, so the caller
 * decides where the markup goes.
 *
 *   window.EZLessons.list()          -> [{id, eyebrow, title, minutes, summary}]
 *   window.EZLessons.render(lessonId) -> HTML string
 *
 * Block types: p, h, list, steps, keys, callout, table, diagram, log.
 * Styling uses only Nocturne custom properties + .tag/.table classes,
 * so it inherits whatever theme the host page has loaded.
 * ES5 only — no build step, no dependencies.
 * ------------------------------------------------------------------ */

(function () {
  "use strict";

  var MONO =
    "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace";

  /* Flag colour for bad/alert log lines (the one non-token colour the
     design brief allows, so alerts still read as alerts). */
  var FLAG = "oklch(0.68 0.17 25)";
  var FLAG_BG = "color-mix(in srgb, " + FLAG + " 14%, transparent)";

  /* ------------------------------ utils ------------------------------ */

  function esc(t) {
    return String(t == null ? "" : t)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function arr(v) {
    return Object.prototype.toString.call(v) === "[object Array]" ? v : [];
  }

  function has(list, v) {
    return list.indexOf(v) !== -1;
  }

  /* --------------------------- data access --------------------------- */

  /* Accepts either an array of lessons or an object map keyed by id.
     Always returns an array; an object map's keys become fallback ids. */
  function allLessons() {
    var data = window.PBQ_DATA;
    if (!data || !data.lessons) return [];
    var src = data.lessons;
    if (Object.prototype.toString.call(src) === "[object Array]") {
      return src.slice();
    }
    if (typeof src !== "object") return [];
    var out = [];
    for (var k in src) {
      if (!Object.prototype.hasOwnProperty.call(src, k)) continue;
      var l = src[k];
      if (!l || typeof l !== "object") continue;
      if (l.id == null) {
        var copy = {};
        for (var p in l) {
          if (Object.prototype.hasOwnProperty.call(l, p)) copy[p] = l[p];
        }
        copy.id = k;
        out.push(copy);
      } else {
        out.push(l);
      }
    }
    return out;
  }

  function findLesson(lessonId) {
    var lessons = allLessons();
    var i;
    for (i = 0; i < lessons.length; i++) {
      if (lessons[i] && String(lessons[i].id) === String(lessonId)) {
        return lessons[i];
      }
    }
    /* Fall back to a positional lookup so callers holding an index still work. */
    if (lessonId != null && String(lessonId).length && !isNaN(Number(lessonId))) {
      var n = Number(lessonId);
      if (n >= 0 && n < lessons.length) return lessons[n];
    }
    return null;
  }

  /* --------------------- diagram html -> plain text ------------------- */

  function decodeEntities(s) {
    return String(s)
      .replace(/&nbsp;/gi, " ")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&quot;/gi, '"')
      .replace(/&#0*39;/g, "'")
      .replace(/&apos;/gi, "'")
      .replace(/&middot;/gi, "·")
      .replace(/&amp;/gi, "&");
  }

  /* The authored diagrams ship as markup that leans on the OLD stylesheet's
     .topo classes, which do not exist in Nocturne. Rather than inject dead
     markup, flatten it to text and show it as a monospace figure — every
     label, arrow and annotation survives. Plain ASCII art is passed through
     untouched so its alignment is preserved. */
  function diagramText(html) {
    var s = String(html == null ? "" : html);
    if (!/<[a-zA-Z!\/]/.test(s)) return s.replace(/\s+$/, ""); /* ASCII art */

    s = s.replace(/<br\s*\/?>/gi, " ");
    s = s.replace(/<small\b[^>]*>/gi, " (").replace(/<\/small\s*>/gi, ") ");
    /* Block-level boundaries (open AND close) become line breaks. */
    s = s.replace(
      /<\/?(div|p|li|ul|ol|tr|table|thead|tbody|section|figure|figcaption|h[1-6])\b[^>]*>/gi,
      "\n"
    );
    s = s.replace(/<[^>]*>/g, " "); /* remaining inline tags -> separator */
    s = decodeEntities(s);

    var raw = s.split("\n");
    var lines = [];
    var i, t;
    for (i = 0; i < raw.length; i++) {
      t = raw[i]
        .replace(/\s+/g, " ")
        .replace(/\(\s+/g, "(")
        .replace(/\s+([),.;:!?])/g, "$1")
        .replace(/^[\s·]+|[\s]+$/g, "");
      if (t) lines.push(t);
    }

    /* Re-join connector-only lines ("→") with their neighbours so a flow
       diagram still reads as a flow instead of one token per line. */
    var out = [];
    for (i = 0; i < lines.length; i++) {
      if (
        /^[→←↔⇒⇐>«»\-=]+$/.test(lines[i]) &&
        out.length &&
        i + 1 < lines.length
      ) {
        out[out.length - 1] += " " + lines[i] + " " + lines[i + 1];
        i++;
      } else {
        out.push(lines[i]);
      }
    }
    return out.join("\n");
  }

  /* ---------------------------- block styles -------------------------- */

  var S = {
    p:
      "margin:0 0 14px;line-height:1.65;color:var(--color-text);" +
      "white-space:pre-wrap;",
    h:
      "font-family:var(--font-heading);font-weight:600;font-size:19px;" +
      "line-height:1.25;letter-spacing:-0.01em;margin:28px 0 10px;" +
      "color:var(--color-text);",
    listWrap: "margin:0 0 16px;padding-left:22px;color:var(--color-text);",
    listItem: "margin:0 0 7px;line-height:1.6;white-space:pre-wrap;",
    stepsWrap: "list-style:none;margin:0 0 18px;padding:0;",
    stepItem: "display:flex;align-items:flex-start;gap:12px;margin:0 0 11px;",
    stepNum:
      "flex:0 0 auto;display:inline-flex;align-items:center;" +
      "justify-content:center;width:24px;height:24px;border-radius:50%;" +
      "border:1px solid var(--color-accent);color:var(--color-accent);" +
      "font-family:var(--font-heading);font-size:12px;font-weight:600;" +
      "line-height:1;",
    stepText:
      "flex:1 1 auto;line-height:1.6;color:var(--color-text);" +
      "white-space:pre-wrap;",
    calloutText:
      "margin:0;line-height:1.6;color:var(--color-text);white-space:pre-wrap;",
    keysWrap:
      "margin:24px 0 18px;padding:14px 18px;border-radius:12px;" +
      "border:1px solid var(--color-accent);background:var(--color-surface);",
    keysTitle:
      "font-family:var(--font-heading);font-size:12px;font-weight:700;" +
      "letter-spacing:0.07em;text-transform:uppercase;" +
      "color:var(--color-accent);margin-bottom:10px;",
    keysList: "list-style:none;margin:0;padding:0;",
    keysItem: "display:flex;align-items:flex-start;gap:10px;margin:0 0 7px;",
    keysMark: "flex:0 0 auto;color:var(--color-accent);line-height:1.6;",
    keysText:
      "flex:1 1 auto;line-height:1.6;color:var(--color-text);" +
      "white-space:pre-wrap;",
    tableFig: "margin:0 0 20px;",
    tableScroll:
      "overflow-x:auto;border:1px solid var(--color-divider);" +
      "border-radius:10px;padding:2px 6px;background:var(--color-surface);",
    tdKey:
      "font-weight:600;color:var(--color-text);white-space:nowrap;" +
      "vertical-align:top;",
    td: "color:var(--color-neutral-300);vertical-align:top;",
    cap:
      "margin-top:8px;font-size:12px;text-align:center;" +
      "color:var(--color-neutral-500);",
    logIntro:
      "margin:4px 0 8px;font-size:14px;font-weight:600;color:var(--color-text);",
    logWrap:
      "margin:0 0 20px;border:1px solid var(--color-divider);" +
      "border-radius:10px;background:var(--color-bg);overflow:hidden;" +
      "font-family:" + MONO + ";font-size:12.5px;",
    logLine: "display:flex;align-items:baseline;gap:10px;padding:8px 12px;line-height:1.5;",
    logTag:
      "flex:0 0 auto;font-size:10px;font-weight:700;letter-spacing:0.05em;" +
      "padding:2px 6px;border-radius:5px;",
    logMeta: "flex:0 0 auto;color:var(--color-accent);font-weight:600;",
    logText: "flex:1 1 auto;word-break:break-word;white-space:pre-wrap;",
    diagFig: "margin:0 0 22px;",
    diagPre:
      "margin:0;padding:16px 18px;border:1px solid var(--color-divider);" +
      "border-radius:12px;background:var(--color-bg);" +
      "color:var(--color-neutral-300);font-family:" + MONO + ";" +
      "font-size:12.5px;line-height:1.7;white-space:pre-wrap;overflow-x:auto;"
  };

  /* Callout variants. The dark theme's token set has no semantic
     green/amber, so each variant is separated by border weight in the
     neutral ramp plus an always-visible label. */
  var VARIANTS = {
    key: { color: "var(--color-accent)", label: "Key idea", tag: "tag tag-outline" },
    warn: { color: "var(--color-neutral-300)", label: "Watch out", tag: "tag tag-neutral" },
    tip: { color: "var(--color-neutral-400)", label: "Tip", tag: "tag tag-neutral" },
    note: { color: "var(--color-neutral-600)", label: "Scenario", tag: "tag tag-neutral" }
  };

  /* ---------------------------- block render -------------------------- */

  function renderList(b) {
    var tag = b.ordered ? "ol" : "ul";
    var items = arr(b.items);
    var html = "";
    for (var i = 0; i < items.length; i++) {
      html += '<li style="' + S.listItem + '">' + esc(items[i]) + "</li>";
    }
    return "<" + tag + ' style="' + S.listWrap + '">' + html + "</" + tag + ">";
  }

  function renderSteps(b) {
    var items = arr(b.items);
    var html = "";
    for (var i = 0; i < items.length; i++) {
      html +=
        '<li style="' + S.stepItem + '">' +
        '<span aria-hidden="true" style="' + S.stepNum + '">' + (i + 1) + "</span>" +
        '<span style="' + S.stepText + '">' + esc(items[i]) + "</span>" +
        "</li>";
    }
    return '<ol style="' + S.stepsWrap + '">' + html + "</ol>";
  }

  function renderCallout(b) {
    var name = has(["tip", "warn", "key", "note"], b.variant) ? b.variant : "note";
    var v = VARIANTS[name];
    var title = b.title || v.label;
    /* Only badge when the title carries its own words — otherwise the
       badge and the title would say the same thing twice. */
    var sameWords =
      String(title).replace(/\s+/g, " ").toLowerCase().replace(/^ | $/g, "") ===
      v.label.toLowerCase();
    var badge = sameWords
      ? ""
      : '<span class="' + v.tag + '" style="flex:0 0 auto;">' + esc(v.label) + "</span>";
    var titleStyle =
      "font-family:var(--font-heading);font-size:12px;font-weight:700;" +
      "letter-spacing:0.06em;text-transform:uppercase;color:" + v.color + ";";
    return (
      '<div style="margin:0 0 18px;padding:12px 16px 13px;border-radius:10px;' +
      "border:1px solid var(--color-divider);border-left:4px solid " + v.color + ";" +
      'background:var(--color-surface);">' +
      '<div style="display:flex;align-items:center;gap:9px;margin-bottom:7px;' +
      'flex-wrap:wrap;">' +
      badge +
      '<span style="' + titleStyle + '">' + esc(title) + "</span>" +
      "</div>" +
      '<p style="' + S.calloutText + '">' + esc(b.text) + "</p>" +
      "</div>"
    );
  }

  function renderKeys(b) {
    var items = arr(b.items);
    var html = "";
    for (var i = 0; i < items.length; i++) {
      html +=
        '<li style="' + S.keysItem + '">' +
        '<span aria-hidden="true" style="' + S.keysMark + '">✓</span>' +
        '<span style="' + S.keysText + '">' + esc(items[i]) + "</span></li>";
    }
    return (
      '<div style="' + S.keysWrap + '">' +
      '<div style="' + S.keysTitle + '">Key takeaways</div>' +
      '<ul style="' + S.keysList + '">' + html + "</ul></div>"
    );
  }

  function renderTable(b) {
    var head = arr(b.head);
    var rows = arr(b.rows);
    var i, j, cells;

    var thead = "";
    for (i = 0; i < head.length; i++) thead += "<th>" + esc(head[i]) + "</th>";

    var tbody = "";
    for (i = 0; i < rows.length; i++) {
      cells = arr(rows[i]);
      tbody += "<tr>";
      for (j = 0; j < cells.length; j++) {
        tbody +=
          '<td style="' + (j === 0 ? S.tdKey : S.td) + '">' + esc(cells[j]) + "</td>";
      }
      tbody += "</tr>";
    }

    var cap = b.caption
      ? '<figcaption style="' + S.cap + '">' + esc(b.caption) + "</figcaption>"
      : "";

    return (
      '<figure style="' + S.tableFig + '">' +
      '<div style="' + S.tableScroll + '">' +
      '<table class="table">' +
      (thead ? "<thead><tr>" + thead + "</tr></thead>" : "") +
      "<tbody>" + tbody + "</tbody></table></div>" +
      cap +
      "</figure>"
    );
  }

  function renderLog(b) {
    var lines = arr(b.lines);
    var intro = b.intro
      ? '<div style="' + S.logIntro + '">' + esc(b.intro) + "</div>"
      : "";

    var html = "";
    for (var i = 0; i < lines.length; i++) {
      var l = lines[i] || {};
      var bad = !!l.bad;
      var rule =
        i === lines.length - 1
          ? ""
          : "border-bottom:1px solid var(--color-divider);";
      var rowBg = bad ? "background:" + FLAG_BG + ";" : "";
      var tagStyle = bad
        ? S.logTag + "border:1px solid " + FLAG + ";color:" + FLAG + ";"
        : S.logTag +
          "border:1px solid var(--color-divider);color:var(--color-neutral-500);";
      var textStyle =
        S.logText + (bad ? "color:" + FLAG + ";" : "color:var(--color-text);");
      html +=
        '<div style="' + S.logLine + rule + rowBg + '">' +
        '<span style="' + tagStyle + '">' + (bad ? "ALERT" : "INFO") + "</span>" +
        '<span style="' + S.logMeta + '">' + esc(l.meta) + "</span>" +
        '<span style="' + textStyle + '">' + esc(l.text) + "</span></div>";
    }
    return intro + '<div style="' + S.logWrap + '">' + html + "</div>";
  }

  function renderDiagram(b) {
    var body = diagramText(b.html);
    var title = b.title
      ? '<figcaption style="' + S.cap + '">' + esc(b.title) + "</figcaption>"
      : "";
    return (
      '<figure style="' + S.diagFig + '">' +
      '<pre style="' + S.diagPre + '">' + esc(body) + "</pre>" +
      title +
      "</figure>"
    );
  }

  function renderBlock(b) {
    if (!b || !b.type) return "";
    switch (b.type) {
      case "p":
        return '<p style="' + S.p + '">' + esc(b.text) + "</p>";
      case "h":
        return '<h3 style="' + S.h + '">' + esc(b.text) + "</h3>";
      case "list":
        return renderList(b);
      case "steps":
        return renderSteps(b);
      case "callout":
        return renderCallout(b);
      case "keys":
        return renderKeys(b);
      case "table":
        return renderTable(b);
      case "log":
        return renderLog(b);
      case "diagram":
        return renderDiagram(b);
      default:
        return "";
    }
  }

  /* ------------------------------- API -------------------------------- */

  function list() {
    var lessons = allLessons();
    var out = [];
    for (var i = 0; i < lessons.length; i++) {
      var l = lessons[i];
      if (!l || typeof l !== "object") continue;
      out.push({
        id: l.id == null ? i : l.id,
        eyebrow: l.eyebrow == null ? "" : l.eyebrow,
        title: l.title == null ? "" : l.title,
        minutes: l.minutes == null ? null : l.minutes,
        summary: l.summary == null ? "" : l.summary
      });
    }
    return out;
  }

  function render(lessonId) {
    var lesson = findLesson(lessonId);
    if (!lesson) return "";
    var blocks = arr(lesson.blocks);
    var html = "";
    for (var i = 0; i < blocks.length; i++) html += renderBlock(blocks[i]);
    if (!html) return "";
    return (
      '<div style="color:var(--color-text);font-size:15px;line-height:1.6;">' +
      html +
      "</div>"
    );
  }

  window.EZLessons = { list: list, render: render };
})();
