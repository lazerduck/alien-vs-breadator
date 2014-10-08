using UnityEngine;
using System.Collections;

public class FPControl : MonoBehaviour
{
    bool KeyPress = false;
    bool Grounded = false;
    bool Boosted = false;

	//jam count
	public static int jam;

    GameObject Player;
	public GameObject Toast;
    public GameObject Gun;
    public GameObject FirePoint;
    public GameObject Respawn;
	public GUITexture milk;
	float firespeed;

    Vector3 temprespawn;

    float Speed = 20;
	float health = 100;
    float Jump = 15;
    float MaxVel = 10;
    float MouseAccelX = 3;
    float MouseAccelY = 2;
    float Boost = 0;
    float MoveSpawnTimer = 0;
    Vector3 BoostVec;
	Vector3 storevel;
	bool prevpause;


    Animator animator;
    float timer;

    bool fire;

    void Start()
    {
		jam = 0;
        Speed = 30;
        Player = this.gameObject;
        Screen.lockCursor = true;
        animator = (Animator)Gun.GetComponent("Animator");
        fire = false;
		firespeed = 1.21f;
    }


    void Update()
    {
		if (Input.GetKeyDown (KeyCode.E)) {
			Application.CaptureScreenshot("A:\\Users\\Adam\\Desktop\\screen.png");
		}
		if (health < 0) {
			Application.LoadLevel("gamedusk");
				}
		if (!pauseMenu.pause) {
			if(prevpause == true)
			{
				this.rigidbody.velocity = storevel;
				rigidbody.useGravity = true;
				Screen.lockCursor = true;
				Debug.Log("test");
			}
			storevel = this.rigidbody.velocity;
			//manage respawning
			setrespawn ();
			//moving
			Walking ();
			HandelVelocity ();
			//turning
			Looking ();
			//jumping
			Jumping ();
			//shooting
			shooting ();
			//regen
			if (health < 100) {
				health += 0.3f;
			}
		}else
		{
			 if(prevpause == false&& pauseMenu.pause == true)
			{
				storevel = this.rigidbody.velocity;
				rigidbody.useGravity = false;

			}
			this.rigidbody.velocity = new Vector3(0,0,0);
		}
		prevpause = pauseMenu.pause;

    }
    void setrespawn()
    {

        if (Grounded)
        {
            MoveSpawnTimer += Time.deltaTime;
            if (MoveSpawnTimer > 1)
            {
                MoveSpawnTimer = 0;
                Respawn.transform.position = this.transform.position;
            }
        }
        else
        {
            MoveSpawnTimer = 0;
        }
        if (this.transform.position.y < 0)
        {
            this.transform.position = Respawn.transform.position;
            this.rigidbody.velocity = new Vector3(0,0,0);
        }
    }
    void Walking()
    {
        KeyPress = false;
        if (Input.GetKey(KeyCode.W))
        {
            Player.rigidbody.AddForce(this.transform.forward * Speed);
            KeyPress = true;
        }
        if (Input.GetKey(KeyCode.S))
        {
            Player.rigidbody.AddForce(-this.transform.forward * Speed);
            KeyPress = true;
        }
        if (Input.GetKey(KeyCode.A))
        {
            Player.rigidbody.AddForce(-this.transform.right * Speed);
            KeyPress = true;
        }
        if (Input.GetKey(KeyCode.D))
        {
            Player.rigidbody.AddForce(this.transform.right * Speed);
            KeyPress = true;
        }
    }
    void Looking()
    {
        Player.transform.Rotate(0,Input.GetAxis("Mouse X")*MouseAccelX,0);
        Camera.main.transform.Rotate(-Input.GetAxis("Mouse Y") * MouseAccelY,0, 0);
    }
    void Jumping()
    {
        if (Grounded)
        {
            if (!Physics.Raycast(transform.position, -transform.up,2))
            {
                Grounded = false;
                Debug.Log("in the air");
            }
            if (Input.GetKey(KeyCode.Space))
            {
                if (Input.GetKey(KeyCode.LeftShift))
                {
                    Player.rigidbody.velocity += new Vector3(0, Jump*2, 0);
					GameObject t = (GameObject)Instantiate(Toast);
                    t.transform.position = this.transform.position - this.transform.forward;
                    t.transform.rotation = this.transform.rotation;
                    t.rigidbody.velocity = new Vector3(0, -Jump * 2, 0);
                }
                else
                {
                    Player.rigidbody.velocity += new Vector3(0, Jump, 0); 
                }
                Grounded = false;
            }
        }
        else
        {
            if (!Boosted)
            {
                if (Input.GetKeyDown(KeyCode.LeftShift))
                {
                    BoostVec = Camera.main.transform.forward;
                    Boost = 10;
                    Boosted = true;
                    GameObject t = (GameObject)Instantiate(Toast);
                    t.transform.position = this.transform.position - this.transform.forward;
                    t.transform.rotation = this.transform.rotation;
                    t.rigidbody.velocity = -Camera.main.transform.forward*30;
                }
            }
        }
        if (Boost > 0 && Boosted)
        {
            Player.rigidbody.velocity += BoostVec * Boost;
            BoostVec.y = 0;
            Boost-= 0.04f;
        }
    }
    void HandelVelocity()
    {
        if (!KeyPress)
        {
            Player.rigidbody.velocity = new Vector3(this.rigidbody.velocity.x/2, this.rigidbody.velocity.y, this.rigidbody.velocity.z/2);
        }
        if (Player.rigidbody.velocity.x>MaxVel)
        {
            Player.rigidbody.velocity = new Vector3(MaxVel, Player.rigidbody.velocity.y, Player.rigidbody.velocity.z);
        }
        if (Player.rigidbody.velocity.x < -MaxVel)
        {
            Player.rigidbody.velocity = new Vector3(-MaxVel, Player.rigidbody.velocity.y, Player.rigidbody.velocity.z);
        }
        if (Player.rigidbody.velocity.z > MaxVel)
        {
            Player.rigidbody.velocity = new Vector3(Player.rigidbody.velocity.x, Player.rigidbody.velocity.y, MaxVel);
        }
        if (Player.rigidbody.velocity.z < -MaxVel)
        {
            Player.rigidbody.velocity = new Vector3(Player.rigidbody.velocity.x, Player.rigidbody.velocity.y, -MaxVel);
        }
    }
    void OnCollisionEnter(Collision collision)
    {
        
		ContactPoint Contact = collision.contacts [0];
		if(!Grounded)
        if ( Vector3.Dot (Contact.normal, Vector3.up) > 0.2) {
						Grounded = true;
						Boost = 0;
						Boosted = false;
						Debug.Log ("on the ground");
				} else if (collision.transform.tag != "bullet")
				if (collision.transform.tag != "jam")
				if (collision.transform.tag != "exit")
        {
			Debug.Log("off the ground");
            Grounded = false;
            Boost = 0;
        }
		if (collision.gameObject.tag == "bullet") {
			health -=20;
		}
		if (collision.gameObject.tag == "exit"&&jam>0) {
			Application.LoadLevel("maingame1");
		}
    }

	void OnGUI()
	{
		Color textureColor = milk.color;
		textureColor.a =(100- health) / 100f;
		milk.color = textureColor;
	}
    void shooting()
    {
        if (Input.GetMouseButton(0))
        {
            if (!fire)
            {
                shoot();
            }
            fire = true;
            
        }
        if (fire)
        {
            animator.Play("reload");
            timer += Time.deltaTime;
			if (timer > firespeed)
            {
                fire = false;
                timer = 0;
            }
        }
        else
        {
            animator.Play("idle");
        }
    }
    void shoot()
    {
        GameObject t = (GameObject)Instantiate(Toast);
        t.transform.position = FirePoint.transform.position;
        t.rigidbody.velocity = Camera.main.transform.forward * 100;
        t.transform.rotation = this.transform.rotation;
        this.rigidbody.AddForce(-Camera.main.transform.forward*50);
    }
	void ShootFaster()
	{
		firespeed -= 0.1f;
	}
}
