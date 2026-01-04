const themeToggle = document.getElementById('theme_toggle');
const taskList = document.getElementById('task_list');
const addBtn = document.getElementById('add_task_btn');
const taskTitle = document.getElementById('task_title');
const taskDesc = document.getElementById('task_desc');
const taskDue = document.getElementById('task_due');
const taskPriority = document.getElementById('task_priority');
const taskTags = document.getElementById('task_tags');
const taskDeps = document.getElementById('task_deps');
const taskRecurring = document.getElementById('task_recurring');
const filterTags = document.getElementById('filter_tags');
const filterPriority = document.getElementById('filter_priority');
const applyFilter = document.getElementById('apply_filter');
const calendar = document.getElementById('calendar');

themeToggle.addEventListener('change', ()=>document.body.classList.toggle('dark-mode'));

async function loadTasks(){
    const res = await fetch('/api/tasks');
    const tasks = await res.json();
    renderTasks(tasks);
    renderCalendar(tasks);
}

addBtn.addEventListener('click', async ()=>{
    const task = {
        title:taskTitle.value,
        description:taskDesc.value,
        due_date:taskDue.value,
        priority:taskPriority.value,
        tags:taskTags.value,
        dependencies:taskDeps.value,
        recurring:taskRecurring.value
    };
    await fetch('/api/tasks',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(task)});
    clearInputs();
    loadTasks();
});

function clearInputs(){ taskTitle.value=''; taskDesc.value=''; taskDue.value=''; taskTags.value=''; taskDeps.value=''; }

function renderTasks(tasks){
    taskList.innerHTML='';
    tasks.forEach(task=>{
        const li=document.createElement('li');
        li.textContent=`${task.title} [${task.priority.toUpperCase()}] - Due: ${task.due_date}`;
        li.style.color=task.priority;
        const rm=document.createElement('button');
        rm.textContent='X';
        rm.addEventListener('click', async()=>{ await fetch(`/api/tasks/${task.id}`,{method:'DELETE'}); loadTasks(); });
        li.appendChild(rm);
        taskList.appendChild(li);
    });
}

function renderCalendar(tasks){
    calendar.innerHTML='';
    const dates=[...new Set(tasks.map(t=>t.due_date))].sort();
    dates.forEach(date=>{
        const dayDiv=document.createElement('div');
        dayDiv.textContent=`📅 ${date}`;
        tasks.filter(t=>t.due_date===date).forEach(t=>{
            const tDiv=document.createElement('div');
            tDiv.textContent=`- ${t.title} [${t.priority}]`;
            tDiv.style.color=t.priority;
            dayDiv.appendChild(tDiv);
        });
        calendar.appendChild(dayDiv);
    });
}

loadTasks();
