const newTaskInput = document.querySelector("#newTaskInput");
const newTaskDate = document.querySelector("#newTaskDate");
const tasksDiv = document.querySelector("#tasks");
let deleteTasks;
let tasks;
let updateNote = "";
let count;
let errorInfo = document.querySelector(".errorInfo");
let addBtn = document.querySelector("#addBtn");
let searchBar = document.querySelector("#search-bar");
let searchContainer = document.querySelector(".searchButton");
let searchInfoArea = document.querySelector(".searchInfo");

window.onload = () => {
  updateNote = "";
  count = Object.keys(localStorage).length;
  draw();
  podswietl(searchBar.value);
};

const draw = () => {
  if (Object.keys(localStorage).length > 0) {
    tasksDiv.style.display = "inline-block";
  } else {
    tasksDiv.style.display = "none";
    errorInfo.textContent = "Brak zadan";
  }
  tasksDiv.innerHTML = "";

  let tasks = Object.keys(localStorage);
  tasks = tasks.sort();

  for (let key of tasks) {
    let classValue = "";
    let value = localStorage.getItem(key);
    let taskInnerDiv = document.createElement("li");
    taskInnerDiv.classList.add("task");
    taskInnerDiv.setAttribute("id", key);
    taskInnerDiv.innerHTML = `<span id="taskName">${
      key.split("_")[1]
    }</span><span id="taskDate">${key.split("_")[2]}</span>`;
    taskInnerDiv.innerHTML += `<button class="delete"><i class="fa-solid fa-xmark"></i></button>`;
    tasksDiv.appendChild(taskInnerDiv);
  }

  //Tasks Delete
  deleteTasks = document.getElementsByClassName("delete");
  Array.from(deleteTasks).forEach((element, index) => {
    element.addEventListener("click", (e) => {
      e.stopPropagation();
      //Delete from LS
      let parent = element.parentElement;
      usuwanie(parent.id);
      parent.remove();
      count -= 1;
    });
    errorInfo.textContent = "";
  });
};

const usuwanie = (taskValue) => {
  localStorage.removeItem(taskValue);
  draw();
};

const wyczysc = (taskValue) => {
  localStorage.clear();
};

const aktualizacja = (index, taskValue, taskDate, completed) => {
  localStorage.setItem(`${index}_${taskValue}_${taskDate}`, completed);
  draw();
};

const dodawanie = () => {
  if (newTaskInput.value.length >= 3 && newTaskInput.value.length <= 255) {
    let taskDate = Date.parse(newTaskDate.value);
    let nowDate = Date.now();

    let tmpDate = newTaskDate.value;

    if (taskDate >= nowDate || isNaN(taskDate)) {
      if (updateNote == "") {
        aktualizacja(
          count,
          newTaskInput.value,
          tmpDate.replace("T", " g."),
          false
        );
      } else {
        let existingCount = updateNote.split("_")[0];
        usuwanie(updateNote);
        aktualizacja(
          existingCount,
          newTaskInput.value,
          tmpDate.replace("T", " g."),
          false
        );
        updateNote = "";
      }
      count += 1;
      newTaskInput.value = "";
      newTaskDate.value = "";
      errorInfo.textContent = "";
    } else {
      errorInfo.textContent = "Data, znajduje się w przeszłości";
    }
  } else {
    if (newTaskInput.value.length < 3) {
      errorInfo.textContent = "Wpisz co najmniej 3 litery.";
    }
    if (newTaskInput.value.length > 255) {
      errorInfo.textContent =
        "O " + (newTaskInput.value.length - 255) + " znaków za dużo";
    }
    newTaskDate.value = "";
  }
};

function podswietl(text) {
  var inputText = document.getElementById("taskName");
  var innerHTML = inputText.innerHTML;
  var index = innerHTML.indexOf(text);
  if (index >= 0) {
    innerHTML =
      innerHTML.substring(0, index) +
      "<span class='highlight'>" +
      innerHTML.substring(index, index + text.length) +
      "</span>" +
      innerHTML.substring(index + text.length);
    inputText.innerHTML = innerHTML;
  }
}

const szukaj = (e) => {
  searchInfoArea.textContent = "";
  const searchVal = e.target.value.toLowerCase();
  const allTasks = document.querySelectorAll(".task");
  for (let task of allTasks) {
    const item = task.textContent;
    if (searchVal.length >= 3) {
      if (item.toLowerCase().indexOf(searchVal) !== -1) {
        podswietl(searchVal);
      } else {
        task.style.display = "none";
      }
    } else {
      draw();
    }
  }
};

searchContainer.addEventListener("click", () => {
  setTimeout(() => {
    const box = document.querySelector(".searchInfo");
    box.style.display = "block";
    box.textContent = "Wpisz co najmniej 3 litery.";
  });
});

searchContainer.addEventListener("keydown", () => {
  setTimeout(() => {
    const box = document.querySelector(".searchInfo");
    box.style.display = "none";
  }, 5000);
});

addBtn.addEventListener("click", dodawanie);
searchBar.addEventListener("keydown", szukaj);

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  draw();
});
