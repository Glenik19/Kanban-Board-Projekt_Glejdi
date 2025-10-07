<script>
  import { flip } from 'svelte/animate';

  export let list = [];
  export let startDrag;
  export let onDrop;
  export let onDragOver;
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
  class="bg-white h-[350px] w-[200px] space-y-2"
  ondragover={onDragOver}
  ondrop={onDrop}
>
  {#each list as item (item)}
    <article
      class="p-4 bg-blue-400"
      draggable="true"
      ondragstart={(e) => startDrag(item, e)}
      animate:flip
    >
      {item}
    </article>
  {/each}
</section>
