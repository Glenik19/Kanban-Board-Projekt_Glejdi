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
  class="group p-4 rounded-xl shadow-sm border border-gray-200 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col gap-2 cursor-move overflow-hidden"
  draggable="true"
  title={task.title}
  on:dragstart={(e) => startDrag(task.title, e)}>

  <!-- Titel + Status -->
  <div class="flex justify-between items-start">
    <h3 class="font-semibold text-gray-800 text-sm leading-tight truncate max-w-[140px]">
      {task.title}
    </h3>

    {#if duePassed}
      <span class="text-[10px] font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
        Überfällig
      </span>
    {/if}
  </div>

  <!-- Beschreibung -->
  <div class="text-xs text-gray-600 line-clamp-3 leading-snug">
    {task.description}
  </div>

  <!-- Footer mit Details -->
  <div class="flex justify-between items-center text-[11px] text-gray-500 mt-1">
    <span class="font-medium">
      SP: <span class="text-gray-800">{task.storyPoints}</span>
    </span>

    <div class="flex gap-1">
      <button
        on:click={doShare}
        class="px-2 py-0.5 text-[10px] border border-gray-300 rounded-md hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition"
      >
        Share
      </button>
      <button
        on:click={doICS}
        class="px-2 py-0.5 text-[10px] border border-gray-300 rounded-md hover:bg-green-50 text-gray-700 hover:text-green-600 transition"
      >
        ICS
      </button>
    </div>
  </div>
</article>
