const listsContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector("[data-delete-list-button]");

const LOCAL_STOREGE_LIST_KEY = "task.list";
const LOCAL_STOREGE_SELECTED_LIST_ID_KEY = "task.selectedListId";

let lists = JSON.parse(localStorage.getItem(LOCAL_STOREGE_LIST_KEY)) || [];
let selectedListId = JSON.parse(
  localStorage.getItem(LOCAL_STOREGE_SELECTED_LIST_ID_KEY)
);

// Listener Events
deleteListButton.addEventListener("click", (e) => {
  console.log(selectedListId);
  lists = lists.filter((list) => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
});

listsContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    console.log(selectedListId);
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

newListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const listname = newListInput.value;
  if (listname == null || listname === "") return;
  const list = createList(listname);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
});

function createList(name) {
  return { id: Date.now().toString(), name: name, tasks: [] };
}

function render() {
  clearElement(listsContainer);
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list.name;
    if (list.id === selectedListId) {
      listElement.classList.add("active-list");
    }
    listsContainer.appendChild(listElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem(LOCAL_STOREGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STOREGE_SELECTED_LIST_ID_KEY, selectedListId);
}

render();
