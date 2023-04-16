import fse from "fs-extra";
import path from "node:path";
import { pathExistsSync } from "path-exists";
import ora from 'ora'
import { log } from '@ylcli.com/utils'

function getCacheFilePath(targetPath, template) {
    return path.resolve(targetPath, 'node_modules', template.npmName, 'template')
}

function copyFile(targetPath, template, installDir) {
    const originFile = getCacheFilePath(targetPath, template)
    console.log(originFile)
    console.log(pathExistsSync(originFile))
    const fileList = fse.readdirSync(originFile);
    console.log(fileList)
    const spinner = ora('正在拷贝模板文件...').start();
    fileList.map(file => {
        fse.copySync(`${originFile}/${file}`, `${installDir}/${file}`)
    })
    spinner.stop()
    log.success('模板拷贝成功')
}


export default function installTemplate(templateInfo, opts) {
  const { force = false } = opts;
  const { targetPath, template, name } = templateInfo;
  const rootDir = process.cwd();
  // 确认缓存目录是否存在
  fse.ensureDirSync(targetPath);
  const installDir = path.resolve(`${rootDir}/${name}`);
  // 判断安装目录是否存在
  if (pathExistsSync(installDir)) {
    if(!force){
        log.error(`当前目录下已存在 ${ installDir } 文件夹`)
        return
    } else {
        // 如果强制安装 先删除目录
        fse.removeSync(installDir)
        fse.ensureDirSync(installDir)
    }
  } else {
    fse.ensureDirSync(installDir)
  }
  copyFile(targetPath, template, installDir)
}
