// when DOM is ready
$(()=>{
  document.querySelector("#loginBtn").addEventListener('click', loginRoutine)
  document.querySelector("#registerBtn").addEventListener('click', registerRoutine)
})

function registerRoutine(event){
  event.preventDefault()
  let data = retrieveData(document.querySelector("#registerForm"))
  if (validateData(data, 3)){
    handleRequest(data)
  }
}

function loginRoutine(event){
  event.preventDefault()
  data = retrieveData(document.querySelector("#loginForm"))
  if (validateData(data, 2)){
    handleRequest(data)
  }
}

function retrieveData(form){
    let inputNodes = filterObject(form.childNodes, "nodeName", "INPUT")
    data = {}
    for (let key in inputNodes){
      data[`${inputNodes[key].name}`] = inputNodes[key].value
    }
    return data
}

function validateData(data, length){
  if(data.username === undefined || data.password === undefined){
    panic("missing")
    return false
  }
  if(data["username"]==="" || data["password"]===""){
    panic("missing")
    return false
  }
  if(length === 3){
    let email = data["email"]
    if (email === "" || email === undefined){
      panic("missing")
      return false
    }
    if (! /[\w-]+@([\w-]+\.)+[\w-]+/gm.test(String(email).toLowerCase())){
      panic("mailFormat")
      return false
    }
  }
  return true;
}

function handleRequest(data){
  $.ajax({
    url: './registeration.php',
    type: 'POST',
    data: data,
    error: () => {alert("Something gone wrong...")},
    success: function(message) {
      handleResponse(message)
    },
  })
}

function handleResponse(message){
  switch (message.charAt(0)) {
    case '1':
      panic("connection")
      break;
    case '2':
      next(message.slice(1))
      break;
    case '3':
      alert("The Following Error occured: " + message.slice(1))
      break;
    case '4':
      next(message.slice(1))
      break;
    case '5':
      alert("Wrong password")
      break;
    case '6':
      alert("Unregistered username")
      break;
    default:
      alert("Unkown error")

  }
}

// HELPER FUNCTIONS
function filterObject(obj, filter, filterValue){
   return Object.keys(obj).reduce((acc, val) =>
   (obj[val][filter] !== filterValue ? acc : {
       ...acc, [val]: obj[val]
   }), {})
}

function panic(reason){
  switch (reason){
    case "missing":
      alert("All fields must be filled")
      break;
    case "mailFormat":
      alert("Email must be in format: example@company.com")
      break
    case "connection":
      alert("Connection to Database failed")
      break
  }
}
