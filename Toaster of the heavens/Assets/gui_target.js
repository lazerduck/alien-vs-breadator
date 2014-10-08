#pragma strict

var target:Transform;
var gui_x = false;
var gui_y = false;
function Start () {
	this.guiTexture.enabled = false;
}
function Update () {
	
	if(target != null)
	{
		this.guiTexture.enabled = true;
		var wanted_pos = Camera.main.WorldToViewportPoint(target.position);
		transform.position = wanted_pos;
		if(transform.position.z<0)
		{
	    	this.guiTexture.enabled = false;
		}
		else
		{
			this.guiTexture.enabled = true;
		}
		if(transform.position.x>1)
		{
		    transform.position.x=1;
		}
		else if(transform.position.x<0)
		{
		    transform.position.x=0;
		}

		if(transform.position.y>1)
		{
		    transform.position.y=1;	    
		}
		else if(transform.position.y<0)
		{
		    transform.position.y=0;   
		}
	}
	else
	{
		this.guiTexture.enabled = false;
	}	
}
function update_target(locked:Transform)
{
	target = locked;
}