#!/usr/bin/env node

import importLocal from 'import-local';
import { log, dirOrFileName } from '@ylcli.com/utils';
import entry from '../lib/index.js'

if (importLocal(dirOrFileName.__filename)) {
  log.info('cli', '使用本地cli-yl版本')
} else {
  // 获取脚手架命令后面的参数
  entry(process.argv.slice(2))
}