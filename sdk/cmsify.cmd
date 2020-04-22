@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe" "--experimental-modules"  "%~dp0\..\sdk\classes\crownpeak\cmsify.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node "--experimental-modules"  "%~dp0\..\sdk\classes\crownpeak\cmsify.js" %*
)