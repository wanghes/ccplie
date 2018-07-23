#!/usr/bin/env node
const inquirer = require("inquirer");
const colors = require("colors");
const commander = require("commander");
const path = require("path");
const fs = require("fs");
const execSync = require('child_process').execSync;
const version = require("../package.json").version;


commander
  	.version(version, "-V, --version")

commander
    .alias('ccpl')
    .option('-d, --directory', 'Add vue directory')
    .option('-t, --template', 'Add a vue template')

commander.parse(process.argv);


const projectPath = path.resolve(__dirname, '..', 'src');

const setProjectName = async () => {
  	const { projectName } = await inquirer.prompt({
	    name: "directory name",
	    message: "please input directory name"
  	});
  	if (!projectName) {
    	console.log("\n please input directory name".green + "\n");
    	await setProjectName();
 	} else {
   		return projectName;
 	}
}


const renderView = (modelView, filename, viewsPath, projectName) => {
  	const name = filename.slice(0, 1).toUpperCase() + filename.slice(1);
  	let rpInfo = fs.readFileSync(modelView).toString();
    console.log(rpInfo);
  	rpInfo = rpInfo.replace('#name#', projectName);
  	fs.writeFileSync(
	    `${viewsPath}/${filename}.vue`,
	    rpInfo
    );
    console.log(`${filename}.jsx has been rendered at ${viewsPath}`.green);
}


const tpl = async () => {
    return await inquirer.prompt({
        name: "flag",
        message: "select a template",
        type: "list",
        choices: [
            {
                name: "index template",
                value: "index"
            },
            {
                name: "form template",
                value: "form"
            }
        ]
    });
}


const type = (tpl) => {
    const form = path.resolve(__dirname, '..', 'model', 'form.vue');
    const index = path.resolve(__dirname, '..', 'model', 'index.vue');
    return {
        form,
        index
    }[tpl];
}

const release = async() => {
	var argv = process.argv;
	var args = commander.args;
	var projectName = '';
	if (process.argv.length === 2) {
    	execSync('page -h')
  	}

  	if (!argv[2]) {
  		console.error('-d param not empty'.red);
  		process.exit();
  	} else {
  		if (!args[0]) {
  			console.error('directory not empty'.red);
  			process.exit();
  		} else {
  			projectName = args[0];
  			const tempPath = process.cwd() + '/src/pages/'+ projectName;
  			if (!projectName) {
		      	projectName = await setProjectName();
		    }

		    if(projectName && !fs.existsSync(tempPath)) {
		    	fs.mkdirSync(tempPath);
		    }
  		}
  	}

    const tplName = await tpl();
    const directory = type(tplName.flag);
    const pathView = process.cwd() + '/src/pages/'+ projectName;
    renderView(directory, tplName.flag, pathView, projectName);



  	// if (!argv[4]) {
  	// 	console.error('-t param not empty'.red);
  	// 	process.exit();
  	// } else {
  	// 	let tplName = args[1];
  	// 	if (!tplName) {
  	// 		console.error('template is required'.red);
  	// 		process.exit();
  	// 	}
  	// 	const pathView = process.cwd() + '/src/'+ projectName;

  	// }
};


release().catch(err => {
    console.error(err.red);
    process.exit();
});;

