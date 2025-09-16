#!/bin/bash

# 腾讯云COS部署脚本
# 使用前需要安装腾讯云CLI工具：pip install coscmd

echo "🚀 开始部署到腾讯云COS..."

# 配置信息（需要修改为你的实际信息）
BUCKET_NAME="plc-education-web"  # 你的存储桶名称
REGION="ap-guangzhou"  # 你的存储桶地域
SECRET_ID="your-secret-id"  # 你的SecretId
SECRET_KEY="your-secret-key"  # 你的SecretKey

# 检查是否已构建
if [ ! -d "build" ]; then
    echo "❌ 未找到build文件夹，正在构建..."
    npm run build
fi

# 配置coscmd
echo "⚙️ 配置腾讯云COS..."
coscmd config -a $SECRET_ID -s $SECRET_KEY -b $BUCKET_NAME -r $REGION

# 上传文件
echo "📤 上传文件到COS..."
coscmd upload -r build/ / --delete

# 设置index.html为默认首页
echo "🔧 配置静态网站..."
coscmd putbucketwebsite --index index.html --error index.html

echo "✅ 部署完成！"
echo "🌐 访问地址: https://$BUCKET_NAME.cos.$REGION.myqcloud.com"