import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'phaser-cli',
  run: async (toolbox) => {
    const {print: {printHelp}} = toolbox;

    printHelp(toolbox);
  },
}

module.exports = command
