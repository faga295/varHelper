// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { StatusBarAlignment } from 'vscode';
import { translate } from './translate';
import { translateToZh } from './translate/toZh';
import { update } from './statusBar/update';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const editor = vscode.window.activeTextEditor;
	if(!editor) return;
	context.subscriptions.push(vscode.commands.registerCommand(('varHelper.translate'),async ()=>{
		const trans_result = await translate(editor);
		editor.edit((editBuilder)=>{
			editBuilder.replace(editor.selection,trans_result.data[0].dst);
		});
	}));
	const status = vscode.window.createStatusBarItem(StatusBarAlignment.Left,100000);
	status.text = `$(eye)嗳薇+q1955938454`;
    status.show();
	context.subscriptions.push(status);
	context.subscriptions.push(vscode.languages.registerHoverProvider('*',{
		async provideHover(){
			const content = await translateToZh(editor);
			console.log(content);
			return new vscode.Hover(content);
		}
	}));
	// context.subscriptions.push(vscode.languages.registerCodeActionsProvider('javascript',));
	
}
// this method is called when your extension is deactivated
export function deactivate() {}