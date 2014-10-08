#pragma strict

var ship:GameObject;
var mouse_speed:int = 30;
var passable:Vector2;
var rotspeed:int = 2;
var sensitivity:float = 1.5;
var position_cross:Vector3;
var crosshair:GameObject;
var cam:Camera;
function Start () {

}

function Update () {
	var h = Input.GetAxis("Mouse Y");
	var v = Input.GetAxis("Mouse X");
	
	this.transform.position += new Vector3(v/mouse_speed,h/mouse_speed,0);
	if(this.transform.position.x > 0.7)
	{
		this.transform.position.x = 0.7;
	}
	if(this.transform.position.y > 0.7)
	{
		this.transform.position.y = 0.7;
	}
	if(this.transform.position.x < 0.3)
	{
		this.transform.position.x = 0.3;
	}
	if(this.transform.position.y < 0.3)
	{
		this.transform.position.y = 0.3;
	}
		if(h > rotspeed)
	{
		h = rotspeed;
	}
	if(h < -rotspeed)
	{
		h = -rotspeed;
	}
	if(v > rotspeed)
	{
		v = rotspeed;
	}
	if(v < -rotspeed)
	{
		v = -rotspeed;
	}
	passable = new Vector2((this.transform.position.y -0.5)*sensitivity,(this.transform.position.x -0.5)*sensitivity);
	ship.SendMessage("rotate_control",passable);
	this.transform.position.z = 50;
	position_cross = cam.ViewportToWorldPoint(this.transform.position);
	crosshair.SendMessage("move_crosshair",position_cross);
}