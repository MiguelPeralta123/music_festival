
const firstTask = ( done ) => {
    console.log("My first task")

    // This function is a callback to indicate npm that the main function (firstTask) has finished correctly
    done()
}

// Here we export the firstTask function. To call it, open a terminal and run "npx gulp task"
exports.task = firstTask