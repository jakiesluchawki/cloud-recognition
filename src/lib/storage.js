const KEYS = {
  profile: "cloud-recognition:profile",
  progress: "cloud-recognition:progress",
  journal: "cloud-recognition:journal",
  recognition: "cloud-recognition:recognition",
};

function read(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The app remains usable when storage is blocked or full.
  }
}

export function loadProfile() {
  return read(KEYS.profile, null);
}

export function saveProfile(profile) {
  write(KEYS.profile, profile);
}

export function loadProgress() {
  return read(KEYS.progress, []);
}

export function saveProgress(progress) {
  write(KEYS.progress, progress);
}

export function loadJournal() {
  return read(KEYS.journal, []);
}

export function saveJournal(entries) {
  write(KEYS.journal, entries);
}

export function loadRecognitionStats() {
  return read(KEYS.recognition, {});
}

export function saveRecognitionStats(stats) {
  write(KEYS.recognition, stats);
}
