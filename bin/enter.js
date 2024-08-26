#! /usr/bin/env node

const { Command } = require('commander');

const program = new Command()

program
  .command('create <app-name>')
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    require('../lib/create.js')(name, options)
  })

program
  .command('config [value]')
  .description('inspect and modify the config')
  .option('-g --get <path>', 'get value from options')
  .option('-s', '--set <path> <value')
  .option('-d', '--delete <path>', 'delete option from config')
  .action((value, options) => {
    console.warn(value, options)
  })

program
  .command('ui')
  .description('start and open cool-cli ui')
  .option('-p', '--port <port>', 'Port used for the ui server')
  .action(option => {
    console.warn(option)
  })

program
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')

program
  .on('--help', () => {
    console.log(`\r\nRun ${chalk.cyan(`cool-cli <command> --help`)} for detailed usage of given command\r\n`)
  })

program.parse(process.argv)
// const inquirer = require('inquirer')

// const prompt = inquirer.createPromptModule()

// prompt([
//   {
//     type: 'input',
//     name: 'name',
//     message: '你的名字',
//     default: 'cool-cli'
//   }
// ]).then(answer => {
//   const destUrl = path.join(__dirname, 'templates');

//   const cwdUrl = process.cwd();

//   FileSystem.readdir(destUrl, (err, files) => {
//     if (err) throw err;

//     files.foreach(files => {
//       ejs.renderFile(path.join(destUrl, file), answer)
//         .then(data => {
//           fs.writeFileSync(path.join(cwdUrl, file), data)
//         })
//     })
//   })
// })