import { Collider,Vector3,Quaternion } from 'UnityEngine';
import { ZepetoCharacter, ZepetoPlayer, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';

export default class Teleport extends ZepetoScriptBehaviour 
{
    
    private zepetoCharacter: ZepetoCharacter;
    
    Start() 
    {    
        //Zepeto character object
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this.zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        });      
    }

    OnTriggerEnter(collider: Collider) 
    {
        
        if (this.zepetoCharacter == null || collider.gameObject != this.zepetoCharacter.gameObject) 
            return;
        
        //Teleport to Origin Position
        this.zepetoCharacter.Teleport(new Vector3(0, 0, 0), Quaternion.identity);
    }
}