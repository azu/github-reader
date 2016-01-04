# github-reader [![Build Status](https://travis-ci.org/azu/github-reader.svg?branch=master)](https://travis-ci.org/azu/github-reader)

Github Client - Viewer for [Notifications](https://github.com/notifications "Notifications") and [News Feed](https://github.com/ "GitHub")

![ScreenShot](http://cl.ly/image/2v053R0Y0s0a/2014-04-29%2022_38_04.gif)

Built with [node-webkit](https://github.com/nwjs/nw.js "node-webkit").

## Features

* Viewer for mixed [Notifications](https://github.com/notifications "Notifications") and [News Feed](https://github.com/ "GitHub")
* Growl Notification(for Mac only, relate issue - [Implement desktop notifications](https://github.com/nwjs/nw.js/issues/27 "Implement desktop notifications [$50] · Issue #27 · rogerwang/node-webkit"))
* `J`,`K` scroll shortcut
* `O` : open in browser
* `Ctrl + R` reload
* `Ctrl + f` : toggle search bar - [gif](http://gyazo.com/0c5ed12adcc0b22e50457d1e7e6f82e3)

## Installation

**[Download latest binary](https://github.com/azu/github-reader/releases/latest)**

Multi-platform support

- Windows
- Mac OS X
- Linux 32,64bit

### Config

![token](http://monosnap.com/image/xNMXVDIlfH6Lom2Q2DMDKxPbc3kLaJ.png)

* Create [New personal access token](https://github.com/settings/tokens/new "New personal access token")
    * require **scopes** are `notifications` and `user`

![config](http://monosnap.com/image/Dgh7zSUetiJTNuQQ55w76CYVur7G0h.png)

* Open `Config` in Github-Reader.app
    * Input Github **username**
    * Input personal access token
* Save & Reload

#### UserFilterScript

Filter notifications by using filter script

![2015-03-21_13-20-50](https://cloud.githubusercontent.com/assets/19714/6763724/1cd57b6e-cfcd-11e4-90be-8ad299c82386.jpg)

1. Create `UserFilterScript.js`
2. Set `UserFilterScript` file path in config view.

[examples/user-filter-example.js](examples/user-filter-example.js): ignore "coveralls" account.

```js
module.exports = function (item) {
    if(item.user_name === "coveralls"){
        return false;
    }
    return true;
};
```

## Develop

``` sh
npm install
```

[Run apps](https://github.com/nwjs/nw.js/wiki/How-to-run-apps "run apps") with node-webkit.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
