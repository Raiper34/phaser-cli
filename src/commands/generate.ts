import { GluegunToolbox } from 'gluegun'
import {camelCase} from 'lodash';

module.exports = {
  name: 'generate',
  alias: ['g'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      template: { generate },
      filesystem: { inspectTree, cwd, read },
    } = toolbox

    const {assets: assetsConfig} = await read(`${cwd()}/.pcrc`, 'json');
    for (let assetFolder of assetsConfig) {
      const assets = (await inspectTree(`${cwd()}/${assetFolder}`)).children
        .filter(item => item.type === 'file')
        .map(item => {
          return {name: firstCase(item.name.split('.')[0]), path: item.name};
        });
      const assetPath = assetFolder.split('/');
      const assetName = assetPath[assetPath.length - 1];
      await generate({template: 'asset.enum.ts.ejs', target: `${assetName}.enum.ts`, props: {assetName: firstCase(assetName), assets, camelCase}});
    }
  },
}

function firstCase(val: string): string {
  const camelCased = camelCase(val)
  return String(camelCased).charAt(0).toUpperCase() + String(camelCased).slice(1);
}
