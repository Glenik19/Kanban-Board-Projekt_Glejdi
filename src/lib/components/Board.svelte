<script>
  import { onMount } from 'svelte';
  import Lane from './Lane.svelte';
  import { exportAllToCSV } from '$lib/utils/export.js';

  let tasks = [];
  let todo = [];
  let doing = [];
  let done = [];
  let archive = [];

  onMount(() => {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(t => ({ ...t, lane: t.lane || 'ToDo' }));
    todo = tasks.filter(t => t.lane === 'ToDo').map(t => t.title);
    doing = tasks.filter(t => t.lane === 'Doing').map(t => t.title);
    done = tasks.filter(t => t.lane === 'Done').map(t => t.title);
    archive = tasks.filter(t => t.lane === 'Archive').map(t => t.title);
    saveTasksToLocalStorage();
  });

  function startDrag(item, event) {
    event.dataTransfer.setData("text/plain", item);
  }

  function dragOver(event) {
    event.preventDefault();
  }

  function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('todo', JSON.stringify(todo));
    localStorage.setItem('doing', JSON.stringify(doing));
    localStorage.setItem('done', JSON.stringify(done));
    localStorage.setItem('archive', JSON.stringify(archive));
  }

  function moveItem(target) {
    return (event) => {
      let title = event.dataTransfer.getData("text/plain");
      todo = todo.filter(i => i !== title);
      doing = doing.filter(i => i !== title);
      done = done.filter(i => i !== title);
      archive = archive.filter(i => i !== title);

      if (target === 'todo') todo.push(title);
      if (target === 'doing') doing.push(title);
      if (target === 'done') done.push(title);
      if (target === 'archive') archive.push(title);

      let movedTask = null;
      tasks = tasks.map(t => {
        if (t.title === title) {
          movedTask = { ...t, lane: target };
          return movedTask;
        }
        return t;
      });

      saveTasksToLocalStorage();

      if (target === 'done' && movedTask) {
        if (Notification.permission === 'granted') {
          new Notification('Task erledigt ✅', {
            body: `${movedTask.title} wurde auf Done verschoben.`,
          });
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              new Notification('Task erledigt ✅', {
                body: `${movedTask.title} wurde auf Done verschoben.`,
              });
            }
          });
        }
      }
    };
  }

  let showForm = false;
  let newTask = {
    title: "",
    description: "",
    creationDate: "",
    dueDate: "",
    storyPoints: 0,
    priority: "Medium"
  };

  function addTask() {
    newTask.creationDate = new Date().toLocaleDateString();
    newTask.lane = 'ToDo';
    tasks = [...tasks, { ...newTask }];
    todo = [...todo, newTask.title];
    saveTasksToLocalStorage();
    newTask = { title: "", description: "", creationDate: "", dueDate: "", storyPoints: 0, priority: "Medium" };
    showForm = false;
  }

  function getStoryPoints(list) {
    return tasks
      .filter(t => list.includes(t.title))
      .reduce((sum, t) => sum + Number(t.storyPoints || 0), 0);
  }

  function doExportCSV() {
    exportAllToCSV(tasks);
  }
</script>

<main class="p-10 w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center gap-10">
  <!-- Header -->
  <div class="text-center">
    <h1 class="text-3xl font-bold text-gray-800 tracking-tight">Task Management Board</h1>
    <p class="text-gray-500 text-sm mt-1">Organize your workflow with clarity</p>
  </div>

  <!-- Action Buttons -->
  <div class="flex gap-4">
    <button
      on:click={() => showForm = !showForm}
      class="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow hover:bg-indigo-700 transition-all duration-200"
    >
      + Add Task
    </button>

    <button
      on:click={doExportCSV}
      class="bg-amber-500 text-white px-6 py-2 rounded-xl shadow hover:bg-amber-600 transition-all duration-200"
    >
      Export CSV
    </button>
  </div>

  <!-- Task Input Form -->
  {#if showForm}
    <div class="bg-white p-6 rounded-2xl shadow-xl w-96 flex flex-col gap-4 border border-gray-100">
      <input type="text" placeholder="Title" bind:value={newTask.title}
        class="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      <textarea placeholder="Description" bind:value={newTask.description}
        class="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"></textarea>
      <input type="date" bind:value={newTask.dueDate}
        class="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      <input type="number" min="0" placeholder="Story Points" bind:value={newTask.storyPoints}
        class="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
      <select bind:value={newTask.priority}
        class="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button on:click={addTask}
        class="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition-all duration-200">
        Save Task
      </button>
    </div>
  {/if}

  <!-- Kanban Board -->
  <div class="flex justify-center items-start gap-8 w-full overflow-x-auto pb-4">
    <Lane title="ToDo" list={todo} tasks={tasks} startDrag={startDrag} onDrop={moveItem("todo")} onDragOver={dragOver} />
    <Lane title="Doing" list={doing} tasks={tasks} startDrag={startDrag} onDrop={moveItem("doing")} onDragOver={dragOver} />
    <Lane title="Done" list={done} tasks={tasks} startDrag={startDrag} onDrop={moveItem("done")} onDragOver={dragOver} />
    <Lane title="Archive" list={archive} tasks={tasks} startDrag={startDrag} onDrop={moveItem("archive")} onDragOver={dragOver} />
  </div>

  <!-- Story Points -->
  <div class="flex justify-center gap-6 mt-8 text-sm font-semibold text-gray-700">
    <div class="bg-white px-4 py-2 rounded-xl shadow-md">ToDo: {getStoryPoints(todo)} SP</div>
    <div class="bg-white px-4 py-2 rounded-xl shadow-md">Doing: {getStoryPoints(doing)} SP</div>
    <div class="bg-white px-4 py-2 rounded-xl shadow-md">Done: {getStoryPoints(done)} SP</div>
    <div class="bg-white px-4 py-2 rounded-xl shadow-md">Archive: {getStoryPoints(archive)} SP</div>
  </div>
</main>
