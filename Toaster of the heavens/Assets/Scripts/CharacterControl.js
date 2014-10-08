#pragma strict
var Speed:float;
var Force:float;
var Hit: RaycastHit;
var Grounded:boolean;
var Boosted:boolean;
var Boost:float;
var BoostVec: Vector3;
public var Text;

var updateInterval = 0.5;
private var accum = 0.0; // FPS accumulated over the interval
private var frames = 0; // Frames drawn over the interval
private var timeleft : float; // Left time for current interva

function Start () {
  Boost = 0;
  Screen.lockCursor = true;
  Speed = 12;
  Force = 1;
  Grounded = false;
  Boosted = false;
  timeleft = updateInterval; 
}

function OnCollisionEnter(collision:Collision)
{
     if(collision.contacts.Length > 0)
     {
         var contact: ContactPoint  = collision.contacts[0];
         if(Vector3.Dot(contact.normal, Vector3.up) > 0.5)
         {
             Grounded = true;
         }
         else
         {
         Grounded = false;
         }
         
     }
     Boost = 0;
     Boosted = false;
}

function Update () {

timeleft -= Time.deltaTime;
    accum += Time.timeScale/Time.deltaTime;
    ++frames;
 
    // Interval ended - update GUI text and start new interval
    if( timeleft <= 0.0 )
    {
        // display two fractional digits (f2 format)
        timeleft = updateInterval;
        accum = 0.0;
        frames = 0;
    }
     
 this.rigidbody.velocity = new Vector3(0,this.rigidbody.velocity.y,0);
 //look around
 Camera.main.transform.Rotate(Vector3(-Input.GetAxis("Mouse Y")*2,0, 0));
 this.transform.Rotate(Vector3(0,Input.GetAxis("Mouse X")*2, 0));
 //Jumping
    if(Grounded)
    {
     if(Input.GetKey(KeyCode.Space))
     {
        Grounded = false;
        if(Input.GetKey(KeyCode.LeftShift)^Input.GetKey(KeyCode.RightShift))
        {
            this.rigidbody.velocity = this.transform.up* 20;
        }
        else{
        this.rigidbody.velocity = this.transform.up* 7;
        }
     }
     Boosted = false;
     
 }   
 //boosting
 if(!Boosted)
 {
    if(!Grounded)
    {
        if(Input.GetKeyDown(KeyCode.LeftShift)^Input.GetKey(KeyCode.RightShift))
        {
            Boost = 20;
            BoostVec = Camera.main.transform.forward;
            BoostVec.y = 0;
            Boosted = true;
        }
    }
 }
 else
 {
    this.rigidbody.velocity += BoostVec*Boost;
    Boost -= 0.1 * Time.deltaTime;
 }
 //Moving
 if(Input.GetKey(KeyCode.W))
 {
     //this.rigidbody.AddRelativeForce(0,0,Force);
     this.rigidbody.velocity += this.transform.forward*Speed;
 }
 if(Input.GetKey(KeyCode.S))
 {
     this.rigidbody.velocity -= this.transform.forward*Speed;
 }
 if(Input.GetKey(KeyCode.D))
 {
     this.rigidbody.velocity += this.transform.right*Speed;
 }
 if(Input.GetKey(KeyCode.A))
 {
     this.rigidbody.velocity -= this.transform.right*Speed;
 }
 //Clamp our speed
 
}