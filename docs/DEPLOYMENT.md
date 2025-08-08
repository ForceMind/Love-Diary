# 部署指南 | Deployment Guide

## 🚀 部署方式

### 1. 静态网站托管 (推荐)

#### GitHub Pages
```bash
# 1. 推送代码到GitHub仓库
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. 在GitHub仓库中启用Pages
# Settings > Pages > Source: Deploy from a branch
# Branch: main / (root)

# 3. 访问地址
# https://yourusername.github.io/Love-Diary
```

#### Netlify
```bash
# 1. 安装Netlify CLI
npm install -g netlify-cli

# 2. 登录Netlify
netlify login

# 3. 部署项目
netlify deploy --prod --dir=.

# 4. 或者通过Git集成
# 连接GitHub仓库，自动部署
```

#### Vercel
```bash
# 1. 安装Vercel CLI
npm install -g vercel

# 2. 部署
vercel --prod

# 3. 或者通过Git集成
# 导入GitHub仓库，自动部署
```

### 2. 传统Web服务器

#### Apache配置
```apache
# .htaccess 文件
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # 启用Gzip压缩
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
    </IfModule>
    
    # 设置缓存头
    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType text/css "access plus 1 month"
        ExpiresByType application/javascript "access plus 1 month"
        ExpiresByType image/png "access plus 1 year"
    </IfModule>
    
    # 安全头设置
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
</IfModule>
```

#### Nginx配置
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/love-diary;
    index index.html;
    
    # Gzip压缩
    gzip on;
    gzip_types text/css application/javascript image/png;
    
    # 静态资源缓存
    location ~* \.(css|js|png|jpg|jpeg|gif)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # 安全头
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    
    # 主页面
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🔧 部署前准备

### 1. 代码优化
```bash
# 压缩JavaScript (可选)
npm install -g terser
terser assets/js/game-engine.js -o assets/js/game-engine.min.js

# 压缩CSS (可选)
npm install -g clean-css-cli
cleancss -o assets/css/styles.min.css assets/css/styles.css
```

### 2. 资源优化
```bash
# 图片压缩
npm install -g imagemin-cli
imagemin assets/images/*.png --out-dir=assets/images/optimized

# 或使用在线工具：
# - TinyPNG: https://tinypng.com/
# - Squoosh: https://squoosh.app/
```

### 3. 部署检查清单
```markdown
## 部署前检查
- [ ] 所有功能正常工作
- [ ] 图片路径正确
- [ ] 跨浏览器测试通过
- [ ] 移动端适配良好
- [ ] 加载速度可接受
- [ ] 存档功能正常

## 配置检查
- [ ] HTTPS配置 (生产环境)
- [ ] 域名指向正确
- [ ] CDN配置 (如使用)
- [ ] 缓存策略设置
- [ ] 安全头配置

## 测试检查
- [ ] 首页加载正常
- [ ] 游戏启动成功
- [ ] 存档/读档功能
- [ ] 所有弹窗正常显示
- [ ] 角色头像加载正常
```

## 📊 性能优化

### 1. 资源加载优化
```html
<!-- 预加载关键资源 -->
<link rel="preload" href="assets/css/styles.css" as="style">
<link rel="preload" href="assets/js/game-engine.js" as="script">

<!-- 异步加载非关键脚本 -->
<script src="assets/js/enhanced-game-data.js" async></script>

<!-- 图片懒加载 -->
<img data-src="assets/images/character.png" loading="lazy" alt="角色头像">
```

### 2. CDN配置
```html
<!-- 使用CDN加速字体加载 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- 或使用jsDelivr加速GitHub资源 -->
<script src="https://cdn.jsdelivr.net/gh/username/Love-Diary@main/assets/js/game-engine.js"></script>
```

### 3. Service Worker (PWA支持)
```javascript
// sw.js - Service Worker
const CACHE_NAME = 'love-diary-v2.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/assets/css/styles.css',
    '/assets/js/game-engine.js',
    '/assets/js/expanded-game-data.js',
    '/assets/images/favicon.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
```

```html
<!-- 在index.html中注册Service Worker -->
<script>
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
</script>
```

## 🔒 安全配置

### 1. HTTPS配置
```bash
# 使用Let's Encrypt免费SSL证书
sudo certbot --nginx -d yourdomain.com

# 或在云服务商处配置SSL证书
# - 阿里云、腾讯云、CloudFlare等都提供免费SSL
```

### 2. 安全头配置
```nginx
# nginx安全头配置
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy strict-origin-when-cross-origin;
add_header Content-Security-Policy "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline';";
```

### 3. 访问控制
```nginx
# 限制访问敏感文件
location ~ /\.git {
    deny all;
}

location ~ \.(md|json)$ {
    deny all;
}

# 限制请求频率
limit_req_zone $binary_remote_addr zone=game:10m rate=10r/s;
limit_req zone=game burst=20 nodelay;
```

## 🌐 多环境部署

### 1. 环境配置
```javascript
// config.js - 环境配置
const config = {
    development: {
        debug: true,
        apiUrl: 'http://localhost:3000',
        version: '2.0.0-dev'
    },
    production: {
        debug: false,
        apiUrl: 'https://api.yourdomain.com',
        version: '2.0.0'
    }
};

const currentConfig = config[process.env.NODE_ENV || 'development'];
```

### 2. 构建脚本
```json
{
    "scripts": {
        "dev": "http-server . -p 8000 -o",
        "build": "npm run minify && npm run optimize",
        "minify": "terser assets/js/*.js -o dist/js/bundle.min.js",
        "optimize": "imagemin assets/images/* --out-dir=dist/images",
        "deploy:staging": "netlify deploy --dir=dist",
        "deploy:prod": "netlify deploy --prod --dir=dist"
    }
}
```

## 📈 监控和分析

### 1. 网站分析
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>

<!-- 百度统计 -->
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?your_site_id";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
```

### 2. 错误监控
```javascript
// 简单的错误收集
window.addEventListener('error', function(e) {
    const errorInfo = {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        stack: e.error ? e.error.stack : null,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
    };
    
    // 发送错误信息到监控服务
    // 可以使用Sentry、LogRocket等服务
    console.error('Game Error:', errorInfo);
});
```

### 3. 性能监控
```javascript
// 页面加载性能监控
window.addEventListener('load', function() {
    setTimeout(function() {
        const perfData = performance.getEntriesByType('navigation')[0];
        const loadTime = perfData.loadEventEnd - perfData.fetchStart;
        
        // 记录加载时间
        console.log('Page Load Time:', loadTime + 'ms');
        
        // 如果有分析服务，可以发送数据
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                event_category: 'Performance',
                value: Math.round(loadTime)
            });
        }
    }, 0);
});
```

## 🔄 CI/CD自动化部署

### 1. GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 2. Netlify配置
```toml
# netlify.toml
[build]
  publish = "."
  command = "npm run build"

[build.environment]
  NODE_VERSION = "16"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

## 🐛 故障排除

### 常见问题及解决方案

#### 1. 图片加载失败
```javascript
// 检查图片路径
console.log('图片路径:', document.querySelector('img').src);

// 添加错误处理
document.querySelectorAll('img').forEach(img => {
    img.onerror = function() {
        this.src = 'assets/images/default-avatar.png'; // 备用图片
    };
});
```

#### 2. 存档功能异常
```javascript
// 检查localStorage支持
if (typeof(Storage) !== "undefined") {
    console.log("localStorage is supported");
} else {
    console.error("No web storage support");
    // 提供替代方案
}

// 清理损坏的存档
try {
    const data = JSON.parse(localStorage.getItem('loveDiarySave'));
} catch (e) {
    console.warn('存档数据损坏，清理中...');
    localStorage.removeItem('loveDiarySave');
}
```

#### 3. 跨域问题
```javascript
// 本地开发时的跨域处理
if (window.location.protocol === 'file:') {
    console.warn('建议使用HTTP服务器运行游戏');
    // 提供启动服务器的建议
}
```

## 📞 技术支持

### 部署支持渠道
- **GitHub Issues**: 技术问题讨论
- **部署文档**: 详细步骤说明
- **社区论坛**: 经验分享

### 推荐服务商
- **GitHub Pages**: 免费，适合开源项目
- **Netlify**: 免费额度充足，功能强大
- **Vercel**: 部署速度快，全球CDN
- **阿里云OSS**: 国内访问速度优秀
- **腾讯云COS**: 价格实惠，稳定可靠

---

🚀 **祝您部署顺利！如有问题，欢迎在Issues中反馈。**
