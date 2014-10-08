#pragma strict

function Start () {

}
var target:GameObject;
function Update () {
	if(target != null)
	{
		var needed_rotation = Quaternion.LookRotation(target.transform.position - this.transform.position);
	}
	else
	{
	
	}
	transform.position += transform.forward*30*Time.deltaTime;
	this.transform.rotation = Quaternion.Slerp(this.transform.rotation, needed_rotation,Time.deltaTime*15);
}
function follow(enemy:GameObject)
{
	target = enemy;
}
function OnCollisionEnter(collision:Collision)
{
	if(collision.gameObject.tag == "enemy")
	{
		collision.gameObject.SendMessage("hit", 50);
		Destroy(gameObject);
	}
}