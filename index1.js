#! node


const clone = require('git-clone-promise')
 
clone('https://github.com/miccuci/vueBasic.git', './test').then(res => {
  shell.rm('-rf', path.join(localpath, '.git'))
  console.log('ok')
})