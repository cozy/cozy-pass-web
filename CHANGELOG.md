# 2.0.16

## ✨ Features


## 🐛 Bug Fixes


## 🔧 Tech


# 2.0.15

## ✨ Features

* New Twake UI 🎉

## 🐛 Bug Fixes


## 🔧 Tech


# 2.0.14

## ✨ Features

* Add io.cozy.files POST permission ([PR #128](https://github.com/cozy/cozy-pass-web/pull/128))

## 🐛 Bug Fixes


## 🔧 Tech


# 2.0.13

## ✨ Features

* Add io.cozy.contacts PUT and DELETE permissions ([PR #125](https://github.com/cozy/cozy-pass-web/pull/125))

## 🐛 Bug Fixes


## 🔧 Tech


# 2.0.12

## ✨ Features

* Add io.cozy.files PATCH permission ([PR #122](https://github.com/cozy/cozy-pass-web/pull/122))

## 🐛 Bug Fixes


## 🔧 Tech


# 2.0.11

## ✨ Features

* Add permissions for web extension ([PR #120](https://github.com/cozy/cozy-pass-web/pull/120))

## 🐛 Bug Fixes


## 🔧 Tech


# 2.0.10

## ✨ Features

* The web app can now auto-login when the browser's addon is connected ([PR #111](https://github.com/cozy/cozy-pass-web/pull/111))

## 🐛 Bug Fixes

* Fix a bug that prevented toast errors to be displayed ([PR #115](https://github.com/cozy/cozy-pass-web/pull/115))
* Fix a bug that prevented the web onboarding to complete ([PR #116](https://github.com/cozy/cozy-pass-web/pull/116))

## 🔧 Tech


# 2.0.9

## ✨ Features


## 🐛 Bug Fixes

Fix a bug that would sometimes show Confirm Trusted Users modal even if there is no contact to confirm 

## 🔧 Tech

Set correct id, name and type to OAuth client

# 2.0.8

## ✨ Features

* Improve onboarding so MagicLink based Cozys can create a password for the Vault
* Enable moving passwords into folders for everyone

## 🐛 Bug Fixes

* Fixes a bug that may display the contact confirmation dialog even if not necessary

## 🔧 Tech

# 2.0.7

## ✨ Features

* Handle back button to go back on Android
* Improve responsive onboarding
* Add mobile installation step
* Enable folder creation for everyone
* Share buttons are visible to use them you need `passwords.can-share-organizations`

## 🐛 Bug Fixes

* Use initialState prop instead of useParams in installation-page 

## 🔧 Tech

* Renew Github Token for CI
* Remove Matomo
* Update cozy-ui from 58.0.0 to 82.10.0,  cozy-client from 24.6.1 to 37.0.0, cozy-flag from 2.7.2 to 2.11.0

# 2.0.6

## ✨ Features

* Improve visibility for folders' add and delete buttons ([PR #80](https://github.com/cozy/cozy-pass-web/pull/80))
* Add a badge to shared folders with users waiting for approval ([PR #81](https://github.com/cozy/cozy-pass-web/pull/81))

## 🔧 Tech

* Add mobile app info in manifest file ([PR #78](https://github.com/cozy/cozy-pass-web/pull/78))

# 2.0.5

## ✨ Features

* Ciphers are now flagged with a dedicated icons when they are part of a shared folder of when they are linked to a Cozy Connector ([PR #69](https://github.com/cozy/cozy-pass-web/pull/69))
* It is now possible to write notes in ciphers ([PR #75](https://github.com/cozy/cozy-pass-web/pull/75))
* Login errors are now displayed in the login form ([PR #70](https://github.com/cozy/cozy-pass-web/pull/70))

## 🐛 Bug Fixes

* Fix `download client` button when displayed from a mobile web browser ([PR #72](https://github.com/cozy/cozy-pass-web/pull/72))

## 🔧 Tech

# 2.0.4

## ✨ Features


## 🐛 Bug Fixes

* Fix `clipboard` functionnalities on Safari ([PR #64](https://github.com/cozy/cozy-pass-web/pull/64))
* Fix `delete` menu on Safari ([PR #65](https://github.com/cozy/cozy-pass-web/pull/65))
* Set correct text on `delete folder` buttons ([PR #63](https://github.com/cozy/cozy-pass-web/pull/63))

## 🔧 Tech

* Clean Safari specific code ([PR #64](https://github.com/cozy/cozy-pass-web/pull/64))

# 2.0.3

## ✨ Features

* Show users confirmation dialog after opening vault ([PR #51](https://github.com/cozy/cozy-pass-web/pull/51), [PR #57](https://github.com/cozy/cozy-pass-web/pull/57), [PR #61](https://github.com/cozy/cozy-pass-web/pull/61))
* Automatically confirm a trusted user after initializing a sharing ([PR #51](https://github.com/cozy/cozy-pass-web/pull/51))
* Add support for ReadOnly shared ciphers and folders ([PR #53](https://github.com/cozy/cozy-pass-web/pull/53))
* Display shared folders that need to be confirmed before being accessible in the navbar ([PR #54](https://github.com/cozy/cozy-pass-web/pull/54))
* Handle redirect URI on login page ([PR #62](https://github.com/cozy/cozy-pass-web/pull/62))

## 🐛 Bug Fixes

* Hide `Sare` button from `Cozy Connectors` folder ([PR #55](https://github.com/cozy/cozy-pass-web/pull/55))
* Fix loading issue on first sync ([PR #56](https://github.com/cozy/cozy-pass-web/pull/56))
* Fix folder synchronization timing ([PR #58](https://github.com/cozy/cozy-pass-web/pull/58))
* Fix deletion of folders ([PR #60](https://github.com/cozy/cozy-pass-web/pull/60))

## 🔧 Tech

* Move sharing methods to a dedicated service ([PR #51](https://github.com/cozy/cozy-pass-web/pull/51))
* Clean code related to moving ciphers between and out of shared folders ([PR #59](https://github.com/cozy/cozy-pass-web/pull/59))

# 2.0.2

## ✨ Features

* Allow to move ciphers between shared folders ([PR #38](https://github.com/cozy/cozy-pass-web/pull/38), [PR #44](https://github.com/cozy/cozy-pass-web/pull/44))
* Allow to remove ciphers from shared folders ([PR #44](https://github.com/cozy/cozy-pass-web/pull/44))
* Allow to delete shared folders ([PR #44](https://github.com/cozy/cozy-pass-web/pull/44))
* Add realtime syncing for shared folders ([PR #40](https://github.com/cozy/cozy-pass-web/pull/40), [PR #46](https://github.com/cozy/cozy-pass-web/pull/46))
* Replace `cozy-cloud` icon by `share` icon on shared ciphers ([PR #42](https://github.com/cozy/cozy-pass-web/pull/42))

## 🐛 Bug Fixes

* Fix `cozy-pass-web` installation process in OIDC environments ([PR #41](https://github.com/cozy/cozy-pass-web/pull/41))
* Fix sharing rules for shared folders ([PR #47](https://github.com/cozy/cozy-pass-web/pull/47))

## 🔧 Tech

# 2.0.1

## ✨ Features

* Implement shared folders ([PR #32](https://github.com/cozy/cozy-pass-web/pull/32))
* Implement two-steps confirmation for shared folders ([PR #35](https://github.com/cozy/cozy-pass-web/pull/35), [PR #37](https://github.com/cozy/cozy-pass-web/pull/37))

## 🐛 Bug Fixes

## 🔧 Tech
