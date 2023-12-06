const inputButton = document.querySelector(".print")

function inputFile() {
  inputButton.click()
}

function dropHandler(ev) {
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    [...ev.dataTransfer.items].forEach((item, i) => {
      if (item.kind === "file") {
        const file = item.getAsFile();
        
        uploadFile(file);
      }
    });
  } else {
    [...ev.dataTransfer.files].forEach((file, i) => {
      console.log(`… file[${i}].name = ${file.name}`);
    });
  }
}

function dragOverHandler(ev) {
  ev.preventDefault();
}

function uploadFile(file) {
  let url = 'http://localhost:3000/upload'
  let formData = new FormData()

  formData.append('file', file)

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({"filecontent":formData})
  })
  .then((resp) => {
    return resp.text();
  })
  .then((json) => {
    console.log(json);
  })
  .catch((err) => {
    console.log(err);
  })
}