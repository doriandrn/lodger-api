import path from 'path';
import fs from 'fs';

export default (() => {
  const o = {}
  const targetDir = path.join(__dirname, '../../../../src/.schemas');
  let files = fs.readdirSync(targetDir);
  const dsStoreFileIndex = files.indexOf('.DS_Store') 
  const isMac = dsStoreFileIndex > -1

  if (isMac)
    files.splice(dsStoreFileIndex, 1)

  for (let fileName of files) {
    o[fileName] = () => require(targetDir + '/' + fileName)
  }

  return o
})()
