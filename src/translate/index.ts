import type { TextEditor } from 'vscode';
import { BaiduFanyiAPI } from 'baidu-fanyi-api';
export async function translate(editor:TextEditor){
    const text = editor.document.getText(editor.selection);
    const api = new BaiduFanyiAPI();
    await api.init();
    const {lan} = await api.langdetect(text);
    const { trans_result } = await api.translate(text,lan,'en');
    console.log(trans_result);
    editor.edit((editBuilder)=>{
        editBuilder.replace(editor.selection,trans_result.data[0].dst);
    });
}