#pragma strict

function Update () {
	transform.position += transform.forward*50*Time.deltaTime;
	//if(Vector3.Distance(this.transform.position,other.position)>10)
	//{
		//Destroy(this.gameObject);
	//}
}

function OnCollisionEnter(collision:Collision)
{
	if(collision.gameObject.tag == "ally")
	{
		collision.gameObject.SendMessage("recieve_damage", 10);
	}
}