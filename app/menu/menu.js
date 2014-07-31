/**
 * Created by azu on 2014/04/29.
 * LICENSE : MIT
 */
"use strict";
(function () {
    var gui = require('nw.gui');
    var win = gui.Window.get();
    var githubReaderMenu = new gui.Menu();
    // Create the open and close menu options
    var openMenuItem = new gui.MenuItem({ label: 'Config' }).on("click", function () {
        gui.Window.open('./view/user-config.html', '_blank', 'width=400,height=400');
    });

    githubReaderMenu.append(openMenuItem);
    var nativeMenuBar = new gui.Menu({ type: 'menubar' });
    nativeMenuBar.createMacBuiltin("My App");
    win.menu = nativeMenuBar;
    win.menu.insert(new gui.MenuItem({ label: 'GithubReader', submenu: githubReaderMenu}), 1);
})();