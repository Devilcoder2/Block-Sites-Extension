document.getElementById("submitButton").addEventListener("click", () => {
  const url = document.getElementById("urlInput").value;
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;

  if (url && startTime && endTime) {
    chrome.storage.local.get({ blockedSites: [] }, (result) => {
      const blockedSites = result.blockedSites;
      blockedSites.push({ url, startTime, endTime });
      chrome.storage.local.set({ blockedSites: blockedSites }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const currentTabId = tabs[0].id;
          chrome.tabs.sendMessage(
            currentTabId,
            { action: "blockSite", url, startTime, endTime },
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
