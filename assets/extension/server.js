const http = require('http');
const fs = require('fs').promises;
const path = require('path');

// 静态资源根目录
const rootDir = path.join(__dirname, 'public');

// 内容类型映射
const contentTypeMap = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2',
};

// 创建HTTP服务器
const server = http.createServer(async (req, res) => {
    try {
        // 构建请求文件路径
        let filePath = path.join(rootDir, req.url === '/' ? 'index.html' : req.url);

        // 安全检查：防止路径遍历攻击
        if (!filePath.startsWith(rootDir)) {
            res.statusCode = 403;
            return res.end('Forbidden');
        }

        // 获取文件状态
        const stat = await fs.stat(filePath);

        // 处理目录请求
        if (stat.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
            await fs.access(filePath); // 检查目录下是否有index.html
        }

        // 读取文件内容
        const content = await fs.readFile(filePath);

        // 设置Content-Type
        const extname = path.extname(filePath).toLowerCase();
        const contentType = contentTypeMap[extname] || 'application/octet-stream';
        res.setHeader('Content-Type', contentType);

        // 设置缓存控制（可选）
        if (extname === '.html') {
            res.setHeader('Cache-Control', 'no-cache');
        } else {
            res.setHeader('Cache-Control', 'public, max-age=3600');
        }

        res.statusCode = 200;
        res.end(content);
    } catch (err) {
        // 处理错误
        if (err.code === 'ENOENT') {
            res.statusCode = 404;
            res.end('File Not Found');
        } else if (err.code === 'EISDIR' && !req.url.endsWith('/')) {
            // 重定向目录请求（添加尾部斜杠）
            res.statusCode = 301;
            res.setHeader('Location', req.url + '/');
            res.end();
        } else {
            console.error('Server error:', err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Serving static files from ${rootDir}`);
});  