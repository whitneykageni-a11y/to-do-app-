let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addButton = document.getElementById("addTask");
const searchInput = document.getElementById("searchInput");
const message = document.getElementById("message");
const motivationMessages = [
    "Nice Work 🎉",
    "Task Completed ✔",
    "Progress Matters 🌱",
    "Small Steps Count 🚀",
    "Nice Work 🎉",
    "Great progress 🌱",
    "You're building momentum 🚀"
];

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(taskObj => {
        const li = document.createElement("li");
        li.textContent = taskObj.text;
        if (taskObj.completed) li.classList.add("completed");

        // Toggle completed
        li.addEventListener("click", function() {
            taskObj.completed = !taskObj.completed;
            li.classList.toggle("completed");
            localStorage.setItem("tasks", JSON.stringify(tasks));
            const randomIndex = Math.floor(
                Math.random() * motivationMessages.length
            );

            const randomMessage = motivationMessages[randomIndex];
            showFloatingMessage(randomMessage);
        });
        // Delete button
        const delbtn = document.createElement("button");
        delbtn.textContent = "Delete";
        delbtn.addEventListener("click", function(e) {
            e.stopPropagation();
            tasks = tasks.filter(t => t !== taskObj);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        });

        li.appendChild(delbtn);
        taskList.appendChild(li);
    });
}

function showFloatingMessage(text) {
    message.style.display = "block";
    message.textContent = text;
    // reset animation (important for repeat triggering)
    message.classList.remove("float");
    void message.offsetWidth; // forces reflow
    message.classList.add("float");
    setTimeout(function() {
        message.style.display = "none";
        message.textContent = "";
    }, 2000);
}

function addTask(taskText) {
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// Add task with button
addButton.addEventListener("click", function() {
    if (taskInput.value.trim() !== "") {
        addTask(taskInput.value.trim());
        message.style.display = "block";
        message.textContent = "Task Added 🎉";

        setTimeout(function() {
            message.style.display = "none";
            message.textContent = "";
        }, 2000);
        taskInput.value = "";
    }
});

// Add task with Enter key
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter" && taskInput.value.trim() !== "") {
        message.style.display = "block";
        message.textContent = "Task Added 🎉";
        setTimeout(function() {
            message.style.display = "none";
            message.textContent = "";
        }, 2000);
        addTask(taskInput.value.trim());
        taskInput.value = "";
    }
});

// Search
searchInput.addEventListener("input", function() {
    const searchValue = searchInput.value.toLowerCase();
    const lis = document.querySelectorAll("#taskList li");
    lis.forEach(li => {
        if (li.textContent.toLowerCase().includes(searchValue)) {
            li.style.display = "list-item";
        } else {
            li.style.display = "none";
        }
    });
});

// Initial render
window.addEventListener("DOMContentLoaded", renderTasks);