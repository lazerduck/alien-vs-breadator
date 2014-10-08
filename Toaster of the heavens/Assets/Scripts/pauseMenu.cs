using UnityEngine;
using System.Collections;

public class pauseMenu : MonoBehaviour {

	// Use this for initialization
	public static bool pause = false;
	float posx = Screen.width/2;
	float posy = Screen.height/3;
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKeyDown (KeyCode.Escape)) {
			pause = !pause;
		}
	}

	void OnGUI()
	{
		if (pause) {

			GUI.Box(new Rect(posx-200,posy-100,400,500), "Pause");

			if(GUI.Button(new Rect(posx-150,posy+30,300,100), "Resume"))
			{
				pause = false;
			}
			if(GUI.Button(new Rect(posx-150,posy+140,300,100), "Exit"))
			{
				Application.LoadLevel("menu");
			}
			if(GUI.Button(new Rect(posx-150,posy+250,300,100), "Skip"))
			{
				Application.LoadLevel("maingame1");
			}
			GUI.Label(new Rect(posx-150,posy-60,300,100),"Objective:\n Collect as Much jam as possible for the plane and return it to the workshop");
		}
	}
}
