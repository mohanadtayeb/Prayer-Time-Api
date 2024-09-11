<script>
  import PrayerTable from "./PrayerTable.svelte";
  import { onMount } from "svelte";
  import { geolocation } from "./stores/GeoLocationStore";

  let gregorianDate;
  let hijri;
  let hijriMonth;
  let obj;
  let weekday;
  let prayerTimes;
  let nameCity;
  let locationPermissionGranted = false;

  $: ({ lat, lng, loading, error } = $geolocation);
  $: if (lat && lng && !loading && !error && locationPermissionGranted) {
    fetchPrayerTimes(lat, lng);
    fetchCityName(lat, lng);
  }

  const requestLocationPermission = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          locationPermissionGranted = true;
          geolocation.start();
        },
        (error) => {
          console.error("Error requesting location permission:", error);
          locationPermissionGranted = false;
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      locationPermissionGranted = false;
    }
  };

  const fetchPrayerTimes = async (latitude, longitude) => {
    try {
      const url = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}`;
      const response = await fetch(url);
      const data = await response.json();
      obj = data;
      gregorianDate = data.data.date.gregorian.date;
      hijri = data.data.date.hijri.day;
      hijriMonth = data.data.date.hijri.month.ar;
      weekday = data.data.date.hijri.weekday.ar;
      prayerTimes = data.data.timings;
      console.log($geolocation);
      console.log(obj);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
    }
  };

  const fetchCityName = async (latitude, longitude) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      const response = await fetch(url);
      const data = await response.json();
      nameCity = data.address.province;
      console.log(data);
    } catch (error) {
      console.error("Error fetching name city:", error);
    }
  };

  onMount(() => {
    requestLocationPermission();
  });
</script>

<section
  class="font-['Cairo'] h-[55rem] flex items-center justify-center text-center bg-gradient-to-r from-[#232F3D] to-[#3D4957]"
>
  <article class="mx-4">
    <h1 class="font-bold mb-4 text-white max-sm:text-7xl text-8xl py-4">
      أذان
    </h1>
    <p class="mb-6 text-white">
      بناء على موقعك الجغرافي سيتم تحديد اوقات الصلاة
    </p>
    {#if !locationPermissionGranted}
      <button
        on:click={requestLocationPermission}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        السماح بالوصول إلى الموقع
      </button>
    {/if}
  </article>
</section>

{#if locationPermissionGranted && prayerTimes}
  <PrayerTable
    {gregorianDate}
    {hijri}
    {hijriMonth}
    {weekday}
    {prayerTimes}
    {nameCity}
  />
{/if}
