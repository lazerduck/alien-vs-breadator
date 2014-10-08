using UnityEngine;
using System.Collections;

public class bulletBehavior : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	void OnCollisionEnter(Collision collision)
	{
		Destroy (this.gameObject);

			if(collision.gameObject.tag == "ally")
			{
				collision.gameObject.SendMessage("recieve_damage", 10);
			}

	}
}
