import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { Text } from "UnityEngine.UI";
import { GameObject } from 'UnityEngine';

export default class UIController extends ZepetoScriptBehaviour 
{
    public resultUI: Text;
    public maxCount: number = 7;
    
    private stringProperty: string;   
    private message: string;
    private count: number;
    
    Start() 
    {
        //Init value
        this.message = "Items";
        this.count = 0;
    }
    
    public IncreaseCount() 
    {
        this.count++;
        
        if(this.count >= this.maxCount) 
        {
            this.resultUI.text = "Clear!";
        } 
        else 
        {
            this.stringProperty = `${this.message} : ${this.count}`;
            this.resultUI.text = this.stringProperty;
        }
    }
     
}