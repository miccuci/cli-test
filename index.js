#! node   //这里很重要，标记为node运行环境！

console.log('test')

const clone = require('git-clone-promise')
const program = require('commander')
const shell = require('shelljs');
const path = require('path')
program
  .command('create [projectName]') // 命名命令，可选参数projecName,传入action函数第一个参数
  .alias('c') // 命令简写
  .description('构建efox模板项目')
  .option('-p, --platform [platform]', '选择开发平台 web/mobile/ie8', /^(web|mobile|ie8)$/i, 'mobile') // 可选参数，key值为platform，只能传入指定值，默认'mobile'
  .option('-f, --framework [framework]', '选择开发框架 vue/react/jQuery/angular', /^(vue|react|jQuery|angular)$/i, 'vue') // 可选参数，key值为framework，只能传入指定值，默认'vue'
  .action(function (projectName = 'bspDevProject', options) { // 执行命令的的函数
    let pwd = shell.pwd()
    let localpath = path.join(pwd.toString(), projectName)
    const {platform} = options
    clone(`https://github.com/miccuci/vueBasic.git`, localpath).then(res => {
      shell.rm('-rf', path.join(localpath, '.git'))
      console.log('模板工程建立完成')
    })
  })
  .on('--help', () => {
    logger.log('Example:')
    logger.log('  创建一个默认的项目')
    logger.log('     $ efox create  或者 $ efox c')
    logger.log('  创建指定平台(web/mobile/ie8)、指定开发框架(vue/react/jQuery/angular)、指定项目名的项目')
    logger.log('     $ efox create testname -p web -f react \n')
  })

program.parse(process.argv)