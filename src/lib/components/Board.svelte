<script>
  import Lane from './Lane.svelte';

  // interne Speicherung der Task-Objekte
  let tasks = [];

  // Arrays für Drag & Drop (nur Title)
  let todo = [];
  let doing = [];
  let done = [];
  let archive = [];

  // Drag & Drop Funktionen (wie bei dir)
  function startDrag(item, event) {
    event.dataTransfer.setData("text/plain", item);
  }

  function dragOver(event) {
    event.preventDefault();
  }

  function moveItem(target) {
    return (event) => {
      let item = event.dataTransfer.getData("text/plain");

      todo = todo.filter(i => i !== item);
      doing = doing.filter(i => i !== item);
      done = done.filter(i => i !== item);
      archive = archive.filter(i => i !== item);

      if (target === "todo") todo = [...todo, item];
      if (target === "doing") doing = [...doing, item];
      if (target === "done") done = [...done, item];
      if (target === "archive") archive = [...archive, item];
    };
  }

  // Formularsteuerung
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
    // Creation-Date automatisch setzen
    newTask.creationDate = new Date().toLocaleDateString();

    // Objekt intern speichern
    tasks = [...tasks, { ...newTask }];

    // In ToDo-Array nur der Title für Drag & Drop
    todo = [...todo, newTask.title];

    // Formular zurücksetzen
    newTask = { title: "", description: "", creationDate: "", dueDate: "", storyPoints: 0, priority: "Medium" };
    showForm = false;
  }
</script>

<main class="p-8 w-full bg-gray-200 min-h-screen flex flex-col items-center gap-8">
  <!-- Button zum Anzeigen des Formulars -->
  <button
    on:click={() => showForm = !showForm}
    class="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
  >
    + Add Task
  </button>

  <!-- Task Eingabeformular -->
  {#if showForm}
    <div class="bg-white p-6 rounded-lg shadow-md w-96 flex flex-col gap-4">
      <input type="text" placeholder="Title" bind:value={newTask.title} class="border p-2 rounded" />
      <textarea placeholder="Description" bind:value={newTask.description} class="border p-2 rounded"></textarea>
      <input type="date" bind:value={newTask.dueDate} class="border p-2 rounded" />
      <input type="number" min="0" placeholder="Story Points" bind:value={newTask.storyPoints} class="border p-2 rounded" />
      <select bind:value={newTask.priority} class="border p-2 rounded">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button on:click={addTask} class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
        Save Task
      </button>
    </div>
  {/if}

  <!-- Kanban Board -->
  <div class="flex justify-center items-start gap-6 w-full">
    <Lane title="ToDo" list={todo} startDrag={startDrag} onDrop={moveItem("todo")} onDragOver={dragOver} />
    <Lane title="Doing" list={doing} startDrag={startDrag} onDrop={moveItem("doing")} onDragOver={dragOver} />
    <Lane title="Done" list={done} startDrag={startDrag} onDrop={moveItem("done")} onDragOver={dragOver} />
    <Lane title="Archive" list={archive} startDrag={startDrag} onDrop={moveItem("archive")} onDragOver={dragOver} />
  </div>
</main>
