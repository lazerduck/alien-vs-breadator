#pragma strict
var MoveSpeed: float = 5;
var rotspeed:int = 1;
var bullet:Transform;
var ship:Transform;
var timer:int = 10;
var shields_timer:float = 0f;
var toggle = true;
var crosshair:GameObject;
var point:GameObject;
var point2:GameObject;
var sensetivity: int = 5;
var togpos = true;
var locked = false;
var targets:GameObject[];
var closest:GameObject;
var lock_gui:GameObject;
var enemy_health_gui:GameObject;
var cam:Camera;
var cursor_pos:Vector3;
var mis_timer = 0;
var missile:Transform;
var shields:int = 100;
var s_tex1:GameObject;
var s_tex2:GameObject;
var s_tex3:GameObject;
var s_tex4:GameObject;
var s_tex5:GameObject;
var s_text:GameObject;
var d_text:GameObject;
var hitcount :int = 0;
var old_count:int = 0;
var hit = false;
function Start()
{
	// set the gui positions
	s_tex1.guiTexture.pixelInset.y = -Screen.height/2 + 100;
	s_tex2.guiTexture.pixelInset.y = -Screen.height/2 + 100;
	s_tex3.guiTexture.pixelInset.y = -Screen.height/2 + 100;
	s_tex4.guiTexture.pixelInset.y = -Screen.height/2 + 100;
	s_tex5.guiTexture.pixelInset.y = -Screen.height/2 + 100;
	s_text.guiText.pixelOffset.y = -Screen.height/2+50;
	d_text.guiText.pixelOffset.y = -Screen.height/2+50;
} 
function Update () {
	update_shield_gui();
	update_distance();
	//recharge shields
	
	if(hit)
	{
		if(old_count != hitcount)
		{
			shields_timer = 0f;
		}
		old_count = hitcount;
		
		if(shields >= 100)
		{
			shields_timer = 0f;
			hit = false;
		}else{
			shields_timer+=Time.deltaTime;
			if(shields_timer >= 5f)
			{
				shields++;
			}
		}
	}
	
	if(Input.GetKeyDown(KeyCode.Escape))
	{
		toggle = false;
	}
	if(toggle)
	{
		Screen.lockCursor = true;
	}else{
		Screen.lockCursor = false;
	}
	transform.position += transform.forward*MoveSpeed*Time.deltaTime;

	
	if(Input.GetButton("Fire1"))
	{
		if(timer>=5)
		{
			if(togpos)
			{
				togpos = false;
			}
			else
			{
				togpos = true;
			}
			/*var ray:Ray = Camera.main.ViewportPointToRay(Vector3(0.5,0.5,0.5));
			var hit: RaycastHit;
			
			if(Physics.Raycast(ray,hit,1000))
			{
				Debug.DrawLine(ray.origin,hit.point);
				crosshair.transform.position = hit.point;
				point.transform.LookAt(hit.point);
				if(togpos)
				{
				var this_thing = Instantiate(bullet,point.transform.position,point.transform.rotation);
				}
				else
				{
				this_thing = Instantiate(bullet,point2.transform.position,point2.transform.rotation);
				}
				Destroy(this_thing.gameObject,10);
			}else{
				//crosshair.transform.position = point.transform.position + transform.forward;
				point.transform.LookAt(crosshair.transform.position);*/
				if(togpos)
				{
				
				point.transform.LookAt(crosshair.transform.position);
				var this_thing = Instantiate(bullet,point.transform.position,point.transform.rotation);
				}
				else
				{
				
				point2.transform.LookAt(crosshair.transform.position);
				this_thing = Instantiate(bullet,point2.transform.position,point2.transform.rotation);
				}
				Destroy(this_thing.gameObject,10);
			//}
			
			timer=0;
		}else{
			timer++;		
		}
	}
	else
	{
		timer = 10;
	}
	if(Input.GetKey(KeyCode.D))
	{
		transform.Rotate(Vector3(0.0,0.0,-3.0));
	}
	if(Input.GetKey(KeyCode.A))
	{
		transform.Rotate(Vector3(0.0,0.0,3.0));
	}
	if(Input.GetKey(KeyCode.W))
	{
		if(Input.GetKey(KeyCode.LeftShift))
		{
			MoveSpeed = 20;
		}
		else
		{
			MoveSpeed = 10;
		}
	}
	else if(Input.GetKey(KeyCode.S))
	{
		MoveSpeed = 3;
	}
	else
	{
		MoveSpeed = 5;
	}
	if(Input.GetKey(KeyCode.F))
	{
		find_target();
	}
	if(Input.GetKey(KeyCode.E))
	{
		find_nearest();
	}
	
	if(locked)
	{
		if(Vector3.Distance(transform.position, closest.transform.position) < 300)
		{
			if(closest.renderer.isVisible)
			{
				if(Input.GetMouseButton(1))
				{
					mis_timer++;
			
				}
				else if(mis_timer >30)
				{
					var missile_inst = Instantiate(missile,this.transform.position,this.transform.rotation);
					missile_inst.SendMessage("follow", closest);
					Destroy(missile_inst.gameObject,15);
					mis_timer = 0;
				}
				else
				{
					mis_timer = 0;
				}
			}
		}
	}
	
	if(closest == null)
	{
		locked = false;
	}
}
function find_target()
{
	targets = GameObject.FindGameObjectsWithTag("enemy");
	var distance = Mathf.Infinity;
	var position = transform.position;
	for(var target : GameObject in targets)
	{
		var cur_dist = Vector3.Distance(target.transform.position, position);
		if(cur_dist < distance)
		{
			closest = target;
			distance = cur_dist;
		}
	}
	if(targets.Length != 0)
	{
		locked = true;
		lock_gui.SendMessage("update_target", closest.transform);
		enemy_health_gui.SendMessage("update_target", closest.transform);
	}
}
function find_nearest()
{
	targets = GameObject.FindGameObjectsWithTag("enemy");
	var distance = Mathf.Infinity;
	var position = cam.WorldToScreenPoint(transform.position);
	var other_pos:Vector3;
	for(var target : GameObject in targets)
	{
		position.z = 0;
		other_pos = cam.WorldToScreenPoint(target.transform.position);
		other_pos.z = 0;
		cursor_pos = cam.WorldToScreenPoint(crosshair.transform.position);
		cursor_pos.z=0;
		var cur_dist = Vector3.Distance(other_pos, cursor_pos);
		if(cur_dist < distance)
		{
			closest = target;
			distance = cur_dist;
		}
	}
	if(targets.Length != 0)
	{
		locked = true;
		lock_gui.SendMessage("update_target", closest.transform);
		enemy_health_gui.SendMessage("update_target", closest.transform);
	}
}

function rotate_control(passable:Vector2)
{
	var y_ax = passable.x;
	var x_ax = passable.y;
	transform.Rotate(-y_ax*5,x_ax*5,0);
}
function recieve_damage(damage:int)
{
	hit = true;
	hitcount++;
	shields -= damage/2;
	if(shields <= 0)
	{
		shields = 0;
		
		//death
		Destroy(this.gameObject);
	}
}
function update_distance()
{
	if(closest == null)
	{
		d_text.guiText.text = "Distance = NoTarget";
	}
	else
	{
		var dist = Vector3.Distance(this.transform.position, closest.transform.position);
		d_text.guiText.text = "Distance = " + dist;
	}
}
function update_shield_gui()
{
	s_text.guiText.text = "Intergirty: " + shields;
	if(shields < 20)
	{
		s_tex1.guiTexture.enabled = false;
	}
	else
	{
		s_tex1.guiTexture.enabled = true;
	}
	if(shields < 40)
	{
		s_tex2.guiTexture.enabled = false;
	}
	else
	{
		s_tex2.guiTexture.enabled = true;
	}
	if(shields < 60)
	{
		s_tex3.guiTexture.enabled = false;
	}
	else
	{
		s_tex3.guiTexture.enabled = true;
	}
	if(shields < 80)
	{
		s_tex4.guiTexture.enabled = false;
	}
	else
	{
		s_tex4.guiTexture.enabled = true;
	}
	if(shields < 100)
	{
		s_tex5.guiTexture.enabled = false;
	}
	else
	{
		s_tex5.guiTexture.enabled = true;
	}
}