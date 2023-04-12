#!/usr/bin/env node

import importLocal from 'import-local';
import { filename } from 'dirname-filename-esm'
import { log } from '@ylcli.com/utils';
import entry from '../lib/index.js'

const __filename = filename(import.meta)
console.log(__filename)
if (importLocal(__filename)) {
  log.info('cli', '使用本地cli-yl版本')
} else {
  // 获取脚手架命令后面的参数
  entry(process.argv.slice(2))
}