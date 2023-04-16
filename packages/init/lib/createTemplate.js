import { homedir } from 'node:os'
import path from 'node:path'
import { log, makeInput, makeList, getLatestVersion } from '@ylcli.com/utils'

const ADD_TYPE_PROJECT = 'project'
const ADD_TYPE_PAGE = 'page'
// const ADD_TEMPLATE = [
//     {
//         name:'无人值守 uniapp 项目模板',
//         npmName: '@lk-template/uni-h5app',
//         version: '0.0.0',
//         vale: ''
//     },
//     {
//         name:'vue3 项目模板',
//         npmName: '@lk-template/vue3',
//         version: '0.0.1'
//     }
// ]
const ADD_TEMPLATE = [
    {
        name:'vue3 项目模板',
        npmName: '@imooc.com/template-vue3',
        version: '1.0.1',
        value: 'template-vue3'
    },
    {
        name:'react18项目模板',
        npmName: '@imooc.com/template-react18',
        version: '1.0.0',
        value: 'template-react18'
    }
]
const ADD_TYPE = [
    {
        name: '项目',
        value: 'project'
    },
    {
        name: '页面',
        value: 'page'
    }
]
const TEMP_HOME = '.cl-yl';

// 获取项目类型
function getAddType() {
    return makeList({
        choices: ADD_TYPE,
        message: '请选择初始化类型',
        defaultValue: ADD_TYPE_PROJECT
    })
}

// 获取项目名称
function getAddName() {
    return makeInput({
        message: '请输入项目的名称',
        defaultValue: '',
        validate: v => {
            if(v.length) {
                return true
            }
            return '项目名称必须输入！'
        }
    })
}

// 选择项目模板
function getAddTemplate() {
    return makeList({
        choices: ADD_TEMPLATE,
        message: '请选择项目模板',

    })
}

// 安装的缓存目录
function makeTargetPath() {
    const _path = path.resolve(`${homedir()}/${TEMP_HOME}`,'addTemplate');
    return _path
}


export default async function createTemplate (name, opts) {
   const addType =  await getAddType(opts)
   log.verbose('addtype', addType)
   if(addType === ADD_TYPE_PROJECT) {
    const addName = await getAddName()
    log.verbose('addName', addName)
    const addTemplate = await getAddTemplate()
    log.verbose('addTemplate', addTemplate)
    const selectedTemplate = ADD_TEMPLATE.find(v => v.value === addTemplate)
    log.verbose('selectedTemplate', selectedTemplate)
    // 获取最新版本号
   const latestVersion =  await getLatestVersion(selectedTemplate.npmName)
   log.verbose('latestVersion', latestVersion)
   selectedTemplate.version = latestVersion
   const targetPath = makeTargetPath()
    return {
        type: addType,
        name: addName,
        template: selectedTemplate,
        targetPath
    }
   }
}