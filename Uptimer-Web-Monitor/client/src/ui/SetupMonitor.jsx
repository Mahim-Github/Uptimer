import { useState } from "react";
import useSetupMonitor from "../hooks/useSetupMonitor";
import toast from "react-hot-toast";

function MonitorSetup() {
  const { setupMonitor, isPending } = useSetupMonitor();

  // Individual states for each field
  const [monitorName, setMonitorName] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [requestType, setRequestType] = useState("");
  const [minTimeToFetch, setMinTimeToFetch] = useState("");
  const [multiRegionAnalysis, setMultiRegionAnalysis] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const transformedData = {
      monitorName,
      url: websiteURL,
      requestType,
      interval: parseInt(minTimeToFetch),
      multiRegion: multiRegionAnalysis,
    };

    if (
      !transformedData.monitorName ||
      !transformedData.url ||
      !transformedData.requestType ||
      !transformedData.interval
    ) {
      toast.error("All fields except Multi-Region Analysis are required.");
      return;
    }

    setupMonitor(transformedData, {
      onSuccess: () => {
        toast.success("Monitor setup successfully!");

        setMonitorName("");
        setWebsiteURL("");
        setRequestType("");
        setMinTimeToFetch("");
        setMultiRegionAnalysis(false);
      },
      onError: (error) => {
        toast.error("Failed to setup monitor. Please try again.");
        console.error(error);
      },
    });
  };

  return (
    <div className="flex h-[fit-content] w-full items-center justify-center text-zinc-900">
      <form
        className="flex h-[90%] w-[90%] flex-col items-center gap-6 rounded-xl border-2 border-zinc-300 bg-white p-6"
        onSubmit={handleSubmit}
      >
        <p className="schabo text-5xl uppercase text-zinc-900">Monitor Setup</p>
        <div className="grid w-[80%] grid-cols-2 gap-6">
          {/* Monitor Name */}
          <div className="field h-12 w-full">
            <div className="input-wrapper">
              <input
                className="input"
                type="text"
                value={monitorName}
                onChange={(e) => setMonitorName(e.target.value)}
              />
              <label
                className="label"
                style={{
                  top: monitorName ? "-5px" : "",
                  left: monitorName ? "8px" : "",
                }}
              >
                Monitor Name
              </label>
            </div>
          </div>
          {/* Website URL */}
          <div className="field h-12 w-full">
            <div className="input-wrapper">
              <input
                className="input"
                type="url"
                value={websiteURL}
                onChange={(e) => setWebsiteURL(e.target.value)}
              />
              <label
                className="label"
                style={{
                  top: websiteURL ? "-5px" : "",
                  left: websiteURL ? "8px" : "",
                }}
              >
                Website URL
              </label>
            </div>
          </div>
          {/* Request Type */}
          <div className="field h-12 w-full">
            <div className="input-wrapper">
              <select
                className="input text-zinc-800"
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
              >
                <option value="">Select Request Type</option>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
          </div>
          {/* Min Time to Fetch */}
          <div className="field h-12 w-full">
            <div className="input-wrapper">
              <input
                className="input"
                type="number"
                value={minTimeToFetch}
                onChange={(e) => setMinTimeToFetch(e.target.value)}
                placeholder="Min Time (seconds)"
              />
            </div>
          </div>
          {/* Multi-Region Analysis */}
          <div className="field h-12 w-full">
            <div className="input-wrapper flex items-center">
              <label className="label">Multi-Region Analysis</label>
              <input
                type="checkbox"
                checked={multiRegionAnalysis}
                onChange={(e) => setMultiRegionAnalysis(e.target.checked)}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="h-12 w-[80%] rounded-md bg-zinc-900 font-semibold uppercase text-white transition-all duration-500 ease-out hover:bg-zinc-800"
          onClick={handleSubmit}
        >
          Setup Monitor
        </button>
      </form>
    </div>
  );
}

export default MonitorSetup;
