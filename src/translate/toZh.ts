import type { TextEditor } from 'vscode';
import { BaiduFanyiAPI } from 'baidu-fanyi-api';
export async function translateToZh(editor:TextEditor){
    const text = editor.document.getText(editor.selection);
    const api = new BaiduFanyiAPI();
    await api.init();
    const {lan} = await api.langdetect(text);
    const { trans_result } = await api.translate(text,lan,'zh');
    let result = '';
    for(let str of trans_result.phonetic){
        result+=str.src_str;
    }
    return result;
    
}