import { useCallback, useMemo, useRef, useState } from "react";
import { GoogleMap as GMap, DrawingManager, Polygon } from "@react-google-maps/api";
import * as turf from "@turf/turf";
import { Feature, Polygon as geojsonPolygon, GeoJsonProperties } from "geojson";

type LatLng = { lat: number; lng: number };

interface GoogleMapProps {
 mapRef: React.RefObject<google.maps.Map | null>; 
  isLoaded: boolean;
  mode: "polygon" | "marker";
  polygonPath: LatLng[];
  setPolygonPath: (path: LatLng[]) => void;
  existingPolygons: { geometry: string }[];
  setLatitude: (lat: number | "") => void;
  setLongitude: (lng: number | "") => void;
  mapCenter: LatLng;
  setMapCenter: (center: LatLng) => void;
  setAlertMsg: (msg: string) => void;
  setAlertType: (type: "success" | "error") => void;
}

const defaultContainerStyle = { width: "100%", height: "400px" };

const GoogleMap = ({
  mapRef,
  isLoaded,
  mode,
  polygonPath,
  setPolygonPath,
  existingPolygons,
  setLatitude,
  setLongitude,
  mapCenter,
  setMapCenter,
  setAlertMsg,
  setAlertType,
}: GoogleMapProps) => {
  
  const [drawnPolygonRef, setDrawnPolygonRef] = useState<google.maps.Polygon | null>(null);

  //  Advanced Marker (instead of deprecated google.maps.Marker)
  const advancedMarkerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  const convertPathToGeoJSON = (path: LatLng[]): geojsonPolygon => {
    let coordinates = path.map((p) => [p.lng, p.lat]);
    if (
      coordinates.length &&
      (coordinates[0][0] !== coordinates[coordinates.length - 1][0] ||
        coordinates[0][1] !== coordinates[coordinates.length - 1][1])
    ) {
      coordinates.push(coordinates[0]);
    }
    return { type: "Polygon", coordinates: [coordinates] };
  };

  const computeCentroidFromPath = (path: LatLng[]) => {
    try {
      if (!path || path.length < 3) return null;
      const gj = convertPathToGeoJSON(path);
      const centroid = turf.centroid({ type: "Feature", geometry: gj, properties: {} });
      const [lng, lat] = centroid.geometry.coordinates as [number, number];
      return { lat, lng };
    } catch (e) {
      console.error("Centroid compute error:", e);
      return null;
    }
  };

  const checkOverlap = (
    newPolygon: Feature<geojsonPolygon, GeoJsonProperties>,
    existingZones: { geometry: string }[]
  ): boolean => {
    try {
      for (const zone of existingZones) {
        if (!zone.geometry) continue;
        let parsedGeometry: geojsonPolygon;
        try {
          parsedGeometry = JSON.parse(zone.geometry);
        } catch (e) {
          console.error("Invalid GeoJSON in DB:", zone.geometry);
          continue;
        }
        const existingPolygon: Feature<geojsonPolygon, GeoJsonProperties> = {
          type: "Feature",
          geometry: parsedGeometry,
          properties: {},
        };
        if (turf.booleanIntersects(existingPolygon, newPolygon)) return true;
      }
      return false;
    } catch (err) {
      console.error("Overlap check error:", err);
      return false;
    }
  };

  const onPolygonComplete = useCallback(
    (polygon: google.maps.Polygon) => {
      if (drawnPolygonRef) drawnPolygonRef.setMap(null);
      setDrawnPolygonRef(polygon);

      const path = polygon
        .getPath()
        .getArray()
        .map((ll) => ({ lat: ll.lat(), lng: ll.lng() }));

      const geoJSONGeometry = convertPathToGeoJSON(path);
      const geoJsonFeature: Feature<geojsonPolygon, GeoJsonProperties> = {
        type: "Feature",
        geometry: geoJSONGeometry,
        properties: {},
      };

      if (checkOverlap(geoJsonFeature, existingPolygons)) {
        setAlertType("error");
        setAlertMsg("This polygon overlaps with an existing zone. Please draw a different area.");
        polygon.setMap(null);
        setDrawnPolygonRef(null);
        setPolygonPath([]);
        setLatitude("");
        setLongitude("");
        // Remove marker if any
        if (advancedMarkerRef.current) {
          advancedMarkerRef.current.map = null;
          advancedMarkerRef.current = null;
        }
        return;
      }

      setPolygonPath(path);

      const centroid = computeCentroidFromPath(path);
      if (centroid) {
        setLatitude(centroid.lat);
        setLongitude(centroid.lng);
        setMapCenter(centroid);

        // Drop/update advanced marker at centroid
        if (mapRef.current && "marker" in google.maps) {
          if (advancedMarkerRef.current) {
            advancedMarkerRef.current.position = centroid as google.maps.LatLngAltitudeLiteral;
          } else {
            advancedMarkerRef.current = new google.maps.marker.AdvancedMarkerElement({
              map: mapRef.current,
              position: centroid,
              gmpDraggable: true,
            });
            advancedMarkerRef.current.addListener("dragend", () => {
              const pos = advancedMarkerRef.current!.position as google.maps.LatLngLiteral;
              setLatitude(pos.lat);
              setLongitude(pos.lng);
            });
          }
        }
      }
    },
    [existingPolygons, drawnPolygonRef]
  );

  const drawingManagerOptions = useMemo<google.maps.drawing.DrawingManagerOptions>(
    () => ({
      drawingControl: mode === "polygon",
      drawingControlOptions: {
        position: window.google?.maps?.ControlPosition?.TOP_CENTER,
        drawingModes: mode === "polygon" ? (["polygon"] as any) : [],
      },
      polygonOptions: {
        editable: true,
        fillColor: "#2196F3",
        strokeColor: "#2196F3",
        fillOpacity: 0.4,
      },
    }),
    [mode]
  );

  // Helper: place/update AdvancedMarker for "marker" mode
  const placeAdvancedMarker = useCallback(
    (pos: google.maps.LatLngLiteral) => {
      if (!mapRef.current || !("marker" in google.maps)) return;

      if (advancedMarkerRef.current) {
        advancedMarkerRef.current.position = pos;
        advancedMarkerRef.current.map = mapRef.current;
      } else {
        advancedMarkerRef.current = new google.maps.marker.AdvancedMarkerElement({
          map: mapRef.current,
          position: pos,
          gmpDraggable: true,
        });
        advancedMarkerRef.current.addListener("dragend", () => {
          const p = advancedMarkerRef.current!.position as google.maps.LatLngLiteral;
          setLatitude(p.lat);
          setLongitude(p.lng);
        });
      }
    },
    [setLatitude, setLongitude]
  );

  if (!isLoaded) return <div>Loading Map…</div>;

  return (
    <GMap
      mapContainerStyle={defaultContainerStyle}
      center={mapCenter}
      zoom={12}
      onLoad={(map) => {
          mapRef.current = map;
          if (typeof (window as any).initialLatLng !== "undefined") {
            placeAdvancedMarker((window as any).initialLatLng);
          }
        }}
      onClick={(e) => {
        if (mode === "marker" && e.latLng) {
          const pos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          setLatitude(pos.lat);
          setLongitude(pos.lng);
          placeAdvancedMarker(pos);
        }
      }}
        options={{
            mapId: "7e961cfa730e051b2daf3741", 
          }}
    >
      {mode === "polygon" && (
        <DrawingManager
          drawingMode={"polygon" as any}
          options={drawingManagerOptions}
          onPolygonComplete={onPolygonComplete}
        />
      )}

      {mode === "polygon" && polygonPath.length > 0 && (
        <Polygon
          paths={polygonPath}
          options={{
            fillColor: "#2196F3",
            strokeColor: "#2196F3",
            fillOpacity: 0.4,
            editable: true,
          }}
        />
      )}
    </GMap>
  );
};

export default GoogleMap;
