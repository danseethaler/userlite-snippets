'use babel';

import UserliteSnippetsView from './userlite-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  userliteSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.userliteSnippetsView = new UserliteSnippetsView(state.userliteSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.userliteSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'userlite-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.userliteSnippetsView.destroy();
  },

  serialize() {
    return {
      userliteSnippetsViewState: this.userliteSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('UserliteSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
