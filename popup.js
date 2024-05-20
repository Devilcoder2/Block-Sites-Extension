document.getElementById("submitButton").addEventListener("click", () => {
  const url = document.getElementById("urlInput").value;
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;

  const monday = document.getElementById("Monday").checked;
  const tuesday = document.getElementById("Tuesday").checked;
  const wednesday = document.getElementById("Wednesday").checked;
  const thru = document.getElementById("Thru").checked;
  const friday = document.getElementById("Friday").checked;
  const sat = document.getElementById("Sat").checked;
  const sunday = document.getElementById("Sunday").checked;

  const days = [monday, tuesday, wednesday, thru, friday, sat, sunday];

  if (url && startTime && endTime) {
    chrome.storage.local.get({ blockedSites: [] }, (result) => {
      const blockedSites = result.blockedSites;
      blockedSites.push({ url, startTime, endTime, days });
      chrome.storage.local.set({ blockedSites: blockedSites }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const currentTabId = tabs[0].id;
          chrome.tabs.sendMessage(
            currentTabId,
            { action: "blockSite", url, startTime, endTime, days },
            () => {
              chrome.tabs.reload(currentTabId);
            }
          );
        });
      });
    });
  } else {
    alert("Please enter a URL, start time, and end time.");
  }
});
