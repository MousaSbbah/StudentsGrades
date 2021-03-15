'user strict';


let allStudents=[];
getFromLocal();
function Student (name,course,grade,result){
  this.studentName=name;
  this.course=course;
  this.grade=grade;
  this.result=result;
  allStudents.push(this);
}

const formElement = document.getElementById('form');
const tableElement = document.getElementById('grade_table');
formElement.addEventListener('submit',addNewGrade);

function addNewGrade (event){
  event.preventDefault();
  let studentName = event.target.userName.value;
  let studentCourse = event.target.courses.value;
  let studentGrade = getRndInteger(0,100);
  let result;
  if (studentGrade < 50) {
    result = ' Fail';
  }else{
    result = 'Pass';
  }
  new Student ( studentName,studentCourse,studentGrade,result);
  saveInLocal();
  tableRender();
}









// Helper Functions
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function saveInLocal(){
  let data = JSON.stringify(allStudents);
  localStorage.setItem('students',data);
}

function getFromLocal(){
  let data = localStorage.getItem('students');
  if(data){
    allStudents=JSON.parse(data);
  }
}

function tableRender() {
  tableElement.innerHTML='';
  const headtr= document.createElement('tr');
  tableElement.appendChild(headtr);
  const headth1= document.createElement('th');
  headtr.appendChild(headth1);
  headth1.innerHTML='Student Name';

  const headth2= document.createElement('th');
  headtr.appendChild(headth2);
  headth2.innerHTML='Student Grade';
  const headth3= document.createElement('th');
  headtr.appendChild(headth3);
  headth3.innerHTML='Course';

  const headth4= document.createElement('th');
  headtr.appendChild(headth4);
  headth4.innerHTML='Result';

  for (let i = 0; i < allStudents.length; i++) {
    const trElement= document.createElement('tr');
    tableElement.appendChild(trElement);

    const thName= document.createElement('td');
    trElement.appendChild(thName);
    thName.innerHTML=allStudents[i].studentName;

    const thGrade= document.createElement('td');
    trElement.appendChild(thGrade);
    thGrade.innerHTML=allStudents[i].grade;


    const thCourse= document.createElement('td');
    trElement.appendChild(thCourse);
    thCourse.innerHTML=allStudents[i].course;

    const resultElement= document.createElement('td');
    trElement.appendChild(resultElement);
    if (allStudents[i].result === ' Fail') {
      resultElement.style.backgroundColor='red';

    }else{
      resultElement.style.backgroundColor='green';
    }
    resultElement.innerHTML=allStudents[i].result;

  }
  const btn = document.createElement('button');
  btn.innerHTML='clear';
  tableElement.appendChild(btn);
  btn.setAttribute('onClick','clearTable()');
}
// eslint-disable-next-line no-unused-vars
function clearTable() {
  tableElement.innerHTML='';
  localStorage.clear();
  allStudents=[];
  tableRender();
}
tableRender();
