import type { StatusBarItem } from "vscode";
import { window,workspace } from "vscode";
import { basename } from "path";
export function update(status:StatusBarItem){
    const editor = window.activeTextEditor;
    if(!editor||!workspace.workspaceFolders) {return;}
    const uri = editor.document.uri;
    if(uri.scheme==='file') {
        status.text = `$(device-camera-video) Big brother is watching you`;
        status.show();
    }
}