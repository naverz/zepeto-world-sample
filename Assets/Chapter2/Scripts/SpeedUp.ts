import { Collider, GameObject, WaitForSeconds } from 'UnityEngine';
import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';

export default class SpeedUp extends ZepetoScriptBehaviour 
{
    private zepetoCharacter :ZepetoCharacter;
    public runSpeed: number = 4;
    public waitTime: number = 3;

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
        this.zepetoCharacter.additionalRunSpeed = this.runSpeed;
        this.StartCoroutine(this.DoRoutine());
    }

    *DoRoutine() 
    {
        //Wait for waitTime value
        yield new WaitForSeconds(this.waitTime);
        //Turn the run speed back to normal
        this.zepetoCharacter.additionalRunSpeed = 0;
    }
}