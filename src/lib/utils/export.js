export function exportToICS(task){
  const start = task.dueDate ? new Date(task.dueDate).toISOString().replace(/[-:]/g,'').split('.')[0]+'Z'
                             : new Date().toISOString().replace(/[-:]/g,'').split('.')[0]+'Z';
  const ics = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
UID:${task.id}
DTSTAMP:${start}
DTSTART:${start}
DTEND:${start}
SUMMARY:${task.title}
DESCRIPTION:${task.description || ''}
PRIORITY:${task.priority==='High'?1:task.priority==='Medium'?5:9}
END:VEVENT
END:VCALENDAR
`.trim();

  const blob = new Blob([ics], { type: 'text/calendar' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${task.title || 'task'}.ics`;
  a.click();
  URL.revokeObjectURL(a.href);
}

// Web Share
export function shareTask(task){
  const text = `Task: ${task.title}\n${task.description || ''}\nDue: ${task.dueDate||'–'}\nStory Points: ${task.storyPoints}\nPriority: ${task.priority}`;
  if(navigator.share){
    navigator.share({ title: task.title, text }).catch(()=>{});
  } else alert('Web Share API wird nicht unterstützt.');
}

// CSV Export
export function exportAllToCSV(tasks){
  if(!tasks.length) return;
  const headers = ['Title','Description','CreationDate','DueDate','StoryPoints','Priority','Lane'];
  const rows = tasks.map(t => [
    `"${t.title}"`,
    `"${t.description || ''}"`,
    `"${t.creationDate}"`,
    `"${t.dueDate || ''}"`,
    t.storyPoints,
    t.priority,
    t.lane
  ].join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = 'kanban_tasks.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}
