# GroomingHer Android demonstration

Download: https://groomingher.netlify.app/downloads/GroomingHer.apk

This signed **testing APK** opens the live HTTPS GroomingHer website in Android WebView. It supports Android 8.0 (API 26) and newer, requires internet for the app's lessons/spaces and shows a reconnect screen if the site cannot load. Website deployments are available without reinstalling; changes to the native package require a new APK. Keep Android System WebView updated.

The application ID is `com.groomingher.app`, version `0.3.0` (code 1), compile/target SDK 35. It requests only `INTERNET`. File/content access and mixed HTTP content are disabled; no JavaScript native bridge or SSL-error bypass exists. External HTTPS, mail and phone links open appropriate external apps. Android back navigation stays within the website before exiting. Cloud backup and device transfer are excluded. The app preserves the site's fictional-demo boundaries; it does not add real accounts or health collection.

## Build

Install JDK 17 or 21 and Android SDK platform 35/build-tools 35.0.0. Set `JAVA_HOME` and `ANDROID_HOME`, or set `sdk.dir` in ignored `local.properties`. From this directory:

```sh
./gradlew :app:assembleDebug :app:lintDebug
```

Gradle 8.11.1 is pinned with its official distribution SHA-256; Android Gradle Plugin is 8.9.2. Output: `app/build/outputs/apk/debug/app-debug.apk`. Verify with Android SDK `apksigner verify --verbose`, `zipalign -c -P 16 4` and `aapt dump badging`. Copy the verified artifact to `../app/public/downloads/GroomingHer.apk` for Netlify publication.

This build uses the standard development signing certificate and is debuggable. The signing key is kept outside Git, in the local Android user directory. Preserve that key to install later APKs as updates; a different key requires uninstalling the old app, resetting its local data. A Play Store release requires an owner-controlled release key, a release build/App Bundle and separate store review. No Play Store publication is included.

## Validation — 9 October 2026

- `assembleDebug` and `lintDebug` succeeded. Lint: zero errors, one reviewed JavaScript warning (JavaScript is required for Next.js; navigation is restricted, mixed content/file access disabled and no native bridge is exposed).
- APK v2 signature verified; ZIP alignment passed. Manifest inspection confirms package/version, launcher activity, Android 8.0 minimum and only internet permission.
- APK SHA-256: `cb953b22d662a1d59b37f2c31d0a4e892fd83394635350d17106460f82c65aff`.
- Website production build and all three PWA tests passed after the Android user-agent handling change. A browser using the Android wrapper user-agent correctly hid the redundant PWA install prompt and entered the Girl demonstration.
- No Android emulator or physical device was available, so native installation, back navigation, keyboard/system bars and offline handling still require device testing. Browser checks do not establish native-device behaviour.

The download was published on 9 October 2026 at 17:45 WAT. Live HTTPS download returned 200, the correct APK content type/attachment filename and the same SHA-256 as the signed local artifact.
