const http = require('http');
const https = require('https');
const url = require('url');
const net = require('net');
const fs = require('fs');

// 配置项
const config = {
    port: 8080,
    // Omega插件配置（示例）
    omegaRules: [
        {
            match: 'example.com',
            target: 'https://example-proxy.com'
        },
        {
            match: '/api/',
            target: 'http://localhost:3000'
        }
    ],
    // 是否记录详细日志
    verbose: true
};

// 创建HTTP服务器
const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url);
    const rule = findMatchingRule(reqUrl.hostname || '', reqUrl.pathname || '');

    if (rule) {
        log(`转发HTTP请求: ${reqUrl.href} -> ${rule.target}${reqUrl.path}`);

        const options = {
            hostname: url.parse(rule.target).hostname,
            port: url.parse(rule.target).port || (rule.target.startsWith('https') ? 443 : 80),
            path: reqUrl.path,
            method: req.method,
            headers: req.headers
        };

        const proxyReq = (rule.target.startsWith('https') ? https : http).request(options, proxyRes => {
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(res);
        });

        req.pipe(proxyReq);

        proxyReq.on('error', err => {
            logError(`HTTP代理请求错误: ${err.message}`);
            res.statusCode = 500;
            res.end('Proxy Error');
        });
    } else {
        log(`未匹配到规则，直接转发: ${reqUrl.href}`);
        res.statusCode = 404;
        res.end('No matching proxy rule found');
    }
});

// 处理HTTPS连接（隧道）
server.on('connect', (req, cltSocket, head) => {
    const [hostname, port] = req.url.split(':');
    const rule = findMatchingRule(hostname, '');

    if (rule) {
        log(`转发HTTPS连接: ${req.url} -> ${rule.target}`);
        const proxyUrl = url.parse(rule.target);
        const proxyPort = proxyUrl.port || (proxyUrl.protocol === 'https:' ? 443 : 80);

        const srvSocket = net.connect(proxyPort, proxyUrl.hostname, () => {
            cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                'Proxy-agent: Node.js-Proxy\r\n' +
                '\r\n');
            srvSocket.write(head);
            srvSocket.pipe(cltSocket);
            cltSocket.pipe(srvSocket);
        });

        srvSocket.on('error', err => {
            logError(`HTTPS代理连接错误: ${err.message}`);
            cltSocket.end();
        });
    } else {
        log(`未匹配到HTTPS规则，拒绝连接: ${req.url}`);
        cltSocket.end('HTTP/1.1 403 Forbidden\r\n\r\n');
    }
});

// 查找匹配的规则
function findMatchingRule(hostname, path) {
    return config.omegaRules.find(rule => {
        if (rule.match.startsWith('/') && rule.match.endsWith('/')) {
            // 正则表达式匹配
            const regex = new RegExp(rule.match.slice(1, -1));
            return regex.test(hostname) || regex.test(path);
        } else {
            // 字符串匹配
            return hostname.includes(rule.match) || path.includes(rule.match);
        }
    });
}

// 日志函数
function log(message) {
    if (config.verbose) {
        console.log(`[${new Date().toISOString()}] ${message}`);
    }
}

// 错误日志函数
function logError(message) {
    console.error(`[${new Date().toISOString()}] ERROR: ${message}`);
}

// 启动服务器
server.listen(config.port, () => {
    console.log(`代理服务器运行在端口 ${config.port}`);
    console.log(`Omega规则已加载: ${config.omegaRules.length} 条`);
});    