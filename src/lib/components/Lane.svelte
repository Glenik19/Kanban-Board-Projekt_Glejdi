<script>
  import { flip } from 'svelte/animate';
  import TaskCard from './TaskCard.svelte';
  export let title = "";
  export let list = [];
  export let startDrag;
  export let onDrop;
  export let onDragOver;
  export let tasks = [];

  // Tasks dieser Lane
  $: laneTasks = tasks.filter(t => list.includes(t.title));
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
  class="bg-gray-50 h-[420px] w-[240px] p-4 rounded-2xl shadow-md hover:shadow-lg transition-all space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400"
  on:dragover={onDragOver}
  on:drop={onDrop}
>
  <!-- Titel der Lane -->
  <h2 class="text-center text-lg font-bold mb-3 text-gray-800 border-b border-gray-200 pb-2">
    {title}
  </h2>

  <!-- Tasks -->
  {#each laneTasks as task, i (task.title + i)}
    <TaskCard
      {task}
      {startDrag}
    />
  {/each}

  {#if laneTasks.length === 0}
    <p class="text-center text-gray-400 text-xs mt-2 italic">Keine Tasks</p>
  {/if}
</section>
