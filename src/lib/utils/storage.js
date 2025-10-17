export const STORAGE_KEY = 'kanban_tasks_v1';

export function loadTasks(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch{
    return [];
  }
}

export function saveTasks(tasks){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }catch{}
}

export function addTask(task){
  const tasks = loadTasks();
  tasks.push(task);
  saveTasks(tasks);
}

export function updateTask(task){
  const tasks = loadTasks().map(t => t.id === task.id ? task : t);
  saveTasks(tasks);
}

export function deleteTask(id){
  const tasks = loadTasks().filter(t => t.id !== id);
  saveTasks(tasks);
}
