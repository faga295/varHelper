// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { StatusBarAlignment } from 'vscode';
import { translate } from './translate';
import { translateToZh } from './translate/toZh';

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
	context.subscriptions.push(vscode.languages.registerCodeActionsProvider('javascript',new Emojier));
	
}

class Emojier implements vscode.CodeActionProvider{
	public provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.CodeAction[] | undefined{
		if(!this.startWithSmile(document,range)) return;
		const result = [];
		result.push(this.createAction(document,range,'😺'));
		result.push(this.createAction(document,range,'💩'));
		result.push(this.createAction(document,range,'😀'));
		return result;
	}
	private startWithSmile(document: vscode.TextDocument, range: vscode.Range | vscode.Selection):Boolean{
		return (document.getText(range)[0]===':'&&document.getText(range)[1]===')');
	}
	private createAction(document:vscode.TextDocument,range:vscode.Range,emoji:string){
		const fix = new vscode.CodeAction(`convert to ${emoji}`,vscode.CodeActionKind.QuickFix);
		fix.edit = new vscode.WorkspaceEdit;
		fix.edit.replace(document.uri,new vscode.Range(range.start,range.start.translate(0,2)),emoji); 
		return fix;
	}
}
// this method is called when your extension is deactivated
export function deactivate() {}