// Use this in console while having the app open.
// Also choose 'about:srcdoc' so the "AppLab" class is available.
const data = JSON.parse(`PASTE JSON HERE`);
await AppLab.saveData(data);
await AppLab.getData();