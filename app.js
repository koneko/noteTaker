const chalk = require('chalk');
const yargs = require('yargs');
const fs = require('fs');
const { describe, demand, demandOption } = require('yargs');
const notes = require('./notes.js')


yargs.version("1.1.0")


//commmands
yargs.command({
    command: 'add',
    describe: 'Add a new note.',
    builder: {
        title: {
            describe: 'Note title.',
            demandOption: true,
            type: "string"
        },
        body: {
            describe: 'The text of the note.',
            demandOption: true,
            type: "string"
        }
    },
    handler: function(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note.',
    builder: {
        title: {
            describe: "The title of the note you want to remove.",
            demandOption: true,
            type: "string"
        }
    },
    handler: function(argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: "list",
    describe: "List notes.",
    handler: function() {
        notes.listNotes()
    }
})

yargs.command({
    command: "read",
    describe: "Reads a note.",
    buidler: {
        title: {
            describe: "The title of the note.",
            demandOption: true,
            type: "string"
        }
    },
    handler: function(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()
