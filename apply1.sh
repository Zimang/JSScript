 
PRODUCTION_NAME="net.wyvernware.findthealien2"  # 定义项目名称变量
PROJECT_NAME="${PRODUCTION_NAME//./_}"  # 用下划线替换点，自动生成 PROJECT_NAME



# PROJECT_NAME="bloodsugar_diabetes_pressuretraker"  # 定义项目名称变量
mkdir -p "D:/workplace/AutoX-6.5.8/app/src/main/assets/sample/zimang/${PROJECT_NAME}/assests"
SCREENSHOOTS_SRC="D:\monitor\assests"
# 替换函数：将 "包名" → PRODUCTION_NAME，"包_名" → PROJECT_NAME，"包名.autojs" → PRODUCTION_NAME.autojs
replace_placeholders_in_file() {
    local file="$1"
    if [[ "$file" == *.js ]]; then
        sed -i "s/\"包名.autojs\"/\"${PRODUCTION_NAME}.autojs\"/g" "$file"
        sed -i "s/\"包名\"/\"${PRODUCTION_NAME//\./\\.}\"/g" "$file"
        sed -i "s/\"包_名\"/\"${PROJECT_NAME}\"/g" "$file"
        echo "已替换占位符: $file"
    fi
}



 # # # 创建项目 temp
# # 默认配置区域（可在此修改或添加路径）
# DEFAULT_SRC="D:/workplace/AutoX-6.5.8/app/src/main/assets/sample/zimang/temp_demo.js"
# DEFAULT_DESTS=(
#    "D:/workplace/AutoX-6.5.8/app/src/main/assets/sample/zimang/${PROJECT_NAME}/temp_demo.js"
#    "D:/workplace/AutoX-6.5.8/app/src/main/assets/sample/temp_demo.js"
#    # 添加新路径直接换行写在这里
# )

# # 创建项目 customUtils
# # 默认配置区域（可在此修改或添加路径）
# DEFAULT_SRC="D:/workplace/AutoX-6.5.8/app/src/main/assets/sample/zimang/customUtils.js"
# DEFAULT_DESTS=(
#    "D:/workplace/AutoX-6.5.8/app/src/main/assets/sample/zimang/${PROJECT_NAME}/customUtils.js"
#    # 添加新路径直接换行写在这里
# )
 

# 同步只需要同步customUtils  雷电&蓝叠
# DEFAULT_SRC="D:/workplace/AutoX-6.5.8/app/src/main/assets/sample/zimang/${PROJECT_NAME}/customUtils.js"
# DEFAULT_DESTS=(
#    "C:/Users/Admin/Documents/leidian9/Pictures/customUtils.js"
#    "D:/workplace/AutoX-6.5.8/app/src/main/assets/sample/zimang/customUtils.js"
#    "D:/workplace/AutoX-6.5.8/app/src/main/assets/sample/customUtils.js"
#    # 添加新路径直接换行写在这里
# )

# 同步图片项目文件夹  蓝叠
# customUtils,Utils  temp不用变
# 1. 把截图文件复制到项目资源文件夹 
DEFAULT_SRC="${SCREENSHOOTS_SRC}"
DEFAULT_DESTS=(
   "D:/workplace/AutoX-6.5.8/app/src/main/assets/sample/zimang/${PROJECT_NAME}/"
   # 添加新路径直接换行写在这里
) 


# # 复制所有文件到input
# DEFAULT_SRC="${SCREENSHOOTS_SRC}"
# DEFAULT_DESTS=(
#    "D:/workplace/autojs_result/input/"
#    # 添加新路径直接换行写在这里
# ) 

 

# 参数处理
if [ $# -eq 0 ]; then
    src="$DEFAULT_SRC"
    dests=("${DEFAULT_DESTS[@]}")
    dests=("${DEFAULT_DESTS[@]}")
else
    src="$1"
    shift
    dests=("$@")
fi

# 检查源是否存在
if [ ! -e "$src" ]; then
    echo "错误：源不存在 [$src]"
    exit 1
fi

# 确保源是文件或目录
if [ ! -f "$src" ] && [ ! -d "$src" ]; then
    echo "错误：源必须为文件或目录 [$src]"
    exit 1
fi

# 复制函数（支持文件/目录）
copy_with_dir() {
    local src="$1"
    local dest="$2"
    
    # 提取目标父目录
    local dest_dir=$(dirname "$dest")
    
    # 创建父目录（如不存在）
    if [ ! -d "$dest_dir" ]; then
        mkdir -p "$dest_dir" || {
            echo "目录创建失败: $dest_dir"
            return 1
        }
        echo "已创建目录: $dest_dir"
    fi
    
    # 根据类型执行复制
    if [ -d "$src" ]; then
        cp -rf "$src" "$dest" && echo "复制目录成功: $dest" || {
            echo "复制目录失败: $dest"
            return 1
        }
    else
        cp -f "$src" "$dest" && echo "复制文件成功: $dest" || {
            echo "复制文件失败: $dest"
            return 1
        }
    fi
}

# # 主循环
# for dest in "${dests[@]}"; do
#     copy_with_dir "$src" "$dest"
# done

# 主循环
for dest in "${dests[@]}"; do
    copy_with_dir "$src" "$dest"
    # 如果是文件，且扩展名是 .js，则执行占位符替换
    if [ -f "$src" ] && [[ "$dest" == *.js ]]; then
        replace_placeholders_in_file "$dest"
    fi
done




echo "操作完成"

adb shell am force-stop "${PRODUCTION_NAME}.autojs"
# 传递到模拟器项目文件夹 蓝叠
adb push "D:/workplace/AutoX-6.5.8/app/src/main/assets/sample/zimang/${PROJECT_NAME}" "//storage/emulated/0/脚本/${PROJECT_NAME}/"
adb pull "//storage/emulated/0/脚本/${PROJECT_NAME}/${PROJECT_NAME}/${PRODUCTION_NAME}.autojs_v1.0.0.apk" "D:/workplace/autojs_result/${PRODUCTION_NAME}.autojs_v1.0.0.apk"
# 如果不清除，会嵌套打包，原先的包会成为资源文件
adb shell rm "//storage/emulated/0/脚本/${PROJECT_NAME}/${PROJECT_NAME}/${PRODUCTION_NAME}.autojs_v1.0.0.apk" 
