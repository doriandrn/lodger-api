import path from 'path';
import fs from 'fs';

export default (() => {
  const o = {}
  const targetDir = path.join(__dirname, '../../../../src/lib/locales');
  let files = fs.readdirSync(targetDir);
  if (files.indexOf('.DS_Store') === 0) files.splice(0, 1)

  for (let fileName of files) {
    o[fileName.split('.')[0]] = () => require(targetDir + '/' + fileName)
  }

  return o
})()
