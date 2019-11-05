@ECHO OFF
CALL del D:\Data\Mauro_D\PhoneGap_Projects\TuttoBOCCE\platforms\android\app\build\outputs\apk\release\Tuttobocce.apk
CALL phonegap build android --release --stacktrace 
CALL jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore keystore.jks D:\Data\Mauro_D\PhoneGap_Projects\TuttoBOCCE\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk tuttobocce 
CALL C:
CALL cd C:\Users\Mauro\AppData\Local\Android\Sdk\build-tools\29.0.1
CALL zipalign -v 4 D:\Data\Mauro_D\PhoneGap_Projects\TuttoBOCCE\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk D:\Data\Mauro_D\PhoneGap_Projects\TuttoBOCCE\platforms\android\app\build\outputs\apk\release\Tuttobocce.apk
