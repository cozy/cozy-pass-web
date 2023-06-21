const exec = require('child_process').exec;

/**
 * A webpack plugin to run personnalized commands after build succeeded.
   How to :
    - personalize the doneCmd to play a sound for instance
 */
//

const doneCmd = `mpg123 ~/.dev-sounds/plop.mp3`;

class AnnouncerPlugin {

    constructor(options) {
    }

    apply(compiler) {
      compiler.hooks.done.tap("done", () => {
        exec(doneCmd);
      });
    }
}

module.exports = AnnouncerPlugin;
