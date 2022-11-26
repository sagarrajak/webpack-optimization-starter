import styles from "./notification.module.css";
import jss from "jss";
import preset from "jss-preset-default";
import checkMartImages from '../assets/checkmark.svg';

jss.setup(preset());

const jssStyle = {
  realCheckbox: {
    width: "30px",
    height: "30px",
    cursor: "pointer",
    opacity: 0,
    position: "absolute",
    top: "-3px",
    left: "-5px",
  },
};

const { classes } = jss.createStyleSheet(jssStyle).attach();

export function renderTodos(todos) {
  const renderedItemArray = todos.map(function (todo) {
    const className = todo.completed ? "completed" : "";
    const completionClass = todo.completed ? "checked" : "";
    return `
            <li data-id="${todo.id}" class="${className}">
                <span class="custom-checkbox">
                    <img class="check" src="${checkMartImages}" width="22" height="22"></img>
                    <input class="${classes.realCheckbox}" data-element="real-checkbox" type="checkbox" ${completionClass} />
                </span>
                <label>${todo.text}</label>
                <span class="delete"></span>
            </li>
        `;
  });
  document.querySelector(".todo-list").innerHTML = renderedItemArray.join("");
}

export function clearNewTodoInput() {
  document.querySelector(".new-todo").value = "";
  showNotification();
}

export function getTodoId(element) {
  return parseInt(
    element.dataset.id ||
      element.parentNode.dataset.id ||
      element.parentNode.parentNode.dataset.id,
    10
  );
}

function showNotification() {
  let notificationEle = `<div role="alert" class="alert alert-success ${styles.notification}">New Todo Added</div>`;
  document.body.innerHTML += notificationEle;
  setTimeout(() => {
    let notification = document.querySelector(`.${styles.notification}`);
    notification.parentNode.removeChild(notification);
  }, 2000);
}
