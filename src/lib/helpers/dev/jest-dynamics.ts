import path from 'path';
import fs from 'fs';
import axios from 'axios';
import rollupConfig from '@/rollup.config'
const { repos } = rollupConfig
const { load, resolve } = rollupConfig.plugins[0]

export default (() => {
  const o = {}
  const targetDir = axios.get();
  let files = fs.readdirSync(targetDir);
  if (files.indexOf('.DS_Store') === 0) files.splice(0, 1)

  for (let fileName of files) {
    o[fileName.split('.')[0]] = () => require(targetDir + '/' + fileName)
  }

  return o
})()
