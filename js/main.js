var diasSemana = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
var meses = ["En", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
function setTime(){ 
    var date = new Date;
    var mes = meses[date.getMonth()];
    var day = diasSemana[date.getDay()];
    var numberDay = date.getUTCDate();
    document.getElementById("date").innerHTML = day + ", " + mes + " " + numberDay;
}

setTime();

var LIST;
var id;

var data = localStorage.getItem("TODO");

const list = document.getElementById("list");
const input = document.getElementById("input");
const buttonAddToDo = document.getElementById("btnAddToDo");

const CHECK = "fa-check-circle";
const UNCHECKED = "fa-circle";
const LINE_THROUGH = "lineThrough";

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(item => {
        addToDo(item.name, item.id, item.done);
    });
}



function addToDo(toDo, id, done){
    
    const DONE = done ? CHECK : UNCHECKED;
    const LINE = done ? LINE_THROUGH : "";
    const item =
        `<li class="item">
                    <i class="far ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fab fas fa-trash-alt de" job="delete" id="${id}"></i>
        </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position,item);
    window.scrollTo(0,document.querySelector(".add-to-do").scrollHeight);
}



document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false
            })
            localStorage.setItem("TODO", JSON.stringify(LIST));
            list.lastChild.scrollIntoView();;
            id++;
        }
        input.value = "";
    }
})

buttonAddToDo.addEventListener("click", e => {
    const toDo = e.target.parentNode.querySelector("#input").value;
    if(toDo){
        addToDo(toDo, id, false, false);

        LIST.push({
            name: toDo,
            id: id,
            done: false
            
        })
        localStorage.setItem("TODO", JSON.stringify(LIST));

        id++;
    }
    input.value = "";
    input.focus();
})

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECKED);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false :true;
}

function removeToDo(element){
    
    element.parentNode.parentNode.removeChild(element.parentNode);

    
    LIST.splice(element.id, 1);
    localStorage.setItem("TODO", JSON.stringify(LIST));
}

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
   

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
})