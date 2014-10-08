using UnityEngine;
using System.Collections;

public class AngelBehavior : MonoBehaviour {

	public GameObject explode;
	GameObject player;
	Transform gun;
	Vector2 player2d;
	Vector2 curr2d;
	float range = 70;
	bool inRange = false;
	//lerping stuff
	float lerpTop;
	float lerpBot;
	float lerpSpeed;
	bool lerpDirection;
	//moving
	Vector2 moveTo;
	void Start () {
		gun = transform.FindChild("aGun");
		player = GameObject.FindGameObjectWithTag ("Player");
		player2d = new Vector2 (player.transform.position.x, player.transform.position.z);
		curr2d = new Vector2 (this.transform.position.x, this.transform.position.z);
		lerpBot = transform.position.y - 0.5f;
		lerpTop = transform.position.y + 0.5f;
		lerpSpeed = 0.1f;
		lerpDirection = true;
		moveTo = new Vector2 (0, 0);

		player = GameObject.FindGameObjectWithTag ("Player");
	}
	
	// Update is called once per frame
	void Update () {
		if (!pauseMenu.pause) {
			//update the positions
			player2d = new Vector2 (player.transform.position.x, player.transform.position.z);
			curr2d = new Vector2 (this.transform.position.x, this.transform.position.z);
			//check the range
			RangeCheck ();
			//booooooobbbbbbing
			bobbing ();
			//chase the player
			if (inRange) {
				if (player.transform.position.y + 3 > transform.position.y) {
					Debug.Log ("too high");
					this.transform.position = new Vector3 (this.transform.position.x, player.transform.position.y + 3, this.transform.position.z);
				}
				if (moveTo == new Vector2 (0, 0)) {
					calcPos ();
				}
				chase ();
				move ();
			}
		}
	}
	//check the floor distance between the player and the alien
	void RangeCheck()
	{
		float dist = Vector2.Distance (player2d, curr2d);
		inRange = dist < range ? true : false;
	}
	void chase()
	{
		Quaternion neededRotation = Quaternion.LookRotation(player.transform.position - transform.position);
		this.transform.rotation = Quaternion.RotateTowards(transform.rotation, neededRotation, Time.deltaTime * 40f); 
	}
	void bobbing()
	{
		Vector3 pos = transform.position;
		if (lerpDirection) {
			pos.y -= (transform.position.y - lerpTop)*lerpSpeed;
			if(transform.position.y+0.01f > lerpTop)
			{
				lerpDirection = false;
			}
		} else {
			pos.y -= (transform.position.y - lerpBot)*lerpSpeed;
			if(transform.position.y-0.01f < lerpBot)
			{
				lerpDirection = true;
			}
		}
		transform.position = pos;
	}
	void calcPos()
	{
		moveTo = Random.insideUnitCircle*10;
		moveTo += player2d;
	}
	void move()
	{
		Vector3 posit = new Vector3 (0, 0, 0);
		Vector2 pos =  (curr2d-moveTo)* Time.deltaTime;
		posit.x = pos.x;
		posit.z = pos.y;
		transform.position -= posit;
		if (Vector2.Distance (curr2d, moveTo) < 0.5) {
			gun.SendMessage ("shoot");
			calcPos();
		}
	}
	void OnCollisionEnter(Collision collision)
	{
		if (collision.transform.tag == "toast") {
			GameObject t = (GameObject)Instantiate(explode,transform.position,transform.rotation);
			Destroy(this.gameObject);
				}
	}
}
