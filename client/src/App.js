import * as React from "react";
import { useState, useEffect } from "react";
import { fetchEntries } from "./api/api";
import LogEntryForm from "./components/LogEntryForm";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import TravelLogContext from "./context/travelLog-context";

const App = () => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 46.0730555556,
    longitude: -100.546666667,
    zoom: 3,
  });
  const [travelLogs, setTravelLogs] = useState([]);
  const [addEntry, setAddEntry] = useState(null);
  // const [showPopup, setShowPopup] = useState({});

  const getLogs = async () => {
    const logs = await fetchEntries();
    setTravelLogs(logs);
  };

  const setMarkers = () => {
    return travelLogs.map((log) => {
      return (
        <div key={log._id}>
          <Marker
            longitude={log.location.coordinates[0]}
            latitude={log.location.coordinates[1]}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <img
              style={{
                height: `${6 * viewport.zoom}px`,
                width: `${6 * viewport.zoom}px`,
              }}
              src="https://i.imgur.com/y0G5YTX.png"
              className="marker"
            />
          </Marker>
        </div>
      );
    });
  };

  const addEntryFunction = () => {
    return (
      <div>
        <Marker
          longitude={addEntry.longitude}
          latitude={addEntry.latitude}
          offsetLeft={-15}
          offsetTop={-25}
        >
          <img
            style={{
              height: `${6 * viewport.zoom}px`,
              width: `${6 * viewport.zoom}px`,
            }}
            src="https://i.imgur.com/y0G5YTX.png"
            className="marker"
          />
        </Marker>
        <Popup
          latitude={addEntry.latitude}
          longitude={addEntry.longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setAddEntry(false)}
          anchor="top"
        >
          <div className={`popup`}>
            <TravelLogContext.Provider
              value={{
                addEntry,
                setAddEntry,
                setTravelLogs,
                travelLogs,
              }}
            >
              <LogEntryForm />
            </TravelLogContext.Provider>
          </div>
        </Popup>
      </div>
    );
  };

  useEffect(() => {
    getLogs();
  }, []);

  useEffect(() => {
    console.log(travelLogs.length);
  }, [travelLogs]);

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle={`mapbox://styles/tyudosen/ckeszfz005uhd19qqod7x1enn`}
      onDblClick={(e) =>
        setAddEntry({
          longitude: e.lngLat[0],
          latitude: e.lngLat[1],
        })
      }
    >
      {travelLogs ? setMarkers() : null}
      {addEntry ? addEntryFunction() : null}
    </ReactMapGL>
  );
};

export default App;
