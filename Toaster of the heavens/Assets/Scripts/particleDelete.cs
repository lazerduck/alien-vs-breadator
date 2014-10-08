using UnityEngine;
using System.Collections;

public class particleDelete : MonoBehaviour {
	float time  = 0;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		time += Time.deltaTime;
		if (time > 1.5) {
			this.particleSystem.emissionRate = 0;
		}
		if(time > 3)
		{
			Destroy(this.gameObject);
		}
	}
}
