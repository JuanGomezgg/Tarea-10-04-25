function toggleMenu() {
    let menu = document.querySelector(".jcgg_nav");
    menu.classList.toggle("active");
}

//Task

const jcgg_taskInput = document.getElementById("jcgg_taskInput");
    const jcgg_taskList = document.getElementById("jcgg_taskList");

    jcgg_taskInput.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        jcgg_addTask();
      }
    });

    function jcgg_addTask() {
      const text = jcgg_taskInput.value.trim();
      if (text === "") return;

      const li = document.createElement("li");
      li.className = "jcgg_task";
      li.dataset.completed = "false";

      const left = document.createElement("div");
      left.className = "jcgg_task-left";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "jcgg_checkbox";
      checkbox.addEventListener("change", () => {
        li.dataset.completed = checkbox.checked;
        jcgg_updateList();
      });

      const span = document.createElement("span");
      span.textContent = text;

      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑";
      delBtn.className = "jcgg_delete-btn";
      delBtn.onclick = () => {
        li.remove();
      };

      left.appendChild(checkbox);
      left.appendChild(span);
      li.appendChild(left);
      li.appendChild(delBtn);
      jcgg_taskList.appendChild(li);

      jcgg_taskInput.value = "";
      jcgg_updateList();
    }

    function jcgg_updateList() {
      const tasks = Array.from(jcgg_taskList.children);
      tasks.forEach(task => {
        const checkbox = task.querySelector("input[type=checkbox]");
        const text = task.querySelector("span");
        if (checkbox.checked) {
          text.classList.add("jcgg_completed");
        } else {
          text.classList.remove("jcgg_completed");
        }
      });

      tasks.sort((a, b) => {
        return a.dataset.completed === "true" ? 1 : -1;
      });

      tasks.forEach(task => jcgg_taskList.appendChild(task));
    }