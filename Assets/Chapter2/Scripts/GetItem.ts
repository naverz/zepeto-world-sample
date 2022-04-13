import { Collider, Vector3, GameObject, Transform } from 'UnityEngine';
import { ZepetoCharacter, ZepetoPlayer, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour, ZepetoScriptInstance } from 'ZEPETO.Script';
 
// import custom script from path
import UIController from './UIController';
 
export default class GetItem extends ZepetoScriptBehaviour 
{
   public extComponentGameObject: GameObject;
   private extComponent: UIController;
   private zepetoCharacter: ZepetoCharacter;

    Start() 
    {
        //Zepeto character object
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this.zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        });
        //script import
        this.extComponent = this.extComponentGameObject.GetComponent<UIController>();
    }


    OnTriggerEnter(collider: Collider) 
    {
        if (this.zepetoCharacter == null || collider.gameObject != this.zepetoCharacter.gameObject)
            return;
        
        //Sends a message of raising a count after eating an item
        this.extComponent.IncreaseCount();
        //Destroy item
        GameObject.Destroy(this.gameObject);
   }
}
