#pragma strict

var path = new List.<Vector3>();
var speed:float  = 2.0;
var accelleration = 0.2;
var turning:float = 5;
var state = 1;
var path_pos = 0;

function Start () {
	generate_patrol();
}

function generate_patrol()
{
	var nextpoint = this.transform.position;
	nextpoint.x +=500;
	path.Add(nextpoint);
	nextpoint.z +=500;
	path.Add(nextpoint);
	path.Add(this.transform.position);
}

function Update () {
	switch(state)
	{
		case 1:
		patrol();
		break;
	}
}

function patrol()
{
	var needed_rotation = Quaternion.LookRotation(path[path_pos] - this.transform.position);
	this.transform.rotation = Quaternion.Slerp(this.transform.rotation, needed_rotation,Time.deltaTime);
	transform.position += transform.right*0.5;//*Time.deltaTime;
	if(Vector3.Distance(transform.position,path[path_pos]) < 10)
	{
		path_pos++;
		if(path_pos == path.Count)
		{
			path_pos = 0;
		}
	}
	Debug.Log(Vector3.Distance(transform.position,path[path_pos]) + " " + path_pos);
}