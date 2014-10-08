#pragma strict

var other:Transform;

function Start()
{
	
}

function Update () {
	transform.position += transform.forward*50*Time.deltaTime;
	//if(Vector3.Distance(this.transform.position,other.position)>10)
	//{
		//Destroy(this.gameObject);
	//}
}

function OnCollisionEnter(collision:Collision)
{
	if(collision.gameObject.tag == "enemy")
	{
		collision.gameObject.SendMessage("hit", 10);
	}
}
