/*
 * Locket Custom Edition - Safe Remote Config
 * Shadowrocket / HTTP Response Script
 *
 * Scope:
 * - Enables caption-related UI flags already understood by the current config.
 * - Preserves all unrelated server-provided Remote Config values.
 * - Does NOT create purchases, subscriptions, entitlements, or fake receipts.
 * - Does NOT override video-duration limits or premium feature gates.
 */

function parseJson(value) {
  if (typeof value !== "string" || value.length === 0) return null;
  try {
    return JSON.parse(value);
  } catch (_) {
    return null;
  }
}

function stringifyIfObject(value) {
  return JSON.stringify(value);
}

var body = $response && $response.body;
var data = parseJson(body);

if (!data || typeof data !== "object" || Array.isArray(data)) {
  $done({});
} else {
  if (!data.entries || typeof data.entries !== "object" || Array.isArray(data.entries)) {
    data.entries = {};
  }

  var entries = data.entries;

  // Caption controls only. Keep the app's native feature gates and server limits.
  entries.captions_enabled = "true";
  entries.music_caption_enabled = "true";
  entries.music_caption_song_preview_enabled = "true";
  entries.link_caption_link_enabled = "true";

  // Do not replace overlay_dynamic_captions or overlay_items:
  // the server/app version remains the source of truth for available caption types.

  $done({
    body: stringifyIfObject(data)
  });
}
