<script>
  import { onMount } from "svelte";
  export let gregorianDate;
  export let hijri;
  export let hijriMonth;
  export let weekday;
  export let prayerTimes = {};
  export let nameCity;
  let localTime;

  $: prayers = [
    { name: "الفجر", time: prayerTimes.Fajr + "AM" },
    { name: "الشروق", time: prayerTimes.Sunrise + "AM" },
    { name: "الظهر", time: prayerTimes.Dhuhr + "PM" },
    { name: "العصر", time: prayerTimes.Asr + "PM" },
    { name: "المغرب", time: prayerTimes.Maghrib + "PM" },
    { name: "العشاء", time: prayerTimes.Isha + "PM" },
  ];

  // To display the local time
  const updateLocalTime = () => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const ampm = now.getHours() >= 12 ? "PM" : "AM"; // AM/PM
    localTime = `${hours}:${minutes}:${seconds} ${ampm}`;
  };
  setInterval(updateLocalTime, 1000);

  onMount(() => {
    updateLocalTime();
  });
</script>

<section
  class="text-center font-['Cairo'] text-white bg-gradient-to-r from-[#232F3D] to-[#3D4957] pb-8"
>
  <main class="items-center max-w-screen-lg justify-center m-auto">
    <div class="text-3xl pb-3">
      <h2 class="font-semibold text-[#E8CF3F]">{weekday}</h2>
      <div class="p-2">
        <span class="bg-[#2B3643] max-w-40 text-[1.2rem] px-4 rounded-lg">
          {gregorianDate}
        </span>
      </div>
    </div>

    <div class="p-3">
      <div
        class="mb-1 text-2xl font-semibold bg-[#2B3643] border-2 rounded-t-lg border-[#ffffff53] p-7"
      >
        {nameCity}
      </div>
      <div
        class="text-[#E8CF3F] text-2xl p-7 bg-[#364250] border-2 border-[#ffffff53]"
      >
        <div class="p-2">الوقت المحلي</div>
        <div class="font-bold text-3xl">{localTime}</div>
      </div>

      <!-- Responsive Prayer Times Grid -->
      <div class="mt-9 grid sm:grid-cols-1 md:grid-cols-2 gap-6">
        {#each prayers as prayer}
          <div
            class="text-white text-2xl lg:text-1xl p-7 bg-[#364250] border-2 border-[#ffffff53] rounded-3xl"
          >
            <div class="p-2">{prayer.name}</div>
            <div class="font-bold text-3xl lg:text-2xl">{prayer.time}</div>
          </div>
        {/each}
      </div>
      <div class=" p-7 mt-7 text-3xl">
        <div>{parseInt(hijri) + 1}</div>
        <div>{hijriMonth}</div>
      </div>
    </div>
  </main>
</section>
