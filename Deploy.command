#!/bin/bash
# 进入脚本所在的目录（即项目根目录）
cd -- "$(dirname "$0")"

echo "======================================"
echo "   Jasin's Research Notebook 部署工具"
echo "======================================"

# 执行原始部署脚本
./scripts/deploy.sh

# 部署完成后让窗口停留，方便查看日志
echo ""
echo "部署流程结束。按任意键退出..."
read -n 1
exit
