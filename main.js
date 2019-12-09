//GET, PUT, POST, DELETE REQUESTS WITH AXIOS, USING AXIOS CDN SCRIPT IN index.js

//GET REQUEST
function getTodos() {
  //long way of fetching data with axios
  //
  //   axios({
  //     method: "get",
  //     url: "https://jsonplaceholder.typicode.com/todos",
  //NOTE setting ammount of todos we want back url would look like this https://jsonplaceholder.typicode.com/todos?_limit=10
  // params: {
  //   _limit: 10
  // }
  //   })
  //NOTE faster way to do the same thing we did above
  axios
    .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
    .then(res => {
      console.log({
        statusCode: res.status,
        method: res.config.method,
        data: res.data
      });
      showOutput(res);
    })
    .catch(err => console.error(err));
}

//POST REQUEST
function addTodo() {
  axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      title: "New Todo",
      completed: false
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

//PUT/PATCH REQUEST PUT replaces the data with the data you are sending, PATCH updates the data to the data you are sending.
function updateTodo() {
  axios
    .patch(`https://jsonplaceholder.typicode.com/todos/1`, {
      title: "Replacing Todo using PUT",
      completed: true
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

//DELETE REQUEST
function removeTodo() {
  axios
    .delete("https://jsonplaceholder.typicode.com/todos/1")
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}
//SIMULTANEOUS DATA, using axios.all to run more then one request, only return a promise once all the requests are filled
function getData() {
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos"),
      axios.get("https://jsonplaceholder.typicode.com/posts")
    ])
    //instead of using a callback in the .then and access each request from the array ie res[0], res[1].
    //we can use axios.spread which takes in a callback function, the arguments are the data you get back and you can name them (see below)
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch(err => console.error(err));
}

//CUSTOM HEADERS

//TRANSFORMING REQUESTS & RESPONSES

//ERROR HANDLING

// CANCEL TOKEN

// INTERCEPTING REQUESTS & RESPONSES

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
      <div class="card card-body mb-4">
        <h4>Status: ${res.status}</h4>
      </div>
      <div class="card mt-3">
        <div class="card-header">
          Headers
        </div>
        <div class="card-body">
          <pre>${JSON.stringify(res.headers, null, 2)}</pre>
        </div>
      </div>
      <div class="card mt-3">
        <div class="card-header">
          Data
        </div>
        <div class="card-body">
          <pre>${JSON.stringify(res.data, null, 2)}</pre>
        </div>
      </div>
      <div class="card mt-3">
        <div class="card-header">
          Config
        </div>
        <div class="card-body">
          <pre>${JSON.stringify(res.config, null, 2)}</pre>
        </div>
      </div>
    `;
}

//Event Listeners
document.querySelector("#get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.querySelector(`#update`).addEventListener("click", updateTodo);
document.querySelector("#delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
