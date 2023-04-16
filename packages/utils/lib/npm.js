import urlJoin from "url-join";
import axios from "axios";
import log from './log.js'

async function getNpmInfo(npmName) {
  const registry = "https://registry.npmjs.org/";
  const url = urlJoin(registry, npmName);
  try {
    const response = await axios.get(url);
    if (response.status === 200) return response.data;
  } catch (error) {
    return error;
  }
}

export async function getLatestVersion(npmName) {
  try {
    const npmInfo = await getNpmInfo(npmName);
    if(!npmInfo['dist-tags'] || !npmInfo['dist-tags'].latest) {
        const errorMsg = '没有 latest 版本号'
        log.error(errorMsg);
        return new Error(errorMsg)
    }
    return npmInfo['dist-tags'].latest
  } catch (error) {
    log.error(error)
  }
}
