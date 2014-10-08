using UnityEngine;
using System.Collections;

public class cerealGun : MonoBehaviour {

	// Use this for initialization
	GameObject player;
	public GameObject bullet;
	void Start () {
		player = GameObject.FindGameObjectWithTag ("Player");
	}
	
	// Update is called once per frame
	void Update () {
		if (Vector3.Distance (this.transform.position, player.transform.position) < 100) {
						this.gameObject.transform.LookAt (player.transform);
				}
	}
	public void shoot()
	{
		GameObject t = (GameObject)GameObject.Instantiate (bullet);
		t.transform.position = transform.position + transform.forward;
		t.rigidbody.velocity = transform.forward*100;
	}
}
