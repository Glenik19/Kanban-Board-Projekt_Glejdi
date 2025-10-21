<script>
  import { onMount } from 'svelte';

  let location = 'Loading...';

  onMount(async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
        const data = await res.json();
        location = data.address.city || data.address.town || data.address.village || data.address.country;
      });
    } else {
      location = 'Geolocation not supported';
    }
  });
</script>

<nav class="relative backdrop-blur-md bg-gradient-to-r from-blue-600/80 to-indigo-700/80 text-white p-4 shadow-xl border-b border-white/20 flex justify-center items-center">
  <div class="text-3xl font-extrabold drop-shadow-lg">KanbanBoard</div>
  <div class="absolute right-4 text-lg">{location}</div>
</nav>
