<script>
  import { flip } from 'svelte/animate';

  export let title = "";
  export let list = [];
  export let startDrag;
  export let onDrop;
  export let onDragOver;
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
  class="bg-white h-[400px] w-[220px] p-3 rounded-2xl shadow-md space-y-2"
  on:dragover={onDragOver}
  on:drop={onDrop}
>
  <h2 class="text-center text-lg font-bold mb-2">{title}</h2>

  {#each list as item (item)}
    <article
      class="p-3 rounded-lg shadow text-white hover:scale-105 transition cursor-move"
      style="background-color: {title === 'ToDo' ? '#3b82f6' : title === 'Doing' ? '#facc15' : title === 'Done' ? '#22c55e' : '#9ca3af'}"
      draggable="true"
      on:dragstart={(e) => startDrag(item, e)}
      animate:flip
    >
      {item}
    </article>
  {/each}
</section>
