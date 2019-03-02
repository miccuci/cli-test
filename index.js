#! node

const clone = require('git-clone-promise')
const program = require('commander')
const shell = require('shelljs');
const path = require('path')
const chalk = require('chalk');

console.log(chalk.blue('Hello,git-clone-cli tool.'));

program
  .command('create [projectName] [projectPath]') // 命名命令，可选参数projecName,传入action函数第一个参数
  .alias('c') // 命令简写
  .description('构建efox模板项目')
  .option('-p, --platform [platform]', '选择开发平台 web/mobile/ie8', /^(web|mobile|ie8)$/i, 'mobile') // 可选参数，key值为platform，只能传入指定值，默认'mobile'
  .option('-f, --framework [framework]', '选择开发框架 vue/react/jQuery/angular', /^(vue|react|jQuery|angular)$/i, 'vue') // 可选参数，key值为framework，只能传入指定值，默认'vue'
  .action(function (projectName = 'bspDevProject', projectPath = 'https://github.com/miccuci/vueBasic.git', options) { // 执行命令的的函数
    let pwd = shell.pwd()
    let localpath = path.join(pwd.toString(), projectName)
    const {platform} = options
    console.log(chalk.blue('projectpath'),chalk.red(projectPath),chalk.blue('\nprojectname'),chalk.red(projectName));

    console.log(chalk.green('开始下载代码...'));
    clone(projectPath, localpath).then(res => {
      shell.rm('-rf', path.join(localpath, '.git'))
      shell.cd(projectName);
      shell.exec('yarn install')
      console.log(chalk.green('模板项目创建完成。'))
    }).catch(error => {
      console.log(chalk.red('模板项目创建失败。失败原因：'))
      console.log(chalk.red(error))
    })
  })
  .on('--help', () => {
    logger.log('Example:')
    logger.log('  创建一个默认的项目')
    logger.log('     $ myproject-cli create  或者 $ myproject-cli c')
  })

program.parse(process.argv)