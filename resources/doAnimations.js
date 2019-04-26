$("select").on("change", retrieveCourses)

function next(username){
  setTimeout(()=>{
    $("h1").text("Welcome " + username + "!")
  },500)
  $("#loginContainer").fadeOut("slow")
  retrieveOptions()
}

function retrieveOptions(){
  $.ajax({
    url: './chooseDepartment.php',
    type: 'POST',
    data: {"request": "options"},
    error: () => {alert("Something gone wrong...")},
    success: function(options) {
      if(options === "1"){
        panic("connection")
        return
      }
      fillOptions(JSON.parse(options))
    },
  })
}

function fillOptions(options){
  let list = document.querySelector("select")
  options.forEach(option => {
    let el = document.createElement("option")
    el.value = option["dept_id"]
    el.innerHTML = option["name"]
    list.appendChild(el)
  })
  setTimeout(()=>{
    $("#selectContainer").fadeIn("slow")
  }, 600)
}

function retrieveCourses(){
  let dept = $("select").val()
  let name = $("h1").text().slice(8, $("h1").text().length - 1)
  $.ajax({
    url: './courses.php',
    type: 'POST',
    data: {"dept": dept, "name": name},
    error: () => {alert("Something gone wrong...")},
    success: function(courses) {
      if(courses === "1"){
        panic("connection")
        return
      }
      displayCourses(JSON.parse(courses))
    },
  })
}

function displayCourses(courses){
  let table = document.querySelector("#coursesContainer table")
  courses.forEach(course => {
    let row = document.createElement("tr")
    for(let i=0; i<5; i++){
      let td = document.createElement("td")
      td.innerHTML = course[i]
      row.appendChild(td)
    }
    table.appendChild(row)
  })

  $("#selectContainer").fadeOut("slow")

  setTimeout(()=>{
    $("#coursesContainer").fadeIn("slow")
  }, 600)

}
