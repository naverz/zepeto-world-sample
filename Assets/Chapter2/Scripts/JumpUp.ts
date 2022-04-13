import { Collider } from 'UnityEngine';
import { ZepetoPlayers, ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';

export default class JumpPower extends ZepetoScriptBehaviour 
{
    public jumpPower: number = 5;
    private zepetoCharacter :ZepetoCharacter;

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
        
        //Add Jumppower
        this.zepetoCharacter.additionalJumpPower = this.jumpPower;
    }

    OnTriggerExit(collider: Collider) {
        //Turn the jump power back to normal
        this.zepetoCharacter.additionalJumpPower = 0;
    }
}