<script>
  export let title = "Kanban Board";
</script>

<header class="flex justify-between items-center bg-gray-900 text-white px-8 py-4 shadow-lg mb-6">
  <!-- Logo -->
  <div class="flex items-center gap-3">
    <div class="bg-blue-500 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-md">
      KB
    </div>
    <h1 class="text-2xl font-semibold tracking-wide">{title}</h1>
  </div>

  <!-- Buttons -->
  <nav class="flex gap-4">
    <button class="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg font-medium shadow">
      Dashboard
    </button>
    <button class="bg-gray-700 hover:bg-gray-800 transition px-4 py-2 rounded-lg font-medium">
      Settings
    </button>
    <button class="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-lg font-medium">
      Logout
    </button>
  </nav>
</header>
