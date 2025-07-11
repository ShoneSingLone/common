const { exec } = require('child_process');
const path = require('path');

/**
 * 从服务器A下载文件夹到本地临时目录
 * @param {string} hostA - 服务器A地址
 * @param {string} usernameA - 服务器A用户名
 * @param {string} privateKeyPathA - 服务器A私钥路径
 * @param {string} remoteDirA - 服务器A上的源目录
 * @param {string} localTempDir - 本地临时目录
 */
function downloadFromServerA(hostA, usernameA, privateKeyPathA, remoteDirA, localTempDir) {
    return new Promise((resolve, reject) => {
        // 确保本地临时目录存在
        require('fs').mkdirSync(localTempDir, { recursive: true });

        const scpCommand = [
            'scp',
            '-r',                          // 递归复制
            '-i', privateKeyPathA,         // 私钥路径
            `-o StrictHostKeyChecking=no`, // 禁用主机密钥检查（生产环境应谨慎）
            `${usernameA}@${hostA}:${remoteDirA}/*`, // 源路径（注意末尾的/*）
            localTempDir                   // 目标路径
        ].join(' ');

        exec(scpCommand, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(`下载失败: ${stderr}`));
                return;
            }
            console.log('从服务器A下载完成');
            resolve();
        });
    });
}

/**
 * 上传本地文件夹到服务器B
 * @param {string} hostB - 服务器B地址
 * @param {string} usernameB - 服务器B用户名
 * @param {string} privateKeyPathB - 服务器B私钥路径
 * @param {string} localTempDir - 本地临时目录
 * @param {string} remoteDirB - 服务器B上的目标目录
 */
function uploadToServerB(hostB, usernameB, privateKeyPathB, localTempDir, remoteDirB) {
    return new Promise((resolve, reject) => {
        const scpCommand = [
            'scp',
            '-r',                          // 递归复制
            '-i', privateKeyPathB,         // 私钥路径
            `-o StrictHostKeyChecking=no`, // 禁用主机密钥检查
            `${localTempDir}/*`,          // 源路径
            `${usernameB}@${hostB}:${remoteDirB}` // 目标路径
        ].join(' ');

        exec(scpCommand, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(`上传失败: ${stderr}`));
                return;
            }
            console.log('上传到服务器B完成');
            resolve();
        });
    });
}

/**
 * 清理本地临时目录
 * @param {string} localTempDir - 本地临时目录
 */
function cleanupLocalTemp(localTempDir) {
    const fs = require('fs');
    fs.rmSync(localTempDir, { recursive: true, force: true });
    console.log('已清理临时目录');
}

/**
 * 主执行函数
 */
async function main() {
    // 配置参数（需要替换为实际值）
    const config = {
        hostA: 'serverA.example.com',
        usernameA: 'userA',
        privateKeyPathA: '/path/to/private_key_A',
        remoteDirA: '/path/to/source/folder/on/A',

        hostB: 'serverB.example.com',
        usernameB: 'userB',
        privateKeyPathB: '/path/to/private_key_B',
        remoteDirB: '/path/to/destination/folder/on/B',

        localTempDir: './temp_transfer_folder'
    };

    try {
        // 1. 从服务器A下载
        await downloadFromServerA(
            config.hostA,
            config.usernameA,
            config.privateKeyPathA,
            config.remoteDirA,
            config.localTempDir
        );

        // 2. 上传到服务器B
        await uploadToServerB(
            config.hostB,
            config.usernameB,
            config.privateKeyPathB,
            config.localTempDir,
            config.remoteDirB
        );

        // 3. 清理临时文件
        cleanupLocalTemp(config.localTempDir);

        console.log('文件传输完成');
    } catch (error) {
        console.error('传输过程中出错:', error.message);
        process.exit(1);
    }
}

// 执行主程序
main();