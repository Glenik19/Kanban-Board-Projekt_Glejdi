<script>
  import { format, isAfter } from 'date-fns';
  import { exportToICS, shareTask } from '$lib/utils/export';
  export let task;
  export let onEdit;
  export let onDelete;
  export let onMove; 

  $: duePassed = task.dueDate ? isAfter(new Date(), new Date(task.dueDate)) : false;
  function doICS(){ exportToICS(task); }
  function doShare(){ shareTask(task); }
  function edit(){ onEdit(task); }
  function del(){ onDelete(task.id); }
  function markDone(){ onMove(task.id, 'Done'); }
</script>

<article class="p-3 rounded-lg shadow text-black bg-white flex flex-col gap-2 cursor-move" draggable="true" title={task.title}>
  <div class="flex justify-between items-start gap-2">
    <div>
      <h3 class="font-semibold text-sm">{task.title}</h3>
      <div class="text-xs text-gray-600">{task.priority} • {task.storyPoints} SP</div>
    </div>
    {#if duePassed}
      <div class="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">Überfällig</div>
    {/if}
  </div>
  <div class="text-xs text-gray-700 line-clamp-3">{task.description}</div>
  <div class="flex justify-between items-center text-xs text-gray-500">
    <div>Due: {task.dueDate ? format(new Date(task.dueDate), 'PP') : '—'}</div>
    <div class="flex gap-2">
      <button on:click={doShare} class="px-2 py-1 text-xs border rounded">Share</button>
      <button on:click={doICS} class="px-2 py-1 text-xs border rounded">ICS</button>
      <button on:click={edit} class="px-2 py-1 text-xs border rounded">Edit</button>
      <button on:click={del} class="px-2 py-1 text-xs border rounded">Del</button>
      {#if task.lane !== 'Done'}
        <button on:click={markDone} class="px-2 py-1 text-xs border rounded">Mark Done</button>
      {/if}
    </div>
  </div>
</article>
