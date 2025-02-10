/* eslint-disable react/prop-types */
import React from "react";
import Map, { Marker, Popup } from "react-map-gl";

const mapStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "100%",
};

const markerStyle = {
  backgroundImage: "url('../img/pin.png')",
  backgroundSize: "cover",
  width: "32px",
  height: "40px",
  cursor: "pointer",
};

const popupContentStyle = {
  textAlign: "center",
  fontFamily: "'Lato', sans-serif",
  padding: "1.5rem",
  fontSize: "1.4rem",
  boxShadow: "0 1rem 3rem rgba(0, 0, 0, 0.15)",
};

function MapboxTest({ locations }) {
  const [popupInfo, setPopupInfo] = React.useState(null);

  return (
    <Map
      initialViewState={{
        latitude: locations[0]?.coordinates[1] || 0,
        longitude: locations[0]?.coordinates[0] || 0,
        zoom: 10,
      }}
      style={mapStyle}
      mapStyle="mapbox://styles/vegetable-w/cm315d7cy008b01ojeejk7yat"
      mapboxAccessToken="pk.eyJ1IjoidmVnZXRhYmxlLXciLCJhIjoiY20zMGVza3I4MGt6ZzJtcTIxeDdudDF3cCJ9.ctoTWziuvljqqUKNop1FoA"
    >
      {locations.map((loc) => (
        <div key={loc.day}>
          {/* 标记 */}
          <Marker
            longitude={loc.coordinates[0]}
            latitude={loc.coordinates[1]}
            anchor="bottom"
          >
            <div
              className="marker"
              style={markerStyle}
              onClick={() => setPopupInfo(loc)} // 点击显示弹出框
            ></div>
          </Marker>

          {/* 弹出框 */}
          {popupInfo?.day === loc.day && (
            <Popup
              longitude={loc.coordinates[0]}
              latitude={loc.coordinates[1]}
              closeOnClick={false}
              onClose={() => setPopupInfo(null)}
              offset={30}
            >
              <div style={popupContentStyle}>
                <p>
                  Day {loc.day}: {loc.description}
                </p>
              </div>
            </Popup>
          )}
        </div>
      ))}
    </Map>
  );
}

export default MapboxTest;
