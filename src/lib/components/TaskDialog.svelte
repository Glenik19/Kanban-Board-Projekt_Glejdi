<script>
  import { createEventDispatcher, onMount } from 'svelte';
  const dispatch = createEventDispatcher();
  export let openOnMount = false;
  let dialogEl;
  let id = '';
  let title = '';
  let description = '';
  let dueDate = '';
  let storyPoints = 0;
  let priority = 'Medium';
  let lane = 'ToDo';

  function uid(){
    return Date.now().toString(36) + Math.random().toString(36).slice(2,9);
  }

  function open(){
    dialogEl.showModal();
  }

  function close(){
    dialogEl.close();
  }

  function loadForEdit(task){
    id = task.id;
    title = task.title;
    description = task.description;
    dueDate = task.dueDate ? task.dueDate.split('T')[0] : '';
    storyPoints = task.storyPoints;
    priority = task.priority;
    lane = task.lane;
    open();
  }

  function save(){
    const task = {
      id: id || uid(),
      title,
      description,
      creationDate: id ? undefined : new Date().toISOString(),
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      storyPoints: Number(storyPoints) || 0,
      priority,
      lane
    };
    dispatch('save', { task });
    id = '';
    title = '';
    description = '';
    dueDate = '';
    storyPoints = 0;
    priority = 'Medium';
    lane = 'ToDo';
    close();
  }

  onMount(()=>{ if(openOnMount) open(); });
</script>

<dialog bind:this={dialogEl} class="rounded-lg p-6 w-[420px]">
  <form on:submit|preventDefault={save} class="flex flex-col gap-3">
    <input placeholder="Title" bind:value={title} required class="border p-2 rounded" />
    <textarea placeholder="Description" bind:value={description} class="border p-2 rounded"></textarea>
    <div class="flex gap-2">
      <input type="date" bind:value={dueDate} class="border p-2 rounded w-full" />
      <input type="number" min="0" bind:value={storyPoints} placeholder="SP" class="border p-2 rounded w-28" />
    </div>
    <div class="flex gap-2">
      <select bind:value={priority} class="border p-2 rounded w-full">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select bind:value={lane} class="border p-2 rounded w-28">
        <option>ToDo</option>
        <option>Doing</option>
        <option>Done</option>
        <option>Archive</option>
      </select>
    </div>
    <div class="flex justify-end gap-2 mt-2">
      <button type="button" on:click={close} class="px-4 py-2 rounded border">Cancel</button>
      <button type="submit" class="px-4 py-2 rounded bg-blue-600 text-white">Save</button>
    </div>
  </form>
</dialog>