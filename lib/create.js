const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const Generator = require('./generator.js');

module.exports = async function (name, options) {
  const prompt = inquirer.createPromptModule()
  const cwd = process.cwd();

  const targetAir = path.join(cwd, name)

  const isExistAir = fs.existsSync(targetAir);

  if (isExistAir) {
    if (options.force) {
      await fs.remove(targetAir)
    } else {
      let { action } = await prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            },{
              name: 'Cancel',
              value: false
            }
          ]
        }
      ])

      if (!action) {
        return;
      } else if (action === 'overwrite') {
        console.log(`\r\nRemoving...`)
        await fs.remove(targetAir);
      }
    }
  }

    const generator = new Generator(name, targetAir);

    generator.create()
}