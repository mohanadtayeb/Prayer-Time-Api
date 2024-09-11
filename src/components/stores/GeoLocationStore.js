import { writable } from "svelte/store";

const createGeolocationStore = () => {
  const { subscribe, set, update } = writable({
    lat: null,
    lng: null,
    loading: true,
    error: null,
  });

  let watchId;

  const startWatching = () => {
    if ("geolocation" in navigator) {
      const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      };

      watchId = navigator.geolocation.watchPosition(
        (position) => {
          update((state) => ({
            ...state,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            loading: false,
            error: null,
          }));
        },
        (error) => {
          update((state) => ({
            ...state,
            loading: false,
            error: error.message,
          }));
        },
        options
      );
    } else {
      update((state) => ({
        ...state,
        loading: false,
        error: "Geolocation is not supported by this browser.",
      }));
    }
  };

  const stopWatching = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
    }
  };

  startWatching();

  return {
    subscribe,
    stopWatching,
  };
};

export const geolocation = createGeolocationStore();
