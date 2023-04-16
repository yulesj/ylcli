import path from 'node:path'
import { pathExistsSync } from 'path-exists'
import fse from 'fs-extra'
import ora from 'ora'
import { execa } from 'execa'
import { printErrorLog, log } from '@ylcli.com/utils'

function getCacheDir(targetPath) {
    return path.resolve(targetPath, 'node_modules')
}

function makeCacheDir(targetPath) {
    const cacheDir = getCacheDir(targetPath)
    // 判断缓存目录是否存在
    if(!pathExistsSync(cacheDir)) {
        // 路径下没有直接创建
        fse.mkdirpSync(cacheDir);
    }
}

async function downloadAddTemplate(targetPath, template) {
    const { npmName, version } = template
    const installCommand = 'npm';
    const installArgs = ['install', `${npmName}@${version}`];
    const cwd = targetPath
    log.verbose('installArgs', installArgs)
    log.verbose('cwd', cwd)
    const subprocess = execa(installCommand,installArgs,{cwd})
    await subprocess;
}

export default async function downloadTemplate(templateInfo) {
    const { template,  targetPath } = templateInfo

    // 创建缓存目录
    makeCacheDir(targetPath)
    const spinner = ora('正在下载模板...').start();
    try {
        await downloadAddTemplate(targetPath, template)
        spinner.stop()
        log.success('模板下载成功！')
    } catch (e) {
        spinner.stop()
        printErrorLog(e)
    }
}