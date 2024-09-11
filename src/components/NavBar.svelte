<script>
  import Logo from "../images/logo.png";
  let fontSize = 16;
  //Change Font Size
  const decreaseFontSize = () => {
    if (fontSize > 13) fontSize -= 2;
    document.documentElement.style.fontSize = fontSize + "px";
  };

  const increaseFontSize = () => {
    if (fontSize < 19) fontSize += 2;
    document.documentElement.style.fontSize = fontSize + "px";
  };
</script>

<header
  class="bg-gradient-to-r from-[#232F3D] to-[#3D4957] text-white font-['Cairo']"
>
  <nav class="flex justify-between items-center h-20 mx-auto container">
    <div class="flex row gap-4 mx-3">
      <button
        class="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded"
        on:click={decreaseFontSize}>- أ</button
      >
      <button
        class="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded"
        on:click={increaseFontSize}>+ أ</button
      >
    </div>
    <img src={Logo} class="w-28" alt="Logo" />
  </nav>
</header>
