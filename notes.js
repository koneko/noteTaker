const fs = require("fs")
const chalk = require("chalk")
const { array } = require("yargs")

const getNotes = function () {
    return "Ur notes..."
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        
        saveNotes(notes)
        console.log(chalk.yellow('Added note.'))
        console.log( 'Title: ' + title + "\nBody: " + body)
    } else {
        console.log(chalk.red.inverse("The title you tried to add " + "(" + title + ")" + " is taken."))
    }

}

const removeNote = function(title) {
    const notes = loadNotes()
    const notesToKeep = notes.filter(function(note) {
        return note.title !== title
    })

    saveNotes(notesToKeep)

    if(notes.length > notesToKeep.length) {
        console.log(chalk.green("Note removed."))
    } else {
        console.log(chalk.red("Note not found."))
    }
}

const listNotes = function() {
    console.log(chalk.inverse("Your notes."))
    const notes = loadNotes()
    notes.forEach((note) => {
        console.log(chalk.yellow(note.title))
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if (note) {
    console.log(chalk.red("Title: ") + chalk.inverse(note.title))
    console.log(chalk.yellow("Text: ") + note.body)
    } else {
        console.log(chalk.red.inverse("Note not found!"))
    }
}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON)
}

const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }
    

}



module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}