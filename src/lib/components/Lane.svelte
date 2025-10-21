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
  class="bg-gray-50 h-[650px] w-[300px] p-5 rounded-3xl shadow-lg hover:shadow-xl transition-all space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500"
  on:dragover={onDragOver}
  on:drop={onDrop}
>
  <!-- Titel der Lane -->
  <h2 class="text-center text-xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-3">
    {title}
  </h2>

  <!-- Tasks -->
  {#each laneTasks as task, i (task.title + i)}
    <TaskCard
      {task}
      {startDrag}
      class="max-h-48"
    />
  {/each}

  {#if laneTasks.length === 0}
    <p class="text-center text-gray-400 text-sm mt-2 italic">Keine Tasks</p>
  {/if}
</section>
