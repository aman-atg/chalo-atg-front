import PropTypes from "prop-types";
import React, { useEffect } from "react";

import circleSvg from "../../assets/icons/circle.svg";
import finishSvg from "../../assets/icons/finish.svg";
import rocketSVg from "../../assets/icons/rocket.svg";
import { styles } from "./mapStyles";

let google = null;

// stop => {stopId, stopName, lat, lng}
// route => {routeId, status, direction, routeName, stops}

let prevMarker = null;
const Map = ({
  style,
  mapId,
  routes = [],
  enableHistory,
  onMapClick,
  mapClickIcon,
  ...props
}) => {
  const map = React.useRef(null);

  const addMarker = ({ position, name, icon }) => {
    const marker = new google.maps.Marker({
      position,
      map: map.current,
      icon,
      title: name,
    });
    return marker;
  };

  const createPolyline = (route) => {
    const routeCoordinates = route.stops.map((stop) => {
      return { lat: stop.latitude, lng: stop.longitude };
    });

    console.log(routeCoordinates);

    const path = new google.maps.Polyline({
      path: routeCoordinates,
    });

    path.setMap(map.current);
  };

  // home
  useEffect(() => {
    google = window.google;
    if (!google) {
      return;
    }

    if (!enableHistory || routes.length === 0 || map.current === null) {
      map.current = new google.maps.Map(document.getElementById(mapId), {
        center: { lat: 28.66, lng: 77.25 },
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles,
      });
    }

    map.current.addListener("click", (e) => {
      if (!onMapClick) {
        return;
      }
      prevMarker && prevMarker.setMap(null);
      onMapClick(e);
      prevMarker = addMarker({
        position: e.latLng,
        icon: mapClickIcon,
      });
    });

    routes.forEach((route) => {
      createPolyline(route);
      route.stops.forEach((stop, i) => {
        let icon = circleSvg;
        if (i === 0) {
          icon = rocketSVg;
        } else if (i === route.stops.length - 1) {
          icon = finishSvg;
        }

        const marker = addMarker({
          position: { lat: stop.latitude, lng: stop.longitude },
          name: stop.name,
          title: stop.name,
          icon,
        });

        // create info window
        const infowindow = new google.maps.InfoWindow({
          content: `<div class="info-window stop">${stop.name}</div>`,
        });

        marker.addListener("click", () => {
          infowindow.open(map.current, marker);
        });

        // close info window on click
        map.current.addListener("click", () => {
          infowindow.close();
        });
      });

      // set zoom level
      const bounds = new google.maps.LatLngBounds();
      route.stops.forEach((stop) => {
        bounds.extend({ lat: stop.latitude, lng: stop.longitude });
      });
      map.current.fitBounds(bounds);
    });
  }, [routes]);

  return <div style={style} {...props} id={mapId} />;
};

export default Map;

Map.propTypes = {
  style: PropTypes.object,
  mapId: PropTypes.string.isRequired,
  routes: PropTypes.array,
  enableHistory: PropTypes.bool,
  onMapClick: PropTypes.func,
  mapClickIcon: PropTypes.string,
};

Map.defaultProps = {
  style: {},
  routes: [],
  enableHistory: false,
  onMapClick: null,
  mapClickIcon: "",
};
