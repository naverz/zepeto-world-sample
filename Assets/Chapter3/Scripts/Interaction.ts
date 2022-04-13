import { Canvas, AnimationClip, WaitForSeconds, GameObject, Object, Random } from 'UnityEngine';
import { Button } from 'UnityEngine.UI';
import { ZepetoPlayers, ZepetoCharacter } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';

// import custom script from path
import UIController from './UIController';

export default class Interaction extends ZepetoScriptBehaviour 
{
    public openUIGesture: Button;
    public interactionCanvas: Canvas;
    public animationClip: AnimationClip;
    public uiControllerObject: GameObject;
    public badEffectFactory: GameObject;
    public goodEffectFactory: GameObject;
    public gift: GameObject;
    public failureRatio: number = 50;
    
    private uiController: UIController;
    private zepetoCharacter :ZepetoCharacter;

    Start() 
    {    
        // Set EventCamera 
        this.interactionCanvas.worldCamera = ZepetoPlayers.instance.ZepetoCamera.camera;
        // Set character
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this.zepetoCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        });
        // Script import
        this.uiController = this.uiControllerObject.GetComponent<UIController>();
        
        //Button Hide
        this.openUIGesture.gameObject.SetActive(false);
        
        //When Button Click
        this.openUIGesture.onClick.AddListener(()=>{
            this.zepetoCharacter.SetGesture(this.animationClip);
            this.StartCoroutine(this.FirstRoutine());         
        });
    }
    
    OnTriggerEnter(collider)
    {
        this.openUIGesture.gameObject.SetActive(true);
    }
    OnTriggerExit(collider)
    {
        this.openUIGesture.gameObject.SetActive(false);
    }
    
    *FirstRoutine() 
    {
        this.uiController.Loading();
        yield new WaitForSeconds(3);
        this.zepetoCharacter.CancelGesture();
        this.RandomCalculation();
    }

    private RandomCalculation()
    {
        let randomNumber: number;
        randomNumber = Random.Range(0,100);
        if (randomNumber <= this.failureRatio)
        {
            this.Lose();
        }
        else
        {
            this.Win();
        }
        this.StartCoroutine(this.SecondRoutine());
    }

    private Lose()
    {
        this.uiController.Lose();
        //GameObject Create
        var obj = Object.Instantiate(this.badEffectFactory) as GameObject;
        obj.transform.position = this.transform.position;
    }

    private Win()
    {
        this.uiController.Win();
        //GameObject Create
        var obj = Object.Instantiate(this.goodEffectFactory) as GameObject;
        obj.transform.position = this.transform.position;
        var giftobj = Object.Instantiate(this.gift) as GameObject;
        giftobj.transform.position = this.transform.position;
    }

    *SecondRoutine()
    {
        yield new WaitForSeconds(1);
        this.uiController.Init();
        //Destroy box
        GameObject.Destroy(this.gameObject);
    }
}