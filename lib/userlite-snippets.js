'use babel';

import { CompositeDisposable } from 'atom';

export default {
    subscriptions: null,

    activate(state) {
        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(
            atom.commands.add('atom-workspace', {
                'userlite-snippets:insert-arrow': function() {
                    var ref = atom.workspace.getActiveTextEditor();
                    return ref != null ? ref.insertText('->') : void null;
                },

                'userlite-snippets:insert-fat-arrow': function() {
                    var ref = atom.workspace.getActiveTextEditor();
                    return ref != null ? ref.insertText('=>') : void null;
                }
            })
        );
    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
    }
};
