import { ZepetoScriptBehaviour } from 'ZEPETO.Script';

export default class Rotator extends ZepetoScriptBehaviour 
{
    public rotationSpeedX: number = 0.5;
    public rotationSpeedY: number = 0;
    public rotationSpeedZ: number = 0;
    
    Update() 
    {
        this.transform.Rotate(this.rotationSpeedX, this.rotationSpeedY, this.rotationSpeedZ);
    }
}