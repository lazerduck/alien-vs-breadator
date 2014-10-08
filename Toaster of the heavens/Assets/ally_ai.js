#pragma strict

var path = new List.<Vector3>();
var speed:int = 10;
var ship:Transform;
var idle_x:float;
var idle_y:float;
var idle_z:float;
var idle_start:Vector3;
var timer:int;
var state = "attack";
var targets:GameObject[];
var target:GameObject = null;
var range:int = 150;
var bullet:Transform;
var aim:Transform;
var fire:Transform;
var timer2  = 0;
var shields:int = 100;

function Start () {
	idle_start = transform.position;
}

function Update () {

	if(target == null)
	{
		state = "idle";
		is_target();
	}
	else
	{
		state = "attack";
	}
	switch(state)
	{
		case "idle":
			idle();
		break;
		case "attack":
			attack();
		break;
	}

}
function idle()
{
	
	if(path.Count ==0)
	{
		new_point();
	}
	var needed_rotation = Quaternion.LookRotation(path[0] - this.transform.position);
	if(Vector3.Distance(transform.position,path[0]) < 4)
	{
		path.RemoveAt(0);
		new_point();
	}
	timer++;
	if(timer> 1000)
	{
		path.RemoveAt(0);
		new_point();
		
		timer = 0;
	}
	transform.position += transform.forward*speed*Time.deltaTime;
	this.transform.rotation = Quaternion.Slerp(this.transform.rotation, needed_rotation,Time.deltaTime);
	Debug.DrawLine(idle_start,transform.position);
}
function new_point()
{
	var minus:Vector3 = new Vector3(-5,-5,-5);
	path.Add(idle_start + Random.insideUnitCircle*10+minus);
	
	
}
function attack()
{
	range = 100;
	if(target != null)
	{
	aim.position = target.transform.position;
	var needed_rotation = Quaternion.LookRotation(target.transform.position - this.transform.position);
	transform.position += transform.forward*speed*Time.deltaTime;
	this.transform.rotation = Quaternion.Slerp(this.transform.rotation, needed_rotation,Time.deltaTime);
	if(Vector3.Distance(this.transform.position, target.transform.position) < range)
	{
		if(Vector3.Angle(aim.position - fire.position,transform.forward) < 60.0)
		{
			shoot();
		}
	}
	if(Vector3.Distance(this.transform.position, target.transform.position) < 20)
	{
		speed = 5;
	}
	else if(Vector3.Distance(this.transform.position, target.transform.position) > 40)
	{
		speed = 15;
	}
	else
	{
		speed = 10;
	}
	}
}
function shoot()
{
	timer2++;
	if(timer2 == 14)
	{
		timer2 = 0;
		fire.LookAt(aim);
		var bullet_thing = Instantiate(bullet,fire.position, fire.rotation);
		Destroy(bullet_thing.gameObject,10);
	}
}

function is_target()
{
	targets = GameObject.FindGameObjectsWithTag("enemy");
	var distance = 200;
	var position = transform.position;
	for(var targ : GameObject in targets)
	{
		var cur_dist = Vector3.Distance(targ.transform.position, position);
		if(cur_dist < distance)
		{
			target = targ;
			distance = cur_dist;
		}
	}
	if(target == null)
	{
		state = "idle";
	}
	else
	{
		state = "attack";
	}
}
function recieve_damage(damage:int)
{
	shields -= damage;
	if(shields <= 0)
	{
		Destroy(this.gameObject);
	}
}