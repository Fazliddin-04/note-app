const addBtn = document.getElementById('add')

const notes = JSON.parse(localStorage.getItem('notes'))

if (notes) {
  notes.forEach(note => addNewNote(note))
}

addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '') {
  const note = document.createElement('div')
  note.classList.add('note')

  note.innerHTML = `
    <div class="tools">
      <div>
        <button class="heading" title="Heading"><i class="fa-solid fa-h"></i></button>
        <button class="list" title="List"><i class="fa-solid fa-list"></i></button>
      </div>
      <div>
        <button class="edit" title="Edit"><i class="fas fa-edit"></i></button>
        <button class="delete" title="Delete"><i class="fas fa-trash-alt"></i></button>
      </div>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}" placeholder="Type something . . ."></textarea>
  `
  note.style.opacity = '0'
  note.style.transition = '300ms'
  setTimeout(() => {
    note.style.opacity = '1'
  }, 100);
  const headingBtn = note.querySelector('.heading')
  const listBtn = note.querySelector('.list')
  const editBtn = note.querySelector('.edit')
  const deleteBtn = note.querySelector('.delete')
  const main = note.querySelector('.main')
  const textArea = note.querySelector('textarea')

  textArea.value = text
  main.innerHTML = marked.parse(text)

  headingBtn.addEventListener('click', () => {
    textArea.value += '\n## Type here'
    main.innerHTML = marked.parse(textArea.value)
    updateLS()
  })

  listBtn.addEventListener('click', () => {
    textArea.value += '\n- Type here'
    main.innerHTML = marked.parse(textArea.value)
    updateLS()
  })

  deleteBtn.addEventListener('click', () => {
    note.remove()
    updateLS()
  })

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden')
    textArea.classList.toggle('hidden')
    if (textArea.className == 'hidden') {
      editBtn.innerHTML = `<i class="fas fa-edit"></i>`
      headingBtn.style.opacity = '0'
      listBtn.style.opacity = '0'
    } else {
      editBtn.innerHTML = `<i class="fa-solid fa-check"></i>`
      headingBtn.style.opacity = '1'
      listBtn.style.opacity = '1'
    }

  })

  textArea.addEventListener('input', (e) => {
    const { value } = e.target
    editBtn.innerHTML = `<i class="fa-solid fa-check"></i>`
    main.innerHTML = marked.parse(value)
    updateLS()
  })

  document.body.appendChild(note)
}

function updateLS() {
  const notesText = document.querySelectorAll('textarea')

  const notes = []

  notesText.forEach(note => notes.push(note.value))

  localStorage.setItem('notes', JSON.stringify(notes));
}

// Theme Toggle
const themeBtn = document.getElementById('theme')

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('neon')
  if (document.body.className == 'neon') {
    themeBtn.innerHTML = `Classic`
  } else {
    themeBtn.innerHTML = `Neon`
  }
})