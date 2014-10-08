using UnityEngine;
using System.Collections;

public class Jam : MonoBehaviour {

	// Use this for initialization
	float top;
	float bottom;
	bool direction;
	void Start () {
		top = transform.position.y + 0.5f;
		bottom  = transform.position.y - 0.5f;
		direction = true;
	}
	
	// Update is called once per frame
	void Update () {
		Vector3 pos = transform.position;
		if (direction) {
			pos.y -= (transform.position.y - top)*0.06f;
			if(transform.position.y+0.05f > top)
			{
				direction = false;
			}
		} else {
			pos.y -= (transform.position.y - bottom)*0.06f;
			if(transform.position.y-0.05f < bottom)
			{
				direction = true;
			}


		}
		transform.position = pos;

	}
	void OnCollisionEnter(Collision collision)
	{
		if (collision.transform.tag == "Player") {
			collision.transform.SendMessage("ShootFaster");
			FPControl.jam ++;
			Destroy(this.gameObject);
		}
		Debug.Log("test");
	}
}