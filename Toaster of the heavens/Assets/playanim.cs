using UnityEngine;
using System.Collections;

public class playanim : MonoBehaviour {

	// Use this for initialization
	void Start () {
		Animator anim = this.GetComponent<Animator> ();
		anim.Play (0);
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
