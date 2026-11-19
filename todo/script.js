const inputTask = document.querySelector(".task-adder");
const addBtn = document.querySelector(".add");
const priorityBtn = document.querySelectorAll(".Priority button");
const task_container = document.querySelector(".task-cards");
let clicked = false;
let priorityBtn_prioritycap_Class;
let input_val;
let priority_cap_text;
let DeleteBtn=false;
let task_Counter = 0;
if (task_container.querySelectorAll(".card").length == 0) {
    document.querySelector(".heading h3").innerHTML = `${task_Counter} Tasks Left`
}
priorityBtn.forEach(e => {
    e.addEventListener("click", (e) => {
        let targetedBtn = e.target.closest(".button");
        if (targetedBtn.classList.contains("low-priority")) {
            targetedBtn.classList.add("green");
            priorityBtn_prioritycap_Class = "green";
            if (targetedBtn.nextElementSibling.classList.contains("orange") || document.querySelector(".Priority").lastElementChild.classList.contains("red")) {
                targetedBtn.nextElementSibling.classList.remove("orange");
                document.querySelector(".Priority").lastElementChild.classList.remove("red");
            }
            clicked = true;
            priority_cap_text = e.target.innerText;

        }
        else if (targetedBtn.classList.contains("medium-priority")) {
            targetedBtn.classList.add("orange");
            priorityBtn_prioritycap_Class = "orange";
            if (targetedBtn.previousElementSibling.classList.contains("green")) {
                targetedBtn.previousElementSibling.classList.remove("green");
            }
            if (targetedBtn.nextElementSibling.classList.contains("red")) {
                targetedBtn.nextElementSibling.classList.remove("red");
            }
            clicked = true;
            priority_cap_text = e.target.innerText;
        }
        else {
            targetedBtn.classList.add("red");
            priorityBtn_prioritycap_Class = "red";
            if (targetedBtn.previousElementSibling.classList.contains("orange") || document.querySelector(".Priority").firstElementChild.classList.contains("green")) {
                targetedBtn.previousElementSibling.classList.remove("orange");
                document.querySelector(".Priority").firstElementChild.classList.remove("green");
            }
            clicked = true;
            priority_cap_text = e.target.innerText;
        }

    })

})
addBtn.addEventListener("click", () => {
    if (inputTask.value == "" || inputTask.value.trim() == "") {
        alert("Please Enter Task");
        inputTask.style.outline = "1px solid red";
        inputTask.value = ""
        inputTask.placeholder = "Please Enter a Task";
        inputTask.focus()
    }
    else if (clicked == false) {
        alert("Please Select Priority");
    }
    else {
        clicked = false;
        input_val = inputTask.value;
        let card_Html = `<div class="card">
        <div class="left-side"><input type="checkbox" name="task-done" class="check-task">
          <div class="task-title">${input_val}</div>
        </div>
        <div class="right-side">
          <div class="priority-capsule ${priorityBtn_prioritycap_Class}">
           ${priority_cap_text}
           </div>
           <button class=trash-box><svg xmlns="http://www.w3.org/2000/svg" max-width="18" height="18"
           class="bi bi-trash" viewBox="0 0 16 16">
           <path
           d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
           <path
           d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
           </svg></button>
           </div>
           </div>`
        task_container.innerHTML += card_Html;
        inputTask.value = "";
        task_Counter++;
        document.querySelector(".heading h3").innerHTML = `${task_Counter} Tasks Left`
        inputTask.removeAttribute("style");
        priorityBtn.forEach(e => {
            e.classList.remove(priorityBtn_prioritycap_Class);
        })
        document.querySelectorAll(".check-task").forEach(e => {
            e.addEventListener("change", (e) => {
                if (e.target.checked) {
                    e.target.nextElementSibling.style.textDecoration = "line-through"
                    task_Counter--;
                    document.querySelector(".heading h3").innerHTML = `${task_Counter} Tasks Left`
                }
                else {
                    e.target.nextElementSibling.style.textDecoration = "none"
                    task_Counter++
                    document.querySelector(".heading h3").innerHTML = `${task_Counter} Tasks Left`

                }
            })
        });
        document.querySelectorAll(".trash-box").forEach(btn => {
    btn.addEventListener("click", (e) => {
        let confirm_delete = confirm("Are You Sure To Delete This Task?");

        if (confirm_delete) {
            let card = e.currentTarget.closest(".card");
            let checkbox = card.querySelector(".check-task");

            if (!checkbox.checked) {
                task_Counter--;
            }

            card.remove();

            document.querySelector(".heading h3").textContent =
                `${task_Counter} Tasks Left`;
        }
    });
});
    }
})
document.querySelector(".capsule-button").addEventListener("click", (e) => {
    if (e.target.closest(".all")) {
        e.target.classList.remove("all-inactive")
        e.target.nextElementSibling.classList.remove("activeBtn")
        document.querySelector(".capsule-button").lastElementChild.classList.remove("activeBtn")
        document.querySelectorAll(".card").forEach(e => {
            e.hidden = false
        })
    }
    else if (e.target.closest(".active")) {
        e.target.classList.add("activeBtn")
        e.target.previousElementSibling.classList.add("all-inactive")
        e.target.previousElementSibling.classList.remove("activeBtn")
        e.target.nextElementSibling.classList.remove("activeBtn")
        document.querySelectorAll(".card").forEach(e => {
            if (e.querySelector(".check-task").checked) {
                e.hidden = true
            }
            else {
                e.hidden = false
            }
        })
    }
    else if (e.target.closest(".done")) {
        e.target.classList.add("activeBtn")
        e.target.previousElementSibling.classList.remove("activeBtn")
        document.querySelector(".capsule-button").firstElementChild.classList.add("all-inactive")
        document.querySelector(".capsule-button").firstElementChild.classList.add("all")
        document.querySelectorAll(".card").forEach(e => {
            if (e.querySelector(".check-task").checked) {
                e.hidden = false
            }
            else {
                e.hidden = true
            }
        })
    }
})