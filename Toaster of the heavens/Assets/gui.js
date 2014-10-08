function Update () {

}

function OnGUI() {
		
		if (GUI.Button(Rect(885,250,150,60),"Play a demo"))
		{
			Application.LoadLevel('maingame1');
			Debug.Log("clicked");
		}
	}