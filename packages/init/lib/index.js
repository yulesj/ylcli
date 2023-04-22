import { log } from '@ylcli.com/utils'
import Command from '@ylcli.com/command'
import createTemplate from './createTemplate.js'
import downloadTemplate from './downloadTemplate.js'
import installTemplate from './installTemplate.js'

/**eg.
 * cli-yl init
 * cli-yl init aa -t project -tp template-vue3 -f  
 */

class InitCommand extends Command {
  get command() {
    return 'init [name]'
  }

  get description() {
    return 'init project'
  }

  get options() {
    return [
      ['-f, --force', '是否强制更新', false],
      ['-t, --type <type>', '项目类型（值：project/page）'],
      ['-tp, --template <type>', '项目模板名称'],
    ]
  }

  async action([name,opts]) {
    log.verbose('init', name, opts)
    // 1、选择项目模板，生成项目信息
    const templateInfo = await createTemplate(name,opts)
    // 2、下载项目模板至缓存目录
    await downloadTemplate(templateInfo);
    // 3、安装项目模板至目录
    await installTemplate(templateInfo, opts)
  }

  preAction() {
    console.log('preAction')
  }

  postAction() {
    console.log('postAction')
  }
}

function Init(instance) {
  return new InitCommand(instance);
}

export default Init;
