@echo off
setlocal enabledelayedexpansion
set count=1

for %%f in (*.png) do (
    ren "%%f" "!count!.png"
    set /a count+=1
)

echo 重命名完成！
pause