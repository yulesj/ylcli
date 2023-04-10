#!/usr/bin/env node

const importLocal = require('import-local');
const { log } = require('@ylcli.com/utils');
const entry = require('../lib/index')

if (importLocal(__filename)) {
  log.info('cli', '使用本地cli-yl版本')
} else {
  // 获取脚手架命令后面的参数
  entry(process.argv.slice(2))
}