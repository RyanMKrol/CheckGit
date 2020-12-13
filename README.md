# pending-pushes

This tool will let you know when you've forgotten to push something in a directory you're tracking!

## Motivation

More often than I'd care to admit, I've done a piece of work and left it sitting in my local repo, without pushing the change out. This tool will let me watch certain directories, and let me know every time I open the terminal whether I have some work that needs pushing out!

## Usage

This has only been testing with the following setup:

- OS - macOS Big Sur
- Node Version - v12.18.2

Hopefully, this works in other environments but I can't promise anything!

Assuming this tool is compatible with your setup, here's a quick guide for how to use it.

### Installation

`npm install -g pending-pushes`

### Adding a directory

`pending-pushes --add <your_directory_of_choice>`

### Adding multiple directories

`pending-pushes --add <your_directory_of_choice> --depth <number>`

### Removing a directory from tracking

`pending-pushes --remove <your_directory_of_choice>`

### Listing currently tracked directories

`pending-pushes --list`

### Checking your tracked directories for pending pushes

`pending-pushes`

> Note: This command should be put in your .zshrc or equivalent file so you can see what paths need pushing on each shell startup!
