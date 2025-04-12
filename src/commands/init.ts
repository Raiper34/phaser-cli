import { GluegunToolbox } from 'gluegun'
import { TreeUtils } from 'simple-tree-utils'


module.exports = {
  name: 'init',
  alias: ['i'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      template: { generate },
      filesystem: { inspectTree, cwd },
      prompt: {ask},
    } = toolbox

    const {folders} = await ask({
      type: 'multiselect',
      name: 'folders',
      message: 'Select all asset folders (e.g. GFX, SFX...). These folders will be used for generating helper enums.',
      choices: await getFolders(inspectTree, cwd),
    });
    await generate({template: '.pcrc.ejs', target: '.pcrc', props: {folders}});
  },
}

async function getFolders(inspectTree, cwd): Promise<string[]> {
  const treeUtils = new TreeUtils();
  const treeItems = (await inspectTree(cwd())).children;
  treeUtils.computePaths(treeItems, 'name');
  treeUtils.forEach(treeItems, item => item.path = `${item.path}${item.name}`);
  return treeUtils.tree2List(treeItems).filter(item => !item.path.includes('node_modules') && !item.path.includes('/.') && item.type === 'dir').map(item => item.path);
}
