<script>
  import { format, isAfter } from 'date-fns';
  import { exportToICS, shareTask } from '$lib/utils/export';
  export let task;
  export let startDrag;

  $: duePassed = task.dueDate ? isAfter(new Date(), new Date(task.dueDate)) : false;

  function doICS() { exportToICS(task); }
  function doShare() { shareTask(task); }
</script>

<article
  class="p-4 rounded-xl shadow-lg bg-white text-black flex flex-col gap-2 cursor-move max-h-48 overflow-hidden hover:scale-105 transition-transform"
  draggable="true"
  title={task.title}
  on:dragstart={(e) => startDrag(task.title, e)}
>
  <div class="flex justify-between items-center">
    <h3 class="font-semibold text-base truncate">{task.title}</h3>
    {#if duePassed}
      <span class="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">Überfällig</span>
    {/if}
  </div>

  <div class="text-sm text-gray-700 line-clamp-3">
    {task.description}
  </div>

  <div class="flex justify-between items-center text-sm text-gray-600 mt-2">
    <span class="font-medium">SP: {task.storyPoints}</span>
    <div class="flex gap-2">
      <button 
        on:click={doShare} 
        class="px-3 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        Share
      </button>
      <button 
        on:click={doICS} 
        class="px-3 py-1 text-xs rounded bg-green-500 text-white hover:bg-green-600 transition"
      >
        ICS
      </button>
    </div>
  </div>
</article>
