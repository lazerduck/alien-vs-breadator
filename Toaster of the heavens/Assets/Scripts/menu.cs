using UnityEngine;
using System.Collections;

public class menu : MonoBehaviour {

	// Use this for initialization
	float posx = Screen.width/2;
	float posy = Screen.height/2;
	bool lerp_down = false;
	bool lerp_up = false;
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if (lerp_down) {
			posy += (1300 - posy)/20;
				}
		if (lerp_up) {
			posy += (Screen.height/2 - posy)/20;
		}
		if (posy + 10 >= 1200) {
			lerp_down = false;
				}
		if (posy - 10 <= Screen.height / 2) {
			lerp_up = false;
				}
	}
	void OnGUI () {
		// Make a background box
		GUI.Box(new Rect(posx-200,posy-100,400,300), "Toaster of angels");
		
		// Make the first button. If it is pressed, Application.Loadlevel (1) will be executed
		if(GUI.Button(new Rect(posx-100,posy-50,200,50), "Play")) {
			Application.LoadLevel("gamedusk");
		}
		if(GUI.Button(new Rect(posx-100,posy+10,200,50), "trailer level")) {
			Application.LoadLevel("trailer copy");
		}
		if(GUI.Button(new Rect(posx-100,posy+70,200,50), "About")) {
			lerp_down = true;
			lerp_up = false;
		}
		GUI.skin.box.fontSize = 30;
		GUI.Box (new Rect (posx - 350, posy -1000, 700, 400),"About");
		GUI.skin.label.alignment = TextAnchor.MiddleCenter;
		GUI.skin.label.fontSize = 15;
		GUI.Label (new Rect (posx - 350, posy -950, 700, 200),"In 1914 Lloyd Groff Copeman created the automatic toaster, a toaster that could cook both side of the toast without human intervention, truly a masterpiece. However, in an unconrtolable explosion of genius he improved upon his invention with the inclusion of springs. However, he had no way to control the power his invention...\n\nUntil an object descended from the sky and fused with his toaster. Now whatever lost the object wants it back and Lloyd must use his latest invention to save the city\n\nFor king and country");
		if (GUI.Button (new Rect (posx - 100, posy - 700, 200, 50), "Return")) {
			lerp_up = true;
			lerp_down = false;
		}
	}
}
