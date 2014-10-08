#pragma strict
import System.Collections.Generic;

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
var shields_timer:float = 0f;
var shield_wait:int = 5;
//pause between flee checks
var flee_timer:float = 0f;
//chance of fleeing out of 100
var flee_chance = 0;

function Start () {
	idle_start = transform.position;
}

function Update () {
	
	
	//recharge shields
	if(shields<100)
	{
		shields_timer += Time.deltaTime;
		if(shields_timer >shield_wait)
		{	
			shield_wait = 1;
			shields+=5;	
			shields_timer = 0;
		}
	}
	else
	{
		shield_wait = 5;
		shields_timer = 0;
		shields = 100;
	}

	
	//check if you should flee
	if(state != "flee")
	{
		if(target == null)
		{
			state = "idle";
			is_target();
		}
		else
		{
			state = "attack";
		}
		flee_timer += Time.deltaTime;
		if(flee_timer > 3f)
		{
		
			if((Random.value*100)<flee_chance +((100-shields*2)))
			{
				state = "flee";
				flee_timer = 0f;
				
			}
			else
			{
				flee_timer = 0f;
				
			}
		}
		
	}
	
	switch(state)
	{
		case "idle":
			idle();
		break;
		case "attack":
			attack();
		break;
		case "flee":
			flee();
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
function new_point_flee()
{
	var start:Vector3 = this.transform.position;
	
	var diff = Random.onUnitSphere*10;
	for(var i:int = 1;i<10;i++)
	{
		var to_add:Vector3 = new Vector3();
		to_add.x = start.x + (i*10*diff.x) + Random.value*10;
		to_add.y = start.y + (i*10*diff.x) + Random.value*10;
		to_add.z = start.z + (i*10*diff.x) + Random.value*10;
		to_add += start;
		path.Add(to_add);
	}
}

function is_target()
{
	targets = GameObject.FindGameObjectsWithTag("ally");
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
}
function attack()
{
	range = 100;
	aim.position = target.transform.position;
	var needed_rotation = Quaternion.LookRotation(target.transform.position - this.transform.position);
	transform.position += transform.forward*speed*Time.deltaTime;
	this.transform.rotation = Quaternion.Slerp(this.transform.rotation, needed_rotation,Time.deltaTime);
	if(Vector3.Distance(this.transform.position, target.transform.position) < range)
	{
		if(Vector3.Angle(aim.position - fire.position,transform.forward) < 30.0)
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
function shoot()
{
	timer2++;
	if(timer2 == 14)
	{
		timer2 = 0;
		fire.LookAt(aim);
		var bullet_thing = Instantiate(bullet,fire.position, fire.rotation);
        bullet_thing.rigidbody.velocity = transform.forward*100;
		Destroy(bullet_thing.gameObject,10);
	}
}
function flee()
{
	speed = 20;
	flee_timer += Time.deltaTime;
	if(flee_timer>10)
	{
		state = "idle";
		path.Clear();
	}
	if(path.Count ==0)
	{
		new_point_flee();
	}
	var needed_rotation = Quaternion.LookRotation(path[0] - this.transform.position);
	if(Vector3.Distance(transform.position,path[0]) < 10)
	{
		path.RemoveAt(0);
		
	}
	timer++;
	transform.position += transform.forward*speed*Time.deltaTime;
	this.transform.rotation = Quaternion.Slerp(this.transform.rotation, needed_rotation,Time.deltaTime);
}
function hit(damage:int)
{
	shields -= damage;
	if(shields <=0)
	{
		Destroy(this.gameObject);
	}
	flee_chance++;
}
function return_health(gui:GameObject)
{
	gui.SendMessage("enemy_health", shields);
}
