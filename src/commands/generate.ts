import { GluegunToolbox } from 'gluegun'
import {camelCase} from 'lodash';

//const BASE_SFX = './src/assets/sfx'; // todo make it configurable
//const BASE_GFX = 'src/commands';

module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      template: { generate },
      filesystem: { list, cwd },
    } = toolbox

    const assets = (await list(cwd()));
    await generate({template: 'asset.enum.ts.ejs', target: 'gfx.enum.ts', props: {assets, camelCase}});
  },
}
