#!/usr/bin/env python3
"""
腾讯云COS自动部署脚本
需要先安装：pip install cos-python-sdk-v5
"""

import os
import sys
from qcloud_cos import CosConfig
from qcloud_cos import CosS3Client

# ==================== 配置区域 ====================
# 请修改为你的实际配置
SECRET_ID = 'your-secret-id'  # 替换为你的SecretId
SECRET_KEY = 'your-secret-key'  # 替换为你的SecretKey
REGION = 'ap-guangzhou'  # 替换为你的地域
BUCKET = 'plc-education-web-1234567890'  # 替换为你的存储桶名称
# ================================================

def upload_dir_to_cos(local_path, cos_path='/'):
    """递归上传目录到COS"""
    
    # 初始化客户端
    config = CosConfig(Region=REGION, SecretId=SECRET_ID, SecretKey=SECRET_KEY)
    client = CosS3Client(config)
    
    upload_count = 0
    
    for root, dirs, files in os.walk(local_path):
        for file in files:
            local_file = os.path.join(root, file)
            # 计算COS路径
            relative_path = os.path.relpath(local_file, local_path)
            cos_key = os.path.join(cos_path, relative_path).replace('\\', '/')
            
            # 去除开头的斜杠
            if cos_key.startswith('/'):
                cos_key = cos_key[1:]
            
            print(f"上传: {local_file} -> {cos_key}")
            
            try:
                # 设置Content-Type
                content_type = 'text/html'
                if file.endswith('.js'):
                    content_type = 'application/javascript'
                elif file.endswith('.css'):
                    content_type = 'text/css'
                elif file.endswith('.json'):
                    content_type = 'application/json'
                elif file.endswith('.png'):
                    content_type = 'image/png'
                elif file.endswith('.jpg') or file.endswith('.jpeg'):
                    content_type = 'image/jpeg'
                elif file.endswith('.mp4'):
                    content_type = 'video/mp4'
                elif file.endswith('.svg'):
                    content_type = 'image/svg+xml'
                
                # 上传文件
                response = client.upload_file(
                    Bucket=BUCKET,
                    LocalFilePath=local_file,
                    Key=cos_key,
                    ContentType=content_type,
                    CacheControl='public, max-age=31536000' if not file.endswith('.html') else 'no-cache'
                )
                upload_count += 1
                
            except Exception as e:
                print(f"❌ 上传失败: {e}")
                return False
    
    print(f"✅ 成功上传 {upload_count} 个文件")
    return True

def configure_static_website():
    """配置静态网站"""
    config = CosConfig(Region=REGION, SecretId=SECRET_ID, SecretKey=SECRET_KEY)
    client = CosS3Client(config)
    
    try:
        response = client.put_bucket_website(
            Bucket=BUCKET,
            WebsiteConfiguration={
                'IndexDocument': {'Suffix': 'index.html'},
                'ErrorDocument': {'Key': 'index.html'},
                'RoutingRules': [
                    {
                        'Condition': {'HttpErrorCodeReturnedEquals': '404'},
                        'Redirect': {'ReplaceKeyWith': 'index.html'}
                    }
                ]
            }
        )
        print("✅ 静态网站配置成功")
        return True
    except Exception as e:
        print(f"❌ 配置静态网站失败: {e}")
        return False

def main():
    print("🚀 开始部署到腾讯云COS...")
    
    # 检查build目录
    if not os.path.exists('build'):
        print("❌ 未找到build目录，请先运行: npm run build")
        sys.exit(1)
    
    # 检查配置
    if SECRET_ID == 'your-secret-id' or SECRET_KEY == 'your-secret-key':
        print("❌ 请先配置SECRET_ID和SECRET_KEY")
        print("编辑此文件，在配置区域填入你的腾讯云密钥")
        sys.exit(1)
    
    # 上传文件
    print("📤 上传文件...")
    if not upload_dir_to_cos('build'):
        sys.exit(1)
    
    # 配置静态网站
    print("⚙️ 配置静态网站...")
    configure_static_website()
    
    # 输出访问地址
    print("\n" + "="*50)
    print("✅ 部署完成！")
    print(f"🌐 访问地址: https://{BUCKET}.cos.{REGION}.myqcloud.com")
    print("="*50)

if __name__ == '__main__':
    main()