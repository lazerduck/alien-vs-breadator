using UnityEngine;
using System.Collections;

public class jamout : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		TextMesh text = this.GetComponent<TextMesh> ();
		text.text = "jam: " + FPControl.jam;

	}
}
