#pragma strict
var time:float;
function Start () {
    time = 0;
}

function Update () {
    time+=Time.deltaTime;
    if(time > 20)
    {
        Destroy(this.rigidbody);
        this.transform.position.y-=0.01f;
        if(time > 25)
        {
            Destroy(this.gameObject);
        }
    }
}