
import { log } from '@ylcli.com/utils'

const ADD_TYPE_PROJECT = 'project'
const ADD_TYPE_PAGE = 'page'
const ADD_TEMPLATE = [
    {
        name:'无人值守 uniapp 项目模板',
        npmName: '@lk-template/uni-h5app',
        version: '0.0.0'
    },
    {
        name:'vue3 项目模板',
        npmName: '@lk-template/vue3',
        version: '0.0.1'
    }
]
const ADD_TYPE = [
    {
        name: '项目',
        type: 'project'
    },
    {
        name: '页面',
        type: 'page'
    }
]

export default function createTemplate (name, opts) {
    log.info(name,opts)
}