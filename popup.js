document.getElementById("submitButton").addEventListener("click", () => {
  const url = document.getElementById("urlInput").value;
  chrome.storage.local.get({ blockedSites: [] }, (result) => {
    const blockedSites = result.blockedSites;
    if (!blockedSites.includes(url)) {
      blockedSites.push(url);
      chrome.storage.local.set({ blockedSites: blockedSites }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: "blockSite",
            url: url,
          });
        });
      });
    }
  });
});
